<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20161015170441 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        // this up() migration is auto-generated, please modify it to your needs
        $sql = <<<'SQL'
INSERT INTO `board` (`id`, `name`, `description`) VALUES ('1', 'Example board', '');
INSERT INTO `sticker` (`id`, `board_id`, `position_x`, `position_y`, `text`, `size`, `style`, `is_striked`) VALUES ('1', '1', '100', '100', 'Hi there', 'big', 'green', '0');
INSERT INTO `sticker` (`id`, `board_id`, `position_x`, `position_y`, `text`, `size`, `style`, `is_striked`) VALUES ('2', '1', '300', '100', 'Click twice', 'big', 'red', '0');
INSERT INTO `sticker` (`id`, `board_id`, `position_x`, `position_y`, `text`, `size`, `style`, `is_striked`) VALUES ('3', '1', '500', '100', 'And create sticker', 'medium', 'blue', '0');

SQL;
        $this->addSql($sql);
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $sql = <<<'SQL'
TRUNCATE `sticker`;
TRUNCATE `board`;
SQL;
        $this->addSql($sql);
    }
}
