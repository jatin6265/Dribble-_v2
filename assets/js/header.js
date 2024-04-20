{
$(document).ready(function() {
    $('#toggleButton').click(function() {
        $('#subMenu').toggleClass('hidden');
    });

    $(".Left .hamburger").on("click", function () {
        $('.sidebarWrap')[0].style.left="0vmax"
        $('body')[0].style.overflow="hidden"
    });
});
}




