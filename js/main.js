$(document).ready(function(){	
    var myWidth,myHeight,nowSlide = 0,blocked = false;
    function resize(){
        if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
    }
    $(window).resize(resize);
    resize();

    $(".b-content *").hide();
    $("#b-main-content *").show();

    $(".b-next-page").click(function(){
        if( nowSlide == 1 || blocked == true ) return false;
        blocked = true;
        $("#b-doc-content").css({
            "left" : myWidth + 2000
        });
        $(".b-top-menu li").eq(0).addClass("hover");

        $("body").bind("click",function(){
            $(".b-top-menu li").eq(0).removeClass("hover");
            $("body").unbind("click");
        });

        setTimeout(function(){
            nowSlide = 1;
            $("#b-doc-content *").show();
            TweenLite.to($("#b-main-content"), 1.3, { "left" : -myWidth-2000, ease : Quad.easeInOut } );
            TweenLite.to($("#b-doc-content"), 1.3, { "left" : 0, ease : Quad.easeInOut } );
            setTimeout(function(){
                blocked = false;
                $("#b-main-content *").hide();
                setFooter();
            },1000);
        },10);

        return false;
    });

    $(".b-prev-page").click(function(){
        if( nowSlide == 0 || blocked == true ) return false;
        blocked = true;
        $("#b-main-content").css({
            "left" : -myWidth-2000
        });
        $(".b-top-menu li").eq(0).addClass("hover");

        $("body").bind("click",function(){
            $(".b-top-menu li").eq(0).removeClass("hover");
            $("body").unbind("click");
        });

        setTimeout(function(){
            nowSlide = 0;
            $("#b-main-content *").show();
            setFooter();
            TweenLite.to($("#b-doc-content"), 1, { "left" : myWidth+2000, ease : Quad.easeInOut } );
            TweenLite.to($("#b-main-content"), 1, { "left" : 0, ease : Quad.easeInOut } );
            setTimeout(function(){
                blocked = false;
                $("#b-doc-content *").hide();
            },1000);
        },10);

        return false;
    });

    setFooter();

    function setFooter(){
        var el = $('.b-content').eq(nowSlide),
            offset = el.height() + 150;

        $(".b-footer").css("top",offset);
    }

    $(".b-search").focus(function(){
        $(this).fadeTo(100,1);
    }).blur(function(){
        $(this).fadeTo(100,0.8);
    });

    $.fn.placeholder = function() {
        if(typeof document.createElement("input").placeholder == 'undefined') {
            $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                })
            });
        }
    }
    $.fn.placeholder();
    
	// var myPlace = new google.maps.LatLng(55.754407, 37.625151);
 //    var myOptions = {
 //        zoom: 16,
 //        center: myPlace,
 //        mapTypeId: google.maps.MapTypeId.ROADMAP,
 //        disableDefaultUI: true,
 //        scrollwheel: false,
 //        zoomControl: true
 //    }
 //    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

 //    var marker = new google.maps.Marker({
	//     position: myPlace,
	//     map: map,
	//     title: "Ярмарка вакансий и стажировок"
	// });

    //  var options = {
    //     $AutoPlay: true,                                
    //     $SlideDuration: 500,                            

    //     $BulletNavigatorOptions: {                      
    //         $Class: $JssorBulletNavigator$,             
    //         $ChanceToShow: 2,                           
    //         $AutoCenter: 1,                            
    //         $Steps: 1,                                  
    //         $Lanes: 1,                                  
    //         $SpacingX: 10,                              
    //         $SpacingY: 10,                              
    //         $Orientation: 1                             
    //     }
    // };

    // var jssor_slider1 = new $JssorSlider$("slider1_container", options);

});