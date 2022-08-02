    //Starrr
    $('.starrr').starrr({})

    $('.carousel').slick({
        dots: false,
        infinite: false,
        speed: 300,
        draggable: false,
        slidesToShow: 4,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false
            }
        }, {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, ]
    });
