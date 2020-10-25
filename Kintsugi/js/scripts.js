(function ($) {
    "use strict";

    var $window = $(window);
    
    // BTN Menu Links
    $(window).on("load", function () {

        const menuLinks = document.querySelector(".menu-links");
        const btnMenuLinks = document.querySelector(".btn-menu-links");
        let btnMenuLinksOpen = false;
    
        btnMenuLinks.addEventListener("click", () => {
            
            if(btnMenuLinksOpen) {
                menuLinks.classList.toggle("open");
                btnMenuLinks.classList.remove("open");
                btnMenuLinksOpen = false;
            }
            else {
                menuLinks.classList.toggle("open");
                btnMenuLinks.classList.add("open");
                btnMenuLinksOpen = true;
            }
    
        });
    
        $('.menu-links li').click(() => {
    
            if(btnMenuLinksOpen) {
                menuLinks.classList.toggle("open");
                btnMenuLinks.classList.remove("open");
                btnMenuLinksOpen = false;
            }
            else {
                pass;
            }
            
        });    

    });

    // Instagram Feed
    $(window).on("load", function () {

        document.addEventListener("gesturestart", function (e) {
            e.preventDefault();
        });
        
        $.instagramFeed({
            tag: 'sushi',
            container: ".feed-itens",
            display_profile: false,
            display_biography: false,
            display_gallery: true,
            callback: function (data) {
                $(".feed-itens .instagram_gallery a img").each(
                    function (i, v) {
                        $(
                            $(
                                ".feed-itens .instagram_gallery a"
                            )[i]
                        )
                            .addClass("col-sm-6 col-md-3 col-lg-3 mb-5")
                            .append(
                                '<div class="p-3 w-100 d-flex flex-column mw-100">'+
                                    '<p class="fix-ellipsis">' + $(v).attr("alt").replace(/\n/g, "<br />") + '</p>'+
                                    '<div><button class="btn mb-3" id="btn-orange-cut">VER MAIS</button></div>' +
                                '</div>'
                            );
                    }
                );
                $(".feed-itens .instagram_gallery").addClass(
                    "row mt-4 justify-content-around"
                );
                $(
                    ".feed-itens .instagram_gallery a img"
                );
            },
            styling: false,
            items: 3,
            items_per_row: 3,
            margin: 0,
            lazy_load: false,
            on_error: console.error
        });
    
    });

    // Get Local Products
    

})(jQuery);