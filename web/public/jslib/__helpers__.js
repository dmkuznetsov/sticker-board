/**
 * @description Small helpers
 */
window.CaterJS.helpers = {
    /**
     * @description
     * @param {}
     * @returns
     */
     //foo: function( bar ) {
         //return bar*2;
     //}

    getCurrentTime: function() {
        var today = new Date();
        var month = today.getMonth() + 1;
        var dateStr = [
                       today.getFullYear()
                       , ( month < 10 ? '0' + month : month )
                       , today.getDate()
                       ].join( '-' );
        var timeStr = [
                       today.getHours()
                       , today.getMinutes()
                       , today.getSeconds()
                       ].join( ':' );
        return dateStr + ' ' + timeStr;
    }

    , toFloat: function( str ) {
        return parseFloat( str );
    }

    /**
     * Получаем хэш
     */
    , getHash: function() {
        var hash = window.location.hash;
        if ( hash != '' ) {
            return hash.substr( 1 );
        }
        return 0;
    }

    /**
     * Устанавливаем хэш
     */
    , setHash: function( hash ) {
        window.location.hash = hash;
    }

};
