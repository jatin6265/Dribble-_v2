{
    $(document).ready(function () {
    
    $(".back img").on("click", function () {
        console.log( $('.sidebarWrap'))
        $('.sidebarWrap')[0].style.left="-50vmax"
        $('body')[0].style.overflow="scroll"
    });
  
});
}
  