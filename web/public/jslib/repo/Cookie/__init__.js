/**
 * @description
 */
window.CaterJS.repo.Cookie = (function() {
    function init() {
        //CaterJS init marker
    };

    /**
     * Set cookie
     * @var name
     * @var value
     * @var expires
     * @var path
     * @var domain
     * @var secure
     */
    function set( name, value, expires, path, domain, secure ) {
        if ( !name && !value ) {
            return false;
        };

        var cooka = []; 
        cooka[ 0 ] = name + '=' + encodeURIComponent( value );
        
        if ( expires ) {
            cooka[ 1 ] = 'expires=' + expires.toGMTString();
        };
        if ( path ) {
            cooka[ 2 ] = 'path=' + path;
        };
        if ( domain ) {
            cooka[ 3 ] = 'domain=' + domain;
        };
        if ( secure ) {
            cooka[ 4 ] = 'secure';
        };
        
        document.cookie = cooka.join( ';' );
        return true;
    };

    /**
     * Get cookie value
     * @var name
     */
    function get( name ) {
        var pattern = "(?:; )?" + name + "=([^;]*);?";
        var regexp  = new RegExp( pattern );
        
        if ( regexp.test(document.cookie) ) {
            return decodeURIComponent( RegExp[ "$1" ] );
        };

        return false;
    };

    /**
     * Delete cookie
     * @var name
     * @var path
     * @var domain
     */
    function del( name, path, domain ) {
        set( name, null, new Date(0), path, domain );
        return true;
    };

    return {
        init: init
        , set: set
        , get: get
        , del: del
    };
})();
