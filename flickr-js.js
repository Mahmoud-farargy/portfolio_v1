$(document).ready(function(){
        var images = [
           ["linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(images/Ann_and_Chris_Short_Eared_Owl.jpg) no-repeat top", "<a href='#'>USS John F. Kennedy<br> by Claire Gentile</a>"],
           ["linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(images/Audrey_Bellot_Kiss_the_paws.jpg) no-repeat top", "<a href='#'>K I S S • T H E • P A W S <br> by Audrey Bellot</a>"],
           ["linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(images/Claire_Gentile_USSJohnFKennedy.jpg) no-repeat center","<a href='#'>USS John F. Kennedy<br> by Claire Gentile</a>"],
           ["linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(images/Elena_Shumilova_City_Of_Nomads.jpg) no-repeat center","<a href='#'>in the city of nomads.. <br> by Elena Shumilova</a>"],
           ["linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(images/Alex_Noriega_Pure_Magic.jpg) no-repeat center","<a href='#'>Pure Magic <br> by Alex Noriega</a>"],
           ["linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(images/Jessica_Drossin_Balance.jpg) no-repeat center","<a href='#'>Balance <br> by Jessica Drossin </a>"],
           ["linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(images/Kristina_Makeeva_Untitled.jpg) no-repeat center","<a href='#'>Untitled <br> by Kristina Makeeva </a>"],
           ["linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(images/Monte_Stinnett_The_Landing.jpg) no-repeat center","<a href='#'>The landing <br> by monte stinnett</a>"],
           ["linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(images/Ramon_Covelo_Sakrisoy_Dreams.jpg) no-repeat center","<a href='#'>Sakrisøy Dreams <br> by Ramón M. Covelo</a>"],
           ["linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(images/Snowy_Owl_Tom_Ingram.jpg) no-repeat center","<a href='#'>Snowy Owl (Explored 2-13-19) <br> by Tom Ingram</a>"],
           ["linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(images/Perez_Alonso_Photography_Chocolate_Mountains.jpg) no-repeat center", "<a href='#'> hocolate Mountains <br> by Perez Alonso Photograph<a/>"],
           ["linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(images/koen_jacobs_undeniable_dilemma.jpg) no-repeat center","<a href='#'>undeniable <br> dilemma</a>"],
        ];
        var i= 0;
        setInterval(function(){
            i = (i+1) % images.length;
            $(".background-pic").css("background", images[i][0]);
            $(".photo-info").append("<h2>").html(images[i][1]);                   
            console.log(images[i][0]);
        }, 5000);
        $(".background-pic").css({"background":"linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(images/Jesse_Moran_Resurrect.jpg) no-repeat center"});
        $(".background-pic").css("bodyground-size","100% 100%");
        $(".photo-info").html("<a href='#'>Resurrect <br> by Jesse Moran</a>");
        console.log("working");

});