$(function() {

  $.ajax({
    url:'../xml/wps.xml',
    type:'GET',
    dataType:'xml',
    timeout:1000,
    crossDomain : true,
    error:function() {
        alert("ロード失敗");
    },
    success:function(xml){
        $(xml).find("comps").each(function() {
            $(".head-select").append('<div>' + $(this).find('url').text() + $(this).find('title').text() + '</div>');
        });
    }
  });
});