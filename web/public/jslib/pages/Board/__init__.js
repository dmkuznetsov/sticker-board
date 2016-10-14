/**
 * @description
 */
window.CaterJS.pages.Board = (function() {
    function init() {
        _initAcl();
        CaterJS.pages.Board.board.init();
        CaterJS.pages.Board.stickers.init();
        CaterJS.pages.Board.dialogs.init();
        CaterJS.pages.Board.toolbar.init();
    }

    /**
     * Инициализации прав доступа
     */
    function _initAcl() {
        var role = window.CaterJS.repo.Registry.namespace( 'board' ).get( 'config' ).role;
        window.CaterJS.repo.Acl.setRole( role );
        var rules = {
            'edit-sticker' : 'person,member,admin'
            , 'create-sticker' : 'person,member,admin'
            , 'delete-sticker' : 'person,member,admin'
            , 'order-sticker' : 'person,member,admin'
        };
        window.CaterJS.repo.Acl.setRules( rules );
    };

    /**
     * Коэффициент изменения масштаба доски
     */
    function koef() {
        var size = window.CaterJS.helpers.toFloat( $( 'body' ).css( 'font-size' ) );
        var point = window.CaterJS.repo.Registry.namespace( 'board' ).get( 'config' ).point;
        var k = size / point;
    
        return k;
    };

    /**
     * Вычисление оригинального размера (с учетом коэфициента масштаба)
     */
    function orig( number ) {
        var k = koef();
        return number / k;
    };

    return {
        init: init
        , koef: koef
        , orig: orig
    };
})();
