jQuery(function($){
  "use strict";
  var HAND_TYPE = [ "rock" , "scissors" , "paper" ];
  var RESULT_CODE = { DRAW : 0, WIN : 1, LOSE : 2, };
  var RESULT_MESSAGE = [ "draw.","You win!","You lose!" ];
  var count = 0;

  $(function() {
    document.title = "rock-paper-scissors"; 
    $("#title").text("rock-paper-scissors");
    
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
    var opponentHand = bobHand();
    var result = judge( $(this).attr("id"), opponentHand);

    $("#myrspimg").attr("src", "img/" + $(this).attr("id") + ".png");
    $("#bobrspimg").attr("src", "img/" + opponentHand + ".png");
    $("#result").text(RESULT_MESSAGE[result]);

  });


  function bobHand() {

    return HAND_TYPE[ Math.floor(Math.random() * 3) ];
  }

  function judge(myHand, opponentHand) {
    var result;
    if (myHand === opponentHand) {
      result = RESULT_CODE.DRAW;
      count = 0;
    } else if ((myHand === HAND_TYPE[0] && opponentHand === HAND_TYPE[1]) ||
     (myHand === HAND_TYPE[1] && opponentHand === HAND_TYPE[2]) || 
     (myHand === HAND_TYPE[2] && opponentHand === HAND_TYPE[0])) {
      result = RESULT_CODE.WIN;
      count++;
      if(count >= 3){
        $("#streak").text(count+"連勝！");
      }
    }else {
      result = RESULT_CODE.LOSE;
      count = 0;
    }
    return result;
  }
});
