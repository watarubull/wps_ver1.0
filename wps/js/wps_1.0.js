$(function() {
  
  ajaxLoad(1);

  $('.copy').on('click', function(){
    let text = $('.code-box').text();
    let $textarea = $('<textarea></textarea>');
    $textarea.text(text);
    $(this).append($textarea);
    $textarea.select();
    document.execCommand('copy');
    $textarea.remove();
    $('.copy-alert').fadeIn(100).delay(1000).fadeOut(800);
  });

  $(document).on("change","input",function(){
    setCode();
    setName();
  });

  $(document).on("click",".now-item",function(){
    let nm = $(".now-item").index(this);
    $(".now-item").removeClass("active");
    $(".select-box").removeClass("active");
    $(this).addClass("active");
    $(".select-box").eq(nm).addClass("active");
  });
  let addNm = 0;
  $(".add").on("click",function(){
    addNm += 1;
    $(this).before('<p class="now-item">メイン1</p>');
    $(".foot-select").before('<div class="main-select select-box"></div>');

    $.ajax({
      url:'./xml/wps.xml',
      type:'GET',
      dataType:'xml',
      timeout:1000,
      error:function() {
          alert("ロード失敗");
      },
      success:function(xml){
          $(xml).find("main-content").find("comps").each(function(i) {
            if(i == 0){
              $(".main-select").eq(addNm).append('<label><input checked type="radio" name="main' + addNm + 1 + '" value="' + $(this).find('html').text() + '"/><span>' + $(this).find('title').text() +'</span><img src="'+ $(this).find('img').text() +'"></label>');
              $(".main-layout").eq(addNm).find(".now-item").html($(this).find('title').text());
            }else{
              $(".main-select").eq(addNm).append('<label><input type="radio" name="main' + addNm + 1 + '" value="' + $(this).find('html').text() + '"/><span>' + $(this).find('title').text() +'</span><img src="'+ $(this).find('img').text() +'"></label>');
            }
          });
          setCode();
      }
    });
  });


});

function ajaxLoad(nm){
  $.ajax({
    url:'./xml/wps.xml',
    type:'GET',
    dataType:'xml',
    timeout:1000,
    error:function() {
        alert("ロード失敗");
    },
    success:function(xml){
        $(xml).find("head").find("comps").each(function(i) {
          if(i == 0){
            $(".head-select").append('<label><input checked type="radio" name="head" value="' + $(this).find('html').text() + '"/><span>' + $(this).find('title').text() +'</span><img src="'+ $(this).find('img').text() +'"></label>');
            $(".head-layout .now-item").html($(this).find('title').text());
          }else{
            $(".head-select").append('<label><input type="radio" name="head" value="' + $(this).find('html').text() + '"/><span>' + $(this).find('title').text() +'</span><img src="'+ $(this).find('img').text() +'"></label>');
          }
        });
        $(xml).find("main-content").find("comps").each(function(i) {
          if(i == 0){
            $(".main-select").append('<label><input checked type="radio" name="main' + nm + '" value="' + $(this).find('html').text() + '"/><span>' + $(this).find('title').text() +'</span><img src="'+ $(this).find('img').text() +'"></label>');
            $(".main-layout .now-item").html($(this).find('title').text());
          }else{
            $(".main-select").append('<label><input type="radio" name="main' + nm + '" value="' + $(this).find('html').text() + '"/><span>' + $(this).find('title').text() +'</span><img src="'+ $(this).find('img').text() +'"></label>');
          }
        });
        $(xml).find("foot").find("comps").each(function(i) {
          if(i == 0){
            $(".foot-select").append('<label><input checked type="radio" name="foot" value="' + $(this).find('html').text() + '"/><span>' + $(this).find('title').text() +'</span><img src="'+ $(this).find('img').text() +'"></label>');
            $(".foot-layout .now-item").html($(this).find('title').text());
          }else{
            $(".foot-select").append('<label><input type="radio" name="foot" value="' + $(this).find('html').text() + '"/><span>' + $(this).find('title').text() +'</span><img src="'+ $(this).find('img').text() +'"></label>');
          }
        });
        setCode();
    }
  });
  
  
}

function setCode(){;
  $(".code-box").empty();
  $('.head-select input:checked').each(function(){
    let val = $(this).val();
    $.ajax({
      url: val,
      type:'GET',
      dataType:'html',
      timeout:1000,
      error:function() {
          alert("ロード失敗");
      },
      success:function(data){
        $(".code-box").append(data);
        var code = $('code');
        code.html(code.html().replace(/</g,'&lt;').replace(/>/,'&gt;'));
      }
    });
  });
  let mainCont = "";
  let mainNm = $('.main-select input:checked').length;
  $('.main-select input:checked').each(function(i){
    let val = $(this).val();
    $.ajax({
      url: val,
      type:'GET',
      dataType:'html',
      timeout:1000,
      error:function() {
          alert("ロード失敗");
      },
      success:function(data){
        mainCont += data;
        if (i === mainNm - 1) {
          $(".code-box").append("<main>" + mainCont + "</main>");
          var code = $('code');
          code.html(code.html().replace(/</g,'&lt;').replace(/>/,'&gt;'));
        }
      }
    });
  });
  $('.foot-select input:checked').each(function(){
    let val = $(this).val();
    $.ajax({
      url: val,
      type:'GET',
      dataType:'html',
      timeout:1000,
      error:function() {
          alert("ロード失敗");
      },
      success:function(data){
        $(".code-box").append(data);
        var code = $('code');
        code.html(code.html().replace(/</g,'&lt;').replace(/>/,'&gt;'));
      }
    });
  });
}

function setName(){
  var hname = $('.head-select input:checked + span').html();
  $(".head-layout .now-item").html(hname);
  $(".main-layout .now-item").each(function(i){
    var mname = $('.main-select').eq(i).find('input:checked + span').html();
    $(this).html(mname);
  });
  var fname = $('.foot-select input:checked + span').html();
  $(".foot-layout .now-item").html(fname);
}