$(document).ready(function () {
    $(".icon-menu").click(function () {
        $(".mobilenav").fadeToggle(500);
        $(".top-menu").toggleClass("top-animate");
        $(".mid-menu").toggleClass("mid-animate");
        $(".bottom-menu").toggleClass("bottom-animate");
    });
});
$(document).ready(function () {
    $(".icon-filter").click(function () {
        $(".filter-search").fadeToggle(500);
    });
});
