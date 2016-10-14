/**
 * @description
 */
window.CaterJS.pages.Board.toolbar = (function() {
    //var moduleVar;

    function init() {
        updateVars();
        bindEvents();
    };

    function updateVars() {
    };

    function bindEvents() {
        $( '.navbar .nav .close-window a' ).click( function(e){
            window.close();
            return false;
        });

        $( '.navbar .nav .order a' ).click( function(e){
            window.CaterJS.pages.Board.stickers.order();
            return false;
        });

        $( '.navbar .nav .zoom-in a' ).click( function(e){
            window.CaterJS.pages.Board.board.zoom( true );
            return false;
        });

        $( '.navbar .nav .zoom-out a' ).click( function(e){
            window.CaterJS.pages.Board.board.zoom( false );
            return false;
        });
    };

    /**
     * Обновление масштаба в тулюбаре
     */
    function updateScale() {
        var scale = Math.round( window.CaterJS.pages.Board.koef() * 100 );
        $( '.scale span' ).html( scale );
    };

    /**
     * Блокировка кнопок зума
     */
    function blockZoom( type, block ) {
        type = type == 1 ? '.zoom-in' : '.zoom-out';
        if ( block ) {
            $( '.navbar .nav ' + type ).addClass( 'close' );
        } else {
            $( '.navbar .nav ' + type ).removeClass( 'close' );
        };
    };

    function setOffline() {
        $( '.navbar .online' ).addClass( 'offline' );
        //$( '.navbar .online' ).attr( 'data-content', 'Сервер не в сети' );
        $( '.navbar .online a' ).html( 'offline' );
    };

    function setOnline() {
        $( '.navbar .online' ).removeClass( 'offline' );
        //$( '.navbar .online' ).attr( 'data-content', 'Сервер в сети!' );
        $( '.navbar .online a' ).html( 'online' );
    };

    return {
        init: init
        , updateScale: updateScale
        , blockZoom: blockZoom
        //, updateOnline: updateOnline
        , setOffline: setOffline
        , setOnline: setOnline
    };
})();
