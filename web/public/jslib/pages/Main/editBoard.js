/**
 * @description
 */
window.CaterJS.pages.Main.editBoard = (function() {
    //var moduleVar;

    function init() {
        updateVars();
        bindEvents();
    };

    function updateVars() {
    };

    function bindEvents() {
        showModalEditProject();
        modalEditProjectApply();
        modalEditProjectCancel();
    };

    function showModalEditProject() {
        $( '.edit-project' ).live( 'click', function(e){
            $( '#modal-project-edit' ).modal({
                backdrop: 'static'
                , show: true
                , keyboard: true
            });
            var id = $( e.target ).attr( 'data-project-id' )
                , title = $( '.project-' + id + ' h3 a' ).html()
                , desc = $( '.project-' + id + ' .desc' ).html()
                , members = $( '.project-' + id + ' .members' ).html()
                , membersList = [];
            if ( members ) {
                membersList = members.split( ', ' );
            }
            $( '#modal-project-edit .project-id' ).val( id );
            $( '#modal-project-edit .title' ).val( title );
            $( '#modal-project-edit .description' ).val( desc );
            $( '#modal-project-edit .members' ).html( '' );
            for ( var i = 0; i < membersList.length; i++ ) {
                $( '#modal-project-edit .members' ).append( '<li>' + membersList[ i ] + ' <a href="#" class="member-delete icon-remove"></a></li>' );
            }

            return false;
        });
    };
    
    function modalEditProjectApply() {
        $( '#modal-project-edit .apply' ).click( function(e){
            var id = $( '#modal-project-edit .project-id' ).val()
                , title = $( '#modal-project-edit .title' ).val()
                , description = $( '#modal-project-edit .description' ).val();

            $( '#modal-project-edit' ).modal( 'hide' );
            ajaxEditProject( id, title, description );
            return false;
        });
    };

    function modalEditProjectCancel() {
        $( '#modal-project-edit .cancel' ).click( function(e){
            $( '#modal-project-edit' ).modal( 'hide' );
            return false;
        });
    };

    function ajaxEditProject( id, title, description ) {
        $.ajax({
            type: 'GET'
            , url: '/ajax/project/edit'//'/?_action=Project_Edit'
            , dataType: 'json'
            , data: {
                'project' : id
                , 'title' : title
                , 'description' : description
            }
            , timeout: 10000
            , error: function(jqXHR, textStatus, errorThrown) {
                console.log( textStatus );
            }
            , success: function( data ) {
                editProjectInList( data.project_id, data.name, data.description );
            }
        });
    };

    function editProjectInList( id, title, description ) {
        if ( description == null ) {
            description = "";
        };
        $( '.project-list .project-' + id + ' .title' ).html( title );
        $( '.project-list .project-' + id + ' .desc' ).html( description );
    };



    return {
        init: init

    };
})();
