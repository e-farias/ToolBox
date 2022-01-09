(function ($) {

    "use strict";

    const $window = $(window);
    
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
                            .addClass("col-sm-3 mb-5")
                            .append(
                                '<div class="p-3 d-flex flex-column">'+
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
                ).addClass("img-fluid");
            },
            styling: false,
            items: 3,
            items_per_row: 3,
            margin: 0,
            lazy_load: false,
            on_error: console.error
        });
    
    });

    // Products Menu Tabs
    $(window).on("load", function () {

        const productCategory = document.getElementsByClassName("product-category");
        const productsItems = document.getElementsByClassName("products-items");
        var index;

        function showProducts(productType) {

            let productItem = document.getElementById(("products-"+productType));

            if (productType == "all") {
                for (index=0; index<productsItems.length; index++) {
                    productsItems[index].style.display = "flex";
                }
            }
            else {
                for (index=0; index<productsItems.length; index++) {
                    productsItems[index].style.display = "none";
                }
                productItem.style.display = "flex";
            }
            
        }

        for (index=0; index<productCategory.length; index++) {
            
            let id = productCategory[index].id

            productCategory[index].addEventListener("click", () => {
                showProducts(id);
            });

        }

    });  

    // Products Menu Sticky
    $(window).on("load", function () {

        const productMenu = document.getElementById("product-menu");
        const sticky = productMenu.offsetTop;

        function addStickyClass() {

            if (window.pageYOffset > sticky) {
              productMenu.classList.add("sticky");
            } else {
              productMenu.classList.remove("sticky");
            }

        }

        $(window).on("scroll", function () {
            //addStickyClass();
        });

    });

})(jQuery);