
$(document).ready(function () {

    $('#page-theme').find('button').click(function () {

        let themeName = $(this).data('bs-theme-value');

        if (themeName === 'light') {
            $('html').removeAttr('data-bs-theme');
            $('#page-theme .nav-link').html('<i class="bi bi-sun"></i>');

        } else {
            $('html').attr('data-bs-theme', 'dark');
            $('#page-theme .nav-link').html('<i class="bi bi-moon-stars"></i>');
        }
    });


    // Code highlight
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
});