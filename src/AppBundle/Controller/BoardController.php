<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Board;
use AppBundle\Entity\Sticker;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class BoardController extends Controller
{
    /**
     * @Route("/", name="board_list")
     * @Method("GET")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function listAction()
    {
        /** @var Board[] $board */
        $boards = $this->get('doctrine.orm.entity_manager')->getRepository(Board::class)->findAll();
        return $this->render(':board:list.html.twig', [
            'boards' => $boards
        ]);
    }

    /**
     * @Route("/{id}", name="board_view")
     * @Method("GET")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function viewAction(Request $request)
    {
        /** @var Board $board */
        $board = $this->get('doctrine.orm.entity_manager')->getRepository(Board::class)->find((int)$request->get('id'));
        /** @var Sticker[] $stickerEntities */
        $stickerEntities = $board->getStickers();
        $stickers = [];
        foreach ($stickerEntities as $stickerEntity) {
            $stickers[] = [
                'id' => $stickerEntity->getId(),
                'style' => $stickerEntity->getStyle() ? : Sticker::STYLE_GREEN,
                'left' => $stickerEntity->getPositionX(),
                'top' => $stickerEntity->getPositionY(),
                'font' => $stickerEntity->getSize() ? : Sticker::SIZE_SMALL,
                'strike' => (int)$stickerEntity->getIsStriked(),
                'text' => $stickerEntity->getText(),
            ];
        }

        return $this->render(':board:view.html.twig', [
            'board' => $board,
            'stickers' => $stickers,
            'styles' => Sticker::getStyles(),
        ]);
    }

    /**
     * @Route("/ajax/project/add", name="board_create_process")
     * @Method("GET")
     * @param Request $request
     * @return JsonResponse
     */
    public function createProcessAction(Request $request)
    {
        $title = $request->get('title');
        $description = $request->get('description');

        $board = new Board();
        $board
            ->setName($title)
            ->setDescription($description);
        $em = $this->get('doctrine.orm.entity_manager');
        $em->persist($board);
        $em->flush($board);

        return new JsonResponse([
            'project_id' => $board->getId(),
            'name' => $board->getName(),
            'description' => $board->getDescription(),
            'role' => 'admin',
        ]);
    }

    /**
     * @Route("/ajax/project/edit", name="board_edit_process")
     * @Method("GET")
     * @param Request $request
     * @return JsonResponse
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    public function editProcessActon(Request $request)
    {
        $boardId = (int)$request->get('project');
        $title = $request->get('title');
        $description = $request->get('description');

        /** @var Board $board */
        $board = $this->get('doctrine.orm.entity_manager')->getRepository(Board::class)->find($boardId);
        if (!$board) {
            throw $this->createNotFoundException();
        }

        $board
            ->setName($title)
            ->setDescription($description);
        $this->get('doctrine.orm.entity_manager')->flush($board);

        return new JsonResponse([
            'project_id' => $board->getId(),
            'name' => $board->getName(),
            'description' => $board->getDescription(),
            'role' => 'admin',
        ]);
    }

    /**
     * @Route("/ajax/project/delete", name="board_delete_process")
     * @Method("GET")
     * @param Request $request
     * @return JsonResponse
     */
    public function deleteProcessAction(Request $request)
    {
        $boardId = $request->get('project');

        $em = $this->get('doctrine.orm.entity_manager');
        /** @var Board $board */
        $board = $em->getRepository(Board::class)->find((int)$boardId);
        if (!$board) {
            throw $this->createNotFoundException();
        }

        $stickers = $em->getRepository(Sticker::class)->findBy(['board' => $board->getId()]);
        if (count($stickers)) {
            foreach ($stickers as $sticker) {
                $em->remove($sticker);
            }
            $em->flush();
        }
        $em->remove($board);
        $em->flush();

        return new JsonResponse([]);
    }
}
