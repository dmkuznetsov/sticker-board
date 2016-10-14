<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20161014174305 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE board (id INT UNSIGNED AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sticker (id BIGINT UNSIGNED AUTO_INCREMENT NOT NULL, board_id INT UNSIGNED DEFAULT NULL, style_id SMALLINT UNSIGNED DEFAULT NULL, position_x INT NOT NULL, position_y INT NOT NULL, text LONGTEXT DEFAULT NULL, size VARCHAR(32) NOT NULL, is_striked TINYINT(1) NOT NULL, INDEX IDX_8FEDBCFDE7EC5785 (board_id), INDEX IDX_8FEDBCFDBACD6074 (style_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE style (id SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL, style VARCHAR(64) NOT NULL, name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_33BDB86A33BDB86A (style), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE sticker ADD CONSTRAINT FK_8FEDBCFDE7EC5785 FOREIGN KEY (board_id) REFERENCES board (id)');
        $this->addSql('ALTER TABLE sticker ADD CONSTRAINT FK_8FEDBCFDBACD6074 FOREIGN KEY (style_id) REFERENCES style (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE sticker DROP FOREIGN KEY FK_8FEDBCFDE7EC5785');
        $this->addSql('ALTER TABLE sticker DROP FOREIGN KEY FK_8FEDBCFDBACD6074');
        $this->addSql('DROP TABLE board');
        $this->addSql('DROP TABLE sticker');
        $this->addSql('DROP TABLE style');
    }
}
