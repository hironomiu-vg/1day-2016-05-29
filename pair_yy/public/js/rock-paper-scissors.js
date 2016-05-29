jQuery(function($){
  "use strict";
  var HAND_TYPE = [ "rock" , "scissors" , "paper" ];
  var RESULT_CODE = { DRAW : 0, WIN : 1, LOSE : 2, };
  var RESULT_MESSAGE = [ "draw.","You win!","You lose!" ];
  var RESULT_TOTAL = [0,0,0];

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
      $('#side-menu').toggle(function(){
          if ($(this).is(':visible')) {
              $('#button').text('非表示');
          } else {
              $('#button').text('表示');
          }
      });
  });
  $('#side-button').click(function(){
      $('#side-menu').toggle(function(){
          if ($(this).is(':visible')) {
              $('#side-button').text('非表示');
          } else {
              $('#side-button').text('表示');
          }
      });
  });

  $(".rsp-btn").click(function(){
    var opponentHand = bobHand();
    var result = judge( $(this).attr("id"), opponentHand);
    RESULT_TOTAL[result]++;

    $("#myrspimg").attr("src", "img/" + $(this).attr("id") + ".png");
    $("#bobrspimg").attr("src", "img/" + opponentHand + ".png");
    $("#result").text(RESULT_MESSAGE[result]);
    $("#total").text(RESULT_TOTAL[1]+"勝"+RESULT_TOTAL[2]+"敗"+RESULT_TOTAL[0]+"分け");
    if((RESULT_TOTAL[1]) > 2 ){
        $("#three_win").text(RESULT_TOTAL[1]+"連勝");
    }
  });
  
  $(document).ready(function(){
    document.title = "rock-paper-scissors";
    $("#page_title").text("rock-paper-scissors");
  });


  function bobHand() {
    return HAND_TYPE[ Math.floor(Math.random() * 3) ];
  }

  function judge(myHand, opponentHand) {
    var result;
    if (myHand === opponentHand) {
      result = RESULT_CODE.DRAW;
    } else if ((myHand === HAND_TYPE[0] && opponentHand === HAND_TYPE[1]) ||
               (myHand === HAND_TYPE[1] && opponentHand === HAND_TYPE[2]) ||
               (myHand === HAND_TYPE[2] && opponentHand === HAND_TYPE[0])) {
      result = RESULT_CODE.WIN;
    }else {
      result = RESULT_CODE.LOSE;
    }
    return result;
  }
});
