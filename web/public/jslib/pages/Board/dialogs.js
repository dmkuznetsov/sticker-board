/**
 * @description
 */
window.CaterJS.pages.Board.dialogs = (function() {
    var _stickerSelected;

    function init() {
        /*updateVars();
        bindEvents();*/
    };

    function _config() {
        return window.CaterJS.repo.Registry.namespace( 'board' ).get( 'config' );
    };

    function _can( action ) {
        return window.CaterJS.repo.Acl.can( action );
    };

    function updateVars() {
    };

    function bindEvents() {
        showStickerOptions();
        stickerOptionsApply();
        stickerOptionsCancel();
    };


    /**
     * Опции выбранного стикера
     */
    function showStickerOptions() {
        if ( !_can( 'edit-sticker' ) ) {
            return false;
        };

        $( _config().id + ' > div' ).live( "dblclick", function(e){
            _stickerSelected = $(this).attr( 'id' );
            $( '#text' ).val( $( 'p', this).html() );
            $( '#styles option[value=' + $(this).attr( 'data-style' ) + ']' ).attr( 'selected', 'selected' );
            var update = [
                          $(this).attr( 'data-login' )
                          , $(this).attr( 'data-update' )
                          ].join( ', ' );
            $( '#author' ).html( update );
            $( '#modal-sticker' ).modal({
                backdrop: 'static'
                , keyboard: true
                , show: true
            });
            return false;
        });
    };
    
    /**
     * Нажатие на кнопку Применить
     */
    function stickerOptionsApply() {
        $( '#modal-sticker .apply' ).click( function(e){
            var sticker = $( '#' + _stickerSelected );
            $( 'p', sticker ).html( $( '#text' ).val() );
            sticker.attr( 'class', $( '#styles' ).val() );
            sticker.attr( 'data-style', $( '#styles' ).val() );
            window.CaterJS.pages.Board.stickers.update( _stickerSelected );
            _clearDialog();
            return false;
        });
    };
    
    /**
     * Нажатие на кнопку Отмена
     */
    function stickerOptionsCancel() {
        $( '#modal-sticker .cancel' ).click( function(e){
            $( '#modal-sticker' ).modal( 'hide' );
            return false;
        });
    };

    /**
     * Очистка полей диалога
     */
    function _clearDialog() {
        $( '#text' ).val( '' );
        $( '#author' ).html( '' );
        $( '#modal-sticker' ).modal( 'hide' );
    };


    return {
        init: init

    };
})();
