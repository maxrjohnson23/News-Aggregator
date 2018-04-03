$(document).ready(function () {


    //function to display error modal on ajax error
    function showErrorModal(error) {
        $('#error').modal('show')
    }


    //event listener to reload root when user closes modal showing
    //number of scraped articles
    $('#alertModal').on('hide.bs.modal', function (e) {
        window.location.href = '/';
    });

    //click event to scrape new articles
    $('#scrape').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/scrape',
            type: 'GET',
            success: function (response) {
                $('#numArticles').text(response);
                $('#alertModal').modal('show');
            },
            error: function (error) {
                showErrorModal(error);
            }
        });
    });

    //click event to save an article
    $(document).on('click', '.saveArticle', function () {
        let articleId = $(this).data('id');
        let currentlySaved = $(this).data('saved');

        $.ajax({
            url: `/api/articles/${articleId}/`,
            type: 'PATCH',
            data: {
                saved: !currentlySaved
            },
            success: function (response) {
                window.location.reload();
            },
            error: function (error) {
                showErrorModal(error);
            }
        });
    });

    //click event to open note modal and populate with notes
    $('.view-notes').on('click', function () {
        let articleId = $(this).data('id');

        $.ajax({
            url: `api/articles/${articleId}/notes`,
            type: 'GET',
            success: function (data) {
                data.articleId = articleId;
                let source = $("#notesModal-hbs").html();
                let template = Handlebars.compile(source);
                let html = template(data);

                $('#noteModal').html(html);
                $('#noteModal').modal('show');
            },
            error: function (error) {
                showErrorModal(error);
            }
        });
    });


    // Save note click event
    $(document).on('submit', '#note-form', function (e) {
        e.preventDefault();
        let noteText = $("#note-text").val().trim();
        let articleId = $("#save-note").data('article-id');

        let note = {
            articleId: articleId,
            text: noteText
        };

        $.ajax({
            url: `/api/articles/${articleId}/notes`,
            type: 'POST',
            data: note,
            success: function (data) {
                let source = $("#notesModal-hbs").html();
                let template = Handlebars.compile(source);
                let html = template(data);

                $('#noteModal').html(html);
                $('#note-text').val('').focus();
            },
            error: function (error) {
                showErrorModal(error);
            }
        });

    });

    // Allow user to submit note with enter key
    $(document).on("keypress", "#note-text", function (e) {
        if (e.keyCode === 13) {
            $("#note-form").submit();
        }
    });


    //click event to delete a note from a saved article
    $(document).on('click', '.delete-note', function () {
        let articleId = $("#save-note").data("article-id");
        let noteId = $(this).data("note-id");

        $.ajax({
            url: `/api/articles/${articleId}/notes/${noteId}`,
            type: 'DELETE',
            success: function (data) {
                let source = $("#notesModal-hbs").html();
                let template = Handlebars.compile(source);
                let html = template(data);

                $('#noteModal').html(html);
                $('#note-text').val('');
            },
            error: function (error) {
                showErrorModal(error);
            }
        });
    });


});