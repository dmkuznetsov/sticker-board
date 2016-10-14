/**
 * @description
 */
window.CaterJS.pages.Main = (function() {
    function init() {
        CaterJS.pages.Main.invite.init();
        CaterJS.pages.Main.createBoard.init();
        CaterJS.pages.Main.editBoard.init();
        CaterJS.pages.Main.deleteBoard.init();
        //CaterJS init marker
    };


    return {
        init: init
    };
})();
