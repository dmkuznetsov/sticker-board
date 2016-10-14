/**
 * @description
 */
window.CaterJS.repo.Registry.storage = (function() {
    var params = [];

    function get( name ) {
        if ( !params[ name ] ) {
            params[ name ] = {
                vars : {}
                , set : function( name, value ) {
                    this.vars[ name ] = value;
                }
                , get : function( name ) {
                    if ( !this.vars[ name ] ) {
                        return null;
                    }
                    return this.vars[ name ];
                }
            };
        }
        return params[ name ];
    }

    return {
        get : get,
        namespace : get
    };
})();
