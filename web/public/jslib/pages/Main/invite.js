/**
 * @description
 */
window.CaterJS.pages.Main.invite = (function() {
    //var moduleVar;

    function init() {
        updateVars();
        bindEvents();
    };

    function updateVars() {
    };

    function bindEvents() {
        $( '#modal-invite' ).modal({
            backdrop: 'static'
            , show: false
            , keyboard: true
        });
        /*$( '#modal-invite' ).on( 'show', function(){
            _modalDisplay();
        });
        $( '#modal-invite' ).on( 'hidden', function(){
            _modalHide();
        });
        $( '.invite' ).live( 'click', function(e){
            $( '#modal-invite' ).modal( 'show' );
            return false;
        });*/
        
        showModalInvite();
        modalInviteApply();
        modalInviteCancel();
    };

    function showModalInvite() {
        $( '.invite' ).live( 'click', function(e){
            var title = $( 'h3 > a', e.target.parentElement ).html();
            var projectId = $( e.target ).attr( 'data-project-id' );
            $( '#modal-invite .title' ).html( title );
            $( '#modal-invite .project-id' ).val( projectId );
            $( '#modal-invite' ).modal( 'show' );
            return false;
        });
    };

    function modalInviteApply() {
        $( '#modal-invite .apply' ).click( function(e){
            ajaxSendInvite();
            $( '#modal-invite' ).modal( 'hide' );
            return false;
        });
    };

    function modalInviteCancel() {
        $( '#modal-invite .cancel' ).click( function(e){
            $( '#modal-invite' ).modal( 'hide' );
            return false;
        });
    };

    function ajaxSendInvite() {
        var projectId = $( '#modal-invite .project-id' ).val();
        var login = $( '#modal-invite .login' ).val();
        var email = $( '#modal-invite .email' ).val();
        var role = $( '#modal-invite .role' ).val();
        $.ajax({
            type: 'GET'
            , url: '/ajax/project/invite'//'/?_action=Project_Invite'
            , dataType: 'json'
            , data: {
                'project' : projectId
                , 'login' : login
                , 'email' : email
                , 'role' : role
            }
            , timeout: 10000
            , error: function(jqXHR, textStatus, errorThrown) {
                console.log( textStatus );
            }
        });
    };


    return {
        init: init

    };
})();
