/**
 * @description
 */
window.CaterJS.pages.Main.createBoard = (function() {
    //var moduleVar;

    function init() {
        updateVars();
        bindEvents();
    };

    function updateVars() {
    };

    function bindEvents() {
        showModalCreateProject();
        modalCreateProjectApply();
        modalCreateProjectCancel();
    };


    function showModalCreateProject() {
        $( '.create-project' ).live( 'click', function(e){
            $( '#modal-project' ).modal({
                backdrop: 'static'
                , show: true
                , keyboard: true
            });
            return false;
        });
    };
    
    function modalCreateProjectApply() {
        $( '#modal-project .apply' ).click( function(e){
            var title = $( '#modal-project .title' ).val();
            var description = $( '#modal-project .description' ).val();
            $( '#modal-project' ).modal( 'hide' );
            ajaxCreateProject( title, description );
            return false;
        });
    };

    function modalCreateProjectCancel() {
        $( '#modal-project .cancel' ).click( function(e){
            $( '#modal-project' ).modal( 'hide' );
            return false;
        });
    };

    function ajaxCreateProject( title, description ) {
        $.ajax({
            type: 'GET'
            , url: '/ajax/project/add'//'/?_action=Project_Add'
            , dataType: 'json'
            , data: {
                'title' : title
                , 'description' : description
            }
            , timeout: 10000
            , error: function(jqXHR, textStatus, errorThrown) {
                console.log( textStatus );
            }
            , success: function( data ) {
                innerProjectInList( data.project_id, data.name, data.description );
            }
        });
    };

    function innerProjectInList( id, title, description ) {
        if ( description == null ) {
            description = "Как-нибудь потом заполню";
        };
        var html = [
            '<li class="project-' + id + '">'
            , '<h3>'
            , '<a href="/' + id + '" target="_blank" class="title">' + title + '</a>'
            , ' <a href="#edit" class="edit-project icon-pencil" data-project-id="' + id + '" title="Редактировать"><span class="hide">Редактировать</span></a>'
            , ' <a href="#delete" class="delete-project icon-trash" data-project-id="' + id + '" title="Удалить"><span class="hide">Удалить</span></a>'
            , '</h3>'
            , '<div class="desc">' + description + '</div>'
            , '<a href="#" class="invite" data-project-id="' + id + '">Пригласить</a>'
            , '</li>'
        ].join( '' );
        $( '.project-list ul' ).append( html );
    };



    return {
        init: init

    };
})();
