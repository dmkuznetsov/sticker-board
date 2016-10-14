/**
 * @description
 */
window.CaterJS.pages.Board.board = (function() {
    var _list;

    function init() {
        bindProperties();
        updateVars();
        bindEvents();
        if ( !_list ) {
            _ajaxLoadBoard();
        } else {
            _run( _list );
        };
    };

    function _config() {
        return window.CaterJS.repo.Registry.namespace( 'board' ).get( 'config' );
    };

    function updateVars() {
    };
    
    function bindEvents() {
        // Масштабирование поля колесиком
        $( _config().id ).mousewheel( function( event, delta ) {
            if ( delta > 0 ) {
                zoom( true );
            } else {
                zoom( false );
            };
        });
    };
    
    
    function bindProperties() {
        // передвижение по полю
        $( _config().id ).draggable({
            start: function ( event, ui ) {
                $(this).addClass( 'graggable' );
            }
            , drag: function ( event, ui ) {
                /*if ( ui.position.left > 0 ) {
                    ui.position.left = 0;
                }
                if ( ui.position.top > 0 ) {
                    ui.position.top = 0;
                }*/
            }
            , stop: function ( event, ui ) {
                $(this).removeClass( 'graggable' );
            }
        });
    };


    function setList( list ) {
        _list = list;
    };

    /**
     * Масштабирование поля
     */
    function zoom( zoom ) {
        var k = window.CaterJS.pages.Board.koef();

        if ( ( !zoom && k < 0.4 ) || ( zoom && k >= 1.3 ) ) {
            return;
        };
        k = zoom ? k+=0.1 : k-=0.1;
        _setScale( k );
    };

    
    function _ajaxLoadBoard() {
        $.ajax({
            type: 'GET'
            , url: '/ajax/stickers/list'
            , dataType: 'json'
            , data : { id : _config().project }
            , timeout: 10000
            , success: function(data) {
                _run( data );
            }
        });
    };

    /**
     * Изменение масштаба
     */
    function _setScale( koef ) {
        var size;
        if ( koef > 1.3 || koef < 0.4 ) {
            return false;
        };

        size = _config().point * koef;
        $( 'body' ).css( 'font-size', size + 'px' );
        window.CaterJS.pages.Board.toolbar.blockZoom( 0, koef <= 0.4 ? true : false );
        window.CaterJS.pages.Board.toolbar.blockZoom( 1, koef >= 1.3 ? true : false );
        window.CaterJS.pages.Board.toolbar.updateScale();
        window.CaterJS.pages.Board.stickers.updateScale();
        window.CaterJS.helpers.setHash( koef );
    };

    function _run( data ) {
        for ( var i = 0; i < data.length; i++ ) {
            window.CaterJS.pages.Board.stickers.draw( data[ i ] );
        }
        window.CaterJS.pages.Board.stickers.setDraggable();
        // Автомасштабирование
        var hash = window.CaterJS.helpers.getHash();
        hash = window.CaterJS.helpers.toFloat( hash );
        if ( hash > 0 ) {
            _setScale( hash );
        };
    };
    
    
    return {
        init: init
        , zoom: zoom
        , setList: setList
    };
})();
