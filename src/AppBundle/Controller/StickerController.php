<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Board;
use AppBundle\Entity\Sticker;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class StickerController extends Controller
{
    /**
     * @Route("/ajax/stickers/list", name="board_stickers_list_process")
     * @Method("GET")
     * @param Request $request
     * @return JsonResponse
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    public function listProcessAction(Request $request)
    {
        /** @var Board $board */
        $board = $this->get('doctrine.orm.entity_manager')->getRepository(Board::class)->find((int)$request->get('id'));
        if (!$board) {
            throw $this->createNotFoundException();
        }

        /** @var Sticker[] $stickerEntities */
        $stickerEntities = $board->getStickers();
        $stickers = [];
        foreach ($stickerEntities as $stickerEntity) {
            $stickers[] = [
                'id' => $stickerEntity->getId(),
                'strike' => $stickerEntity->getIsStriked(),
                'style' => $stickerEntity->getStyle(),
                'left' => $stickerEntity->getPositionX(),
                'top' => $stickerEntity->getPositionY(),
                'font' => $stickerEntity->getSize(),
                'text' => $stickerEntity->getText(),
            ];
        }

        return new JsonResponse($stickers);
    }

    /**
     * @Route("/ajax/stickers/add", name="board_stickers_create_process")
     * @Method("GET")
     * @param Request $request
     * @return JsonResponse
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    public function createProcessAction(Request $request)
    {
        $left = $request->get('left');
        $top = $request->get('top');

        $em = $this->get('doctrine.orm.entity_manager');
        /** @var Board $board */
        $board = $em->getRepository(Board::class)->find((int)$request->get('project'));
        if (!$board) {
            throw $this->createNotFoundException();
        }

        $sticker = new Sticker();
        $sticker
            ->setBoard($board)
            ->setPositionX((int)$left)
            ->setPositionY((int)$top);
        $em = $this->get('doctrine.orm.entity_manager');
        $em->persist($sticker);
        $em->flush($sticker);

        return new JsonResponse([
            'id' => $sticker->getId(),
            'strike' => $sticker->getIsStriked(),
            'style' => $sticker->getStyle(),
            'left' => $sticker->getPositionX(),
            'top' => $sticker->getPositionY(),
            'font' => $sticker->getSize(),
            'text' => $sticker->getText(),
        ]);
    }

    /**
     * @Route("/ajax/stickers/edit", name="board_stickers_edit_process")
     * @Method("GET")
     * @param Request $request
     * @return JsonResponse
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    public function editProcessAction(Request $request)
    {
        $id = (int)$request->get('id');
        $left = (int)$request->get('left');
        $top = (int)$request->get('top');
        $style = Sticker::checkStyle($request->get('style'));
        $text = $request->get('text', '');
        $size = Sticker::checkSize($request->get('font'));
        $strike = $request->get('strike', 0) ? true : false;

        $em = $this->get('doctrine.orm.entity_manager');
        /** @var Sticker $sticker */
        $sticker = $em->getRepository(Sticker::class)->find($id);
        if (!$sticker) {
            throw $this->createNotFoundException();
        }

        $sticker
            ->setPositionX($left)
            ->setPositionY($top)
            ->setStyle($style)
            ->setSize($size)
            ->setIsStriked($strike)
            ->setText($text);
        $em->flush($sticker);

        return new JsonResponse([]);
    }

    /**
     * @Route("/ajax/stickers/delete", name="board_stickers_delete_process")
     * @Method("GET")
     * @param Request $request
     * @return JsonResponse
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    public function deleteProcessAction(Request $request)
    {
        $em = $this->get('doctrine.orm.entity_manager');
        /** @var Sticker $sticker */
        $sticker = $em->getRepository(Sticker::class)->find((int)$request->get('id'));
        if (!$sticker) {
            throw $this->createNotFoundException();
        }

        $em->remove($sticker);
        $em->flush();

        return new JsonResponse([]);
    }
}
