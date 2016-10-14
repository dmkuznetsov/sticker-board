/**
 * @description
 */
window.CaterJS.pages.Board.stickers = (function() {
    var _editMode = false
        , _timeClick = 0
        , _timerClick = 0;

    function init() {
        updateVars();
        bindEvents();
    };

    function updateVars() {
        _editMode = false;
    };

    function _config() {
        return window.CaterJS.repo.Registry.namespace( 'board' ).get( 'config' );
    };

    function _can( page ) {
        return window.CaterJS.repo.Acl.can( page );
    };

    function bindEvents() {
        //_listenerMouseEventOnActionBtn();

        _listenerEventStartEditSticker();
        _listenerEventEndEditSticker();

        //_listenerEventDeleteSticker();
        _listenerEventCreateSticker();

        _listenerMouseEventOnColor();
        _listenerEventPanelButtons();

        _listenerEventDroppable();
        _listenerMouseEventGarbage();
    };


    /**
     * Обновление масштаба у стикеров
     */
    function updateScale() {
        var list = $( _config().id + ' .sticker' )
        , item, left, top
        , k = window.CaterJS.pages.Board.koef();
    
        for ( var i = 0; i < list.length; i++ ) {
            item = $( list[ i ] );
            left = k * item.attr( 'data-orig-left' );
            top = k * item.attr( 'data-orig-top' );
    
            item.css( 'top', top );
            item.css( 'left', left );
        };
    };


    /**
     * Создание стикера
     */
    function draw( item, temp ) {
        var options = [
                   'data-style="' + item.style + '"'
                   , 'data-orig-top="' + window.CaterJS.pages.Board.orig( item.top ) + '"'
                   , 'data-orig-left="' + window.CaterJS.pages.Board.orig( item.left ) + '"'
                   ].join( ' ' )
            , k = window.CaterJS.pages.Board.koef();
        var classes = item.font;
        if ( temp === true ) {
            item.left = window.CaterJS.pages.Board.orig( item.left ) * k;
            item.top = window.CaterJS.pages.Board.orig( item.top ) * k;
        };
        if ( item.strike == 1 ) {
            classes += ' strike';
        };
        var element = $( '<div id="' + item.id + '" class="sticker ' + item.style + '" ' + options + '><p class="' + classes + '">' + item.text + '</p></div>' );
        element.css( 'position', 'absolute' );
        element.css( 'left', item.left + 'px' );
        element.css( 'top', item.top + 'px' );
        $( _config().id ).append( element );
    };


    /**
     * Обновление данных стикера
     */
    function update( stickerId, temp ) {
        var item = {}
            , sticker = $( _config().id + ' > .sticker[id=' + stickerId + ']' );

        if ( sticker ) {
            item.id = stickerId;
            item.left = window.CaterJS.helpers.toFloat( sticker.css( 'left' ) );
            item.top = window.CaterJS.helpers.toFloat( sticker.css( 'top' ) );
            item.style = sticker.attr( 'data-style' );
            item.text = $( 'p', sticker ).html();
            
            var classes = [ 'big', 'medium', 'small' ];
            var fontSize = 'small';
            for ( var i = 0; i < classes.length; i++ ) {
                if ( $( 'p', sticker ).hasClass( classes[ i ] ) ) {
                    fontSize = classes[ i ];
                    break;
                };
            };
            item.font = fontSize;
            item.strike = $( 'p', sticker ).hasClass( 'strike' ) ? 1 : 0;
            if ( temp !== true ) {
                _ajaxStickerUpdate( item );
            };
        };
    };

    /**
     * Удаление стикера по id
     */
    function del( stickerId, temp ) {
        $( '#' + stickerId ).remove();
        if ( temp !== true ) {
            _ajaxStickerDelete( stickerId );
        };
    };


    function move( sticker ) {
        var k = window.CaterJS.pages.Board.koef();
        $( '#' + sticker.id ).css( 'top', sticker.top * k );
        $( '#' + sticker.id ).css( 'left', sticker.left * k );
        //$( '#' + sticker.id ).css( 'outline', '3px solid red' );
    };

    function updateSticker( sticker ) {
        var item = $( _config().id + ' .sticker[id=' + sticker.id + ']' )
            , k = window.CaterJS.pages.Board.koef();

        if ( item ) {
            item.attr( 'data-style', sticker.style );
            //item.attr( 'data-login', sticker.login );
            //item.attr( 'data-update', sticker.update );
            item.attr( 'data-orig-top', sticker.top );
            item.attr( 'data-orig-left', sticker.left );
            item.attr( 'class', 'sticker ui-draggable ' + sticker.style );

            var pItem = $( 'p', item );
            var classes = '';
            if ( pItem ) {
                pItem.html( sticker.text );
                classes = sticker.font;
                if ( sticker.strike ) {
                    classes += ' strike';
                };
                pItem.attr( 'class', classes );
            };

            var tItem = $( 'textarea', item );
            if ( tItem ) {
                tItem.val( sticker.text );
                classes = sticker.font;
                if ( sticker.strike ) {
                    classes += ' strike';
                };
                tItem.attr( 'class', classes );
            };
            item.css( 'left', item.left + 'px' );
            item.css( 'top', item.top + 'px' );
        };
    };


    /**
     * Упорядочивание стикеров
     */
    function order( temp ) {
        if ( !_can( 'order-sticker' ) ) {
            return false;
        };

        var list = $( _config().id + ' .sticker' )
            , coords = {}
            , newCoords = {}
            , item, width, height
            , k = window.CaterJS.pages.Board.koef();
        
        for ( var i = 0; i < list.length; i++ ) {
            item = $( list[ i ] );
            coords = item.position();
            newCoords = { 'left': 0, 'top': 0 };
            width = item.width() + k * _config().margin;
            height = item.height() + k * _config().margin;
    
            if ( coords.left % width >= width / 2 ) {
                newCoords.left = Math.floor( coords.left / width ) + 1;
            } else {
                newCoords.left = Math.floor( coords.left / width );
            }
            newCoords.left *= width;
            newCoords.left += width / 4;
    
            if ( coords.top % height >= height / 2 ) {
                newCoords.top = Math.floor( coords.top / height ) + 1;
            } else {
                newCoords.top = Math.floor( coords.top / height );
            }
            newCoords.top *= height;
            newCoords.top += height / 4;
    
            item.css( 'top', newCoords.top );
            item.css( 'left', newCoords.left );
            item.attr( 'data-orig-left', window.CaterJS.pages.Board.orig( newCoords.left ) );
            item.attr( 'data-orig-top', window.CaterJS.pages.Board.orig( newCoords.top ) );
            
            update( item.attr( 'id' ), temp );
        };
    };

    
    /**
     * Добавление возможности перетаскивания стикера
     */
    function setDraggable() {
        if ( !_can( 'edit-sticker' ) ) {
            return false;
        };

        $( _config().id + ' .sticker' ).draggable({
            opacity: 0.7
            , axis: 'x,y'
            , stack: _config().id + ' > .sticker'
            , start: function ( event, ui ) {
                $(this).addClass( 'graggable' );
            }
            , stop: function( event, ui ) {
                // Если вышли за поле - возвращать стикер обратно
                update( $(this).attr( 'id' ) );
                var sticker = $( _config().id + ' > .sticker[id=' + $(this).attr( 'id' ) + ']' );
                sticker.attr( 'data-orig-left', window.CaterJS.pages.Board.orig( sticker.position().left ) );
                sticker.attr( 'data-orig-top', window.CaterJS.pages.Board.orig( sticker.position().top ) );
                $(this).removeClass( 'graggable' );
            }
        });
    };

   
    
    
    
    /**
     * Запрос на создание стикера
     */
    function _ajaxStickerCreate( sticker ) {
        $.ajax({
            type: 'GET'
            , url: '/ajax/stickers/add'
            , dataType: 'json'
            , data: {
                project: _config().project
                , left: window.CaterJS.pages.Board.orig( sticker.left )
                , top: window.CaterJS.pages.Board.orig( sticker.top )
            }
            , timeout: 10000
            , success: function( data ) {
                var element = $( '#' + sticker.id ); 
                element.attr( 'id', data.id );
                element.attr( 'class', 'sticker ' + data.style );
                element.attr( 'data-style', data.style );
                element.attr( 'data-login', data.login );
                element.attr( 'data-update', data.update );
            }
            , error: function(jqXHR, textStatus, errorThrown) {
                console.log( textStatus );
            }
        });
    };

    /**
     * Обновление данных стикера
     */
    function _ajaxStickerUpdate( sticker ) {
        $.ajax({
            type: 'GET'
            , url: '/ajax/stickers/edit'
            , dataType: 'json'
            , data: {
                id: sticker.id
                , project: _config().project
                , left: window.CaterJS.pages.Board.orig( sticker.left )
                , top: window.CaterJS.pages.Board.orig( sticker.top )
                , style: sticker.style
                , text: sticker.text
                , font: sticker.font
                , strike: sticker.strike
            }
            , timeout: 10000
            , error: function(jqXHR, textStatus, errorThrown) {
                console.log( textStatus );
            }
        });
    };

    /**
     * Запрос на удаление стикера
     */
    function _ajaxStickerDelete( stickerId ) {
        $.ajax({
            type: 'GET'
            , url: '/ajax/stickers/delete'
            , dataType: 'json'
            , data: {
                id: stickerId
                , project: _config().project
            }
            , timeout: 10000
            , error: function(jqXHR, textStatus, errorThrown) {
                console.log( textStatus );
            }
        });
    };


    /**
     * Обработка события создания нового стикера
     */
    function _listenerEventCreateSticker() {
        if ( !_can( 'create-sticker' ) ) {
            return false;
        };

        $( _config().id ).live( "dblclick", function(e){
            if ( e.offsetX == undefined ) {
                e.offsetX = e.pageX - $(e.target).position().left;
                e.offsetY = e.pageY - $(e.target).position().top;
            };
            var k = window.CaterJS.pages.Board.koef();
            var sticker = {
                    id: 'id' + ( ( Math.random() * 10 ) + 1|1 )
                    , style: _config().style
                    , login: _config().login
                    , left: e.offsetX - _config().margin * 2 * k
                    , top: e.offsetY - _config().margin * 2 * k
                    , text: ''
                    , update: window.CaterJS.helpers.getCurrentTime()
            };
            draw( sticker );
            _ajaxStickerCreate( sticker );
            setDraggable();
            return false;
        });
    };


    /**
     * Real-time изменение цвета стикера
     */
    function _listenerMouseEventOnColor() {
        if ( !_can( 'edit-sticker' ) ) {
            return false;
        };

        $( '.sticker > .colors li' ).live( "click", function(e){
            var obj = $(e.target);
            $( '.sticker > .colors li' ).removeClass( 'current' );
            $(e.target).parent().parent().attr( 'class', 'sticker ui-draggable' );
            $(e.target).parent().parent().attr( 'data-style', obj.attr( 'class' ) );
            $(e.target).parent().parent().addClass( obj.attr( 'class' ) );
            $(e.target).addClass( 'current' );
        });
    };


    /**
     * Режим редактирования стикера
     */
    function _listenerEventStartEditSticker() {
        if ( !_can( 'edit-sticker' ) ) {
            return false;
        };

        $(  _config().id + ' .sticker' ).live( "dblclick", function(e) {
            if ( e.ctrlKey ) {
                del( $(this).attr( 'id' ) );
                return false;
            };
            _editMode = true;
            _visualModeOn( this );
            return false;
        });
    };


    /**
     * Выход из режима редактирования
     */
    function _listenerEventEndEditSticker() {
        if ( !_can( 'edit-sticker' ) ) {
            return false;
        };

        $( '#modal-sticker-new' ).on( "hidden", function(e) {
            _editMode = false;
            _visualModeOff( $( _config().id + ' #' + $( '#modal-sticker-new .sticker' ).attr( 'id' ) ) );
        });
    };


    function _visualModeOff( obj ) {
        var modalSticker = $( '#modal-sticker-new .sticker' );

        $(obj).removeClass();
        $(obj).addClass( 'sticker' );
        $(obj).addClass( 'ui-draggable' );
        $(obj).addClass( modalSticker.attr( 'data-style' ) );

        $(obj).attr( 'data-style', modalSticker.attr( 'data-style' ) );
        //$(obj).attr( 'data-update', modalSticker.attr( 'data-update' ) );
        //$(obj).attr( 'data-login', modalSticker.attr( 'data-login' ) );

        $( 'p', obj ).html( $( 'textarea', modalSticker ).val() );
        $( 'p', obj ).attr( 'class', $( 'textarea', modalSticker ).attr( 'class' ) );

        update( $(obj).attr( 'id' ) );
    };


    /**
     * 
     */
    function _visualModeOn( obj ) {
        var classes = [ 'big', 'medium', 'small' ]
            , fontSize = 'small'
            , strike = ''
            , style = $(obj).attr( 'data-style' )
            , text = $( 'p', obj ).html();
        for ( var i = 0; i < classes.length; i++ ) {
            if ( $( 'p', obj ).hasClass( classes[ i ] ) ) {
                fontSize = classes[ i ];
                break;
            };
        };
        if ( $( 'p', obj ).hasClass( 'strike' ) ) {
            strike = 'strike';
        };

        var modalSticker = $( '#modal-sticker-new' );
        modalSticker.modal({
            keyboard: true
            , show: true
        });

        var k = window.CaterJS.pages.Board.koef();
        modalSticker.css( 'top', $(obj).offset().top - k );
        modalSticker.css( 'left', $(obj).offset().left - k );

        var stickerDiv = $( '.sticker', modalSticker );
        stickerDiv.removeClass();
        stickerDiv.addClass( 'sticker' );
        stickerDiv.addClass( style );
        stickerDiv.attr( 'id', $(obj).attr( 'id' ) );
        stickerDiv.attr( 'data-style', style );
        stickerDiv.attr( 'data-update', $(obj).attr( 'data-update' ) );
        stickerDiv.attr( 'data-login', $(obj).attr( 'data-login' ) );
        stickerDiv.attr( 'data-orig-top', $(obj).attr( 'data-orig-top' ) );
        stickerDiv.attr( 'data-orig-left', $(obj).attr( 'data-orig-left' ) );
        $( 'textarea', stickerDiv ).val( text );
        $( 'textarea', stickerDiv ).removeClass();
        $( 'textarea', stickerDiv ).addClass( fontSize );
        if ( strike != '' ) {
            $( 'textarea', stickerDiv ).addClass( strike );
        };

        $('.colors li', stickerDiv ).removeClass( 'current' );
        $.each( $('.colors li', stickerDiv ), function( i, element ) {
            if ( $(element).hasClass( style ) ) {
                $(element).addClass( 'current' );
                return false;
            };
        });
    };


    /**
     * Действия кнопок свойств
     */
    function _listenerEventPanelButtons() {
        $( '.sticker > .panel > .big' ).live( "click", function(e) {
            var sticker = $(e.target).parent().parent();
            var strike = $( 'textarea', sticker ).hasClass( 'strike' );
            $( 'textarea', sticker ).removeClass();
            $( 'textarea', sticker ).addClass( 'big' );
            if ( strike ) {
                $( 'textarea', sticker ).addClass( 'strike' );
            };
            return false;
        });
        $( '.sticker > .panel > .medium' ).live( "click", function(e) {
            var sticker = $(e.target).parent().parent();
            var strike = $( 'textarea', sticker ).hasClass( 'strike' );
            $( 'textarea', sticker ).removeClass();
            $( 'textarea', sticker ).addClass( 'medium' );
            if ( strike ) {
                $( 'textarea', sticker ).addClass( 'strike' );
            };
            return false;
        });
        $( '.sticker > .panel > .small' ).live( "click", function(e) {
            var sticker = $(e.target).parent().parent();
            var strike = $( 'textarea', sticker ).hasClass( 'strike' );
            $( 'textarea', sticker ).removeClass();
            $( 'textarea', sticker ).addClass( 'small' );
            if ( strike ) {
                $( 'textarea', sticker ).addClass( 'strike' );
            };
            return false;
        });
        $( '.sticker > .panel > .strike' ).live( "click", function(e) {
            var sticker = $(e.target).parent().parent();
            if ( $( 'textarea', sticker ).hasClass( 'strike' ) ) {
                $( 'textarea', sticker ).removeClass( 'strike' );
            } else {
                $( 'textarea', sticker ).addClass( 'strike' );
            };
            return false;
        });
        $( '.sticker > .panel > .emo' ).live( "click", function(e) {
            return false;
        });
    };


    /**
     * Перемещение стикера в корзину
     */
    function _listenerEventDroppable() {
        $( _config().id + ' .garbage' ).droppable({
            accept: '.sticker'
            //, activeClass: 'garbage'
            , hoverClass: 'activeGarbage'
            , drop: function ( event, ui ) {
                var id = $(ui.draggable[ 0 ]).attr( 'id' );
                del( id );
                return false;
            }
        });
    };


    /**
     * Перемещение стикера в корзину
     */
    function _listenerMouseEventGarbage() {
        $( _config().id + ' .sticker' ).live( "mousedown", function(e){
            _timeClick = 0;
            clearInterval( _timerClick );
            _timerClick = setInterval( _showGarbage, 20 );
        });
        $( _config().id + ' .sticker' ).live( "mouseup", function(e){
            _timeClick = 0;
            clearInterval( _timerClick );
            setTimeout( _hideGarbage, 100 );
        });
    };

    function _showGarbage() {
        _timeClick += 20;
        if ( _timeClick >= 240 )
        {
            clearInterval( _timerClick );
            $( _config().id + ' .garbage' ).fadeIn();
        }
    };

    function _hideGarbage() {
        $( _config().id + ' .garbage' ).fadeOut();
    };


    return {
        init: init
        , draw: draw
        , update: update
        , updateSticker: updateSticker
        , del: del
        , move: move
        , updateScale: updateScale
        , order: order
        , setDraggable: setDraggable
    };
})();
