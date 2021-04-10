$(function(){
      //Get full year
        $("#year").html(new Date().getFullYear());
        //scrollspy
        $("body").scrollspy({target: "#main-nav"});
    
    //Configure the carousel
        $(".carousel").carousel({
            interval: 6000,
            keyboard: true,
            pause: "hover"
        })
    //Lightbox
    var galleryItems = $("#gallery").find("img");
    galleryItems.on("click",function(){
    var source= $(this).attr("src");
    var image= $("<img>").attr("src", source)
    $(".lightbox").append(image).fadeIn(800);
    })

    $(".lightbox").click(function(){
        $(this).css("display","none");
    })


         // Auto play modal video
         $(".video").click(function () {
            var theModal = $(this).data("target"),
              videoSRC = $(this).attr("data-video"),
              videoSRCauto = videoSRC + "?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1";
            $(theModal + ' iframe').attr('src', videoSRCauto);
            $(theModal + ' button.close').click(function () {
              $(theModal + ' iframe').attr('src', videoSRC);
            });
          });
})