$(function() {
	//ナビボタンの生成
	var btnPosi = $(".gnav");//ナビボタンを追加したい場所
	var btnContents = "<div class='navBtn'>	<div class='hambarg'></div><div class='hambarg'></div><div class='hambarg'></div></div>"
	btnPosi.append(btnContents);

	//gnavのアクション
  $(".navBtn").click(function(){
    $(".gnav").toggleClass("on");
    $(".nav").fadeToggle(200);
  });
  $(".nav").on('click', function(){
    if($(window).width()<768){
      $(".nav").fadeToggle(200);
    }
  });
	var resizeTimer = null;
	$(window).on('resize', function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			if($(window).width()>768){
				$(".nav").css("display","flex")
			}else{
				$(".nav").css("display","none")
			}
		}, 200);
	});

  if($(".page-header.bottom").length){
    var navOffsetTop = $(".gnav").offset().top;
    $(window).on("scroll",function(){
      var winH = $(window).scrollTop();
      if(winH > navOffsetTop){
        $(".page-header.bottom").addClass("follow");
      }else{
        $(".page-header.bottom").removeClass("follow");
      }
    });
  }

  $(".scroll").click(function(event){
    event.preventDefault();
    var url = this.href;
  
    var parts = url.split("#");
    var target = parts[1];
     
    var target_offset = $("#"+target).offset();
    if($(window).width()>768){
      var target_top = target_offset.top - 70;
    }else{
      var target_top = target_offset.top - 60;
    }
    
     
    $('html, body').animate({scrollTop:target_top}, 800);
    
    });

});