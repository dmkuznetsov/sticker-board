<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20161014174306 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        // this up() migration is auto-generated, please modify it to your needs
        $sql = <<<'SQL'
INSERT INTO `style` (`id`, `style`, `name`) VALUES ('1', 'green', 'Green');
INSERT INTO `style` (`id`, `style`, `name`) VALUES ('2', 'yellow', 'Yellow');
INSERT INTO `style` (`id`, `style`, `name`) VALUES ('3', 'orange', 'Orange');
INSERT INTO `style` (`id`, `style`, `name`) VALUES ('4', 'red', 'Red');
INSERT INTO `style` (`id`, `style`, `name`) VALUES ('5', 'purple', 'Purple');
INSERT INTO `style` (`id`, `style`, `name`) VALUES ('6', 'blue', 'Blue');
INSERT INTO `style` (`id`, `style`, `name`) VALUES ('7', 'light-blue', 'Light blue');

INSERT INTO `board` (`id`, `name`, `description`) VALUES ('1', 'Example board', 'Your example');
INSERT INTO `sticker` (`id`, `board_id`, `style_id`, `position_x`, `position_y`, `text`, `size`, `is_striked`) VALUES ('1', '1', 1, '100', '100', 'Hi there', 'big', '0');

SQL;
        $this->addSql($sql);
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
