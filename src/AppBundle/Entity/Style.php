<?php

namespace AppBundle\Entity;

/**
 * Style
 */
class Style
{
    const SIZE_SMALL = 'small';
    const SIZE_MEDIUM = 'medium';
    const SIZE_BIG = 'big';

    /**
     * @var int
     */
    private $id;

    /**
     * @var string
     */
    private $style;

    /**
     * @var string
     */
    private $name;

    /**
     * @return array
     */
    public static function getSizes()
    {
        return [self::SIZE_SMALL, self::SIZE_MEDIUM, self::SIZE_BIG];
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
     * @return Style
     */
    public function setStyle($style)
    {
        $this->style = $style;

        return $this;
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
     * @return Style
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }
}
