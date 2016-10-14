/**
 * @description
 */
window.CaterJS.repo.Acl = (function() {
    var _role, _rules;

    function init() {
        //CaterJS init marker
    };

    function setRole( role ) {
        _role = role;
    };

    function setRules( rules ) {
        _rules = rules;
    };

    function can( action ) {
        if ( _rules[ action ] != undefined && _rules[ action ].indexOf( _role ) != -1 ) {
            return true;
        }
        return false;
    };

    return {
        init: init
        , setRole: setRole
        , setRules: setRules
        , can: can
    };
})();
