<?php

namespace AppBundle\Entity;

/**
 * Sticker
 */
class Sticker
{
    const SIZE_SMALL = 'small';
    const SIZE_MEDIUM = 'medium';
    const SIZE_BIG = 'big';

    const STYLE_GREEN = 'green';
    const STYLE_YELLOW = 'yellow';
    const STYLE_ORANGE = 'orange';
    const STYLE_RED = 'red';
    const STYLE_PURPLE = 'purple';
    const STYLE_BLUE = 'blue';
    const STYLE_LIGHT_BLUE = 'light-blue';
    /**
     * @var int
     */
    private $id;

    /**
     * @var int
     */
    private $positionX = 0;

    /**
     * @var int
     */
    private $positionY = 0;

    /**
     * @var string
     */
    private $text = '';

    /**
     * @var string
     */
    private $size = self::SIZE_BIG;

    /**
     * @var bool
     */
    private $isStriked = false;
    /**
     * @var \AppBundle\Entity\Board
     */
    private $board;
    /**
     * @var string
     */
    private $style = self::STYLE_GREEN;

    public static function checkStyle($style)
    {
        if (in_array($style, self::getStyles(), true)) {
            return $style;
        }
        return self::STYLE_GREEN;
    }

    public static function getStyles()
    {
        return [
            self::STYLE_GREEN,
            self::STYLE_YELLOW,
            self::STYLE_ORANGE,
            self::STYLE_RED,
            self::STYLE_PURPLE,
            self::STYLE_BLUE,
            self::STYLE_LIGHT_BLUE,
        ];
    }

    public static function checkSize($size)
    {
        if (in_array($size, self::getSizes(), true)) {
            return $size;
        }
        return self::SIZE_SMALL;
    }

    public static function getSizes()
    {
        return [
            self::SIZE_SMALL,
            self::SIZE_MEDIUM,
            self::SIZE_BIG,
        ];
    }

    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get positionX
     *
     * @return int
     */
    public function getPositionX()
    {
        return $this->positionX;
    }

    /**
     * Set positionX
     *
     * @param integer $positionX
     *
     * @return Sticker
     */
    public function setPositionX($positionX)
    {
        $this->positionX = $positionX;

        return $this;
    }

    /**
     * Get positionY
     *
     * @return int
     */
    public function getPositionY()
    {
        return $this->positionY;
    }

    /**
     * Set positionY
     *
     * @param integer $positionY
     *
     * @return Sticker
     */
    public function setPositionY($positionY)
    {
        $this->positionY = $positionY;

        return $this;
    }

    /**
     * Get text
     *
     * @return string
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * Set text
     *
     * @param string $text
     *
     * @return Sticker
     */
    public function setText($text)
    {
        $this->text = $text;

        return $this;
    }

    /**
     * Get size
     *
     * @return string
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * Set size
     *
     * @param string $size
     *
     * @return Sticker
     */
    public function setSize($size)
    {
        $this->size = $size;

        return $this;
    }

    /**
     * Get isStriked
     *
     * @return bool
     */
    public function getIsStriked()
    {
        return $this->isStriked;
    }

    /**
     * Set isStriked
     *
     * @param boolean $isStriked
     *
     * @return Sticker
     */
    public function setIsStriked($isStriked)
    {
        $this->isStriked = $isStriked;

        return $this;
    }

    /**
     * Get board
     *
     * @return \AppBundle\Entity\Board
     */
    public function getBoard()
    {
        return $this->board;
    }

    /**
     * Set board
     *
     * @param \AppBundle\Entity\Board $board
     *
     * @return Sticker
     */
    public function setBoard(\AppBundle\Entity\Board $board = null)
    {
        $this->board = $board;

        return $this;
    }

    /**
     * Get style
     *
     * @return string
     */
    public function getStyle()
    {
        return $this->style;
    }

    /**
     * Set style
     *
     * @param string $style
     *
     * @return Sticker
     */
    public function setStyle($style)
    {
        $this->style = $style;

        return $this;
    }
}
