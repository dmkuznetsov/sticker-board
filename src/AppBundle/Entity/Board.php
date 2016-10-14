<?php

namespace AppBundle\Entity;

/**
 * Board
 */
class Board
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $description = '';

    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $stickers;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->stickers = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Board
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Board
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Add sticker
     *
     * @param \AppBundle\Entity\Sticker $sticker
     *
     * @return Board
     */
    public function addSticker(\AppBundle\Entity\Sticker $sticker)
    {
        $this->stickers[] = $sticker;

        return $this;
    }

    /**
     * Remove sticker
     *
     * @param \AppBundle\Entity\Sticker $sticker
     */
    public function removeSticker(\AppBundle\Entity\Sticker $sticker)
    {
        $this->stickers->removeElement($sticker);
    }

    /**
     * Get stickers
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getStickers()
    {
        return $this->stickers;
    }
}
