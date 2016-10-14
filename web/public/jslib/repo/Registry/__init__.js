/**
 * @description
 */
window.CaterJS.repo.Registry = (function() {
    function init() {
    };

    function namespace( namespace ) {
    	return window.CaterJS.repo.Registry.storage.get( namespace );
    };

    return {
        init: init
        , namespace: namespace
    };
})();
