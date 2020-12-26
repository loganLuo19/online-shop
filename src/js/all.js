$(document).ready(function () {
    $('.scrollTop').click(function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        var targetPos = $(target).offset().top;
        $('html, body').animate({ scrollTop: targetPos }, 1000);   
    });
    $('.likeBtn').click(function (e) { 
        e.preventDefault();
        $(this).find('.likeBtnAction').toggleClass('d-inline-block');
    });
});