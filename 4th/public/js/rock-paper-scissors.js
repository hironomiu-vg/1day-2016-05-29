jQuery(function($){
  "use strict";
  var HAND_TYPE = [ "rock" , "scissors" , "paper" ];
  var RESULT_CODE = { ZERO : 0, WIN : 1, TWO : 2, };
  var RESULT_MESSAGE = [ "0点","You win!","2点" ];

  var points = 0;

  $(function() {
      $.ajax({
          url: '/api/missions',
          type: 'GET',
          dataType: 'json'
      }).done(function(json, statusText, jqXHR) {
          var data = $.parseJSON(json);
          $(".mission1").append("<li>" + data.mission + "</li>");
      }).fail(function(jqXHR, statusText, errorThrown) {
          alert("データ取得失敗");
      }).always(function() {
      });
  });

  $('#button').click(function(){
      $('#main').toggle(function(){
          if ($(this).is(':visible')) {
              $('#button').text('非表示');
          } else {
              $('#button').text('表示');
          }
      });
  });

  $(".rsp-btn").click(function(){
    var BobHand = Hand();
    var TomHand = Hand();
    var result = judge( $(this).attr("id"), BobHand, TomHand);

    if(result === RESULT_CODE.WIN){
      points++;
    }else if(result === RESULT_CODE.LOSE){
      points--;
    }

    $("#myrspimg").attr("src", "img/" + $(this).attr("id") + ".png");
    $("#bobrspimg").attr("src", "img/" + BobHand + ".png");
    $("#tomrspimg").attr("src", "img/" + TomHand + ".png");
    $("#result").text(RESULT_MESSAGE[result]);

    $("#points").text(points + "点");

    if(points >= 5){
      $("#link").show();
    }else{
      $("#link").hide();
    }
  });

  $("#link").hide();

  function bobHand() {
    return HAND_TYPE[ Math.floor(Math.random() * 3) ];
  }

  function judge(myHand, BobHand, TomHand) {
    var result;
    if (myHand === BobHand && myHand == TomHand) {
      result = RESULT_CODE.ZERO;
    } else if ((myHand === HAND_TYPE[0] && BobHand === HAND_TYPE[1] && TomHand === HAND_TYPE[1]) ||
               (myHand === HAND_TYPE[1] && BobHand === HAND_TYPE[2] && TomHand === HAND_TYPE[2]) ||
               (myHand === HAND_TYPE[2] && BobHand === HAND_TYPE[0] && TomHand === HAND_TYPE[0])) {
      result = RESULT_CODE.TWO;
    }else if{
      result = RESULT_CODE.LOSE;
    }
    return result;
  }
});
