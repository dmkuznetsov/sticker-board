/**
 * @description
 */
window.CaterJS.pages.Main.deleteBoard = (function() {
    //var moduleVar;

    function init() {
        updateVars();
        bindEvents();
    };

    function updateVars() {
    };

    function bindEvents() {
        showModalDeleteProject();
        modalDeleteProjectApply();
        modalDeleteProjectCancel();
    };

    function showModalDeleteProject() {
        $( '.delete-project' ).live( 'click', function(e){
            $( '#modal-project-delete' ).modal({
                backdrop: 'static'
                , show: true
                , keyboard: true
            });
            var id = $( e.target ).attr( 'data-project-id' );
            $( '#modal-project-delete .project-id' ).val( id );
            return false;
        });
    };
    
    function modalDeleteProjectApply() {
        $( '#modal-project-delete .apply' ).click( function(e){
            var id = $( '#modal-project-delete .project-id' ).val();
            $( '#modal-project-delete' ).modal( 'hide' );
            ajaxDeleteProject( id );
            return false;
        });
    };

    function modalDeleteProjectCancel() {
        $( '#modal-project-delete .cancel' ).click( function(e){
            $( '#modal-project-delete' ).modal( 'hide' );
            return false;
        });
    };

    function ajaxDeleteProject( id ) {
        $.ajax({
            type: 'GET'
            , url: '/ajax/project/delete'//'/?_action=Project_Delete'
            , dataType: 'json'
            , data: {
            'project' : id
            }
            , timeout: 10000
            , error: function(jqXHR, textStatus, errorThrown) {
                console.log( textStatus );
            }
            , success: function( data ) {
                deleteProjectFromList( id );
            }
        });
    };

    function deleteProjectFromList( id ) {
        $( '.project-list .project-' + id ).remove();
    };


    return {
        init: init

    };
})();
