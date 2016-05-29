jQuery(function($){
  "use strict";
  var HAND_TYPE = [ "rock" , "scissors" , "paper" ];
  var RESULT_CODE = { DRAW : 0, WIN : 1, LOSE : 2, };
  var RESULT_MESSAGE = [ "draw.","You win!","You lose!" ];

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

  $(".rsp-btn").click(setRspOnClick);
  $("#start").click(setRspButtons);

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

  function setRspOnClick() {
    $(".rsp-btn").click(function() {
      var opponentHand = bobHand();
      var result = judge( $(this).attr("id"), opponentHand);

      $("#myrspimg").attr("src", "img/" + $(this).attr("id") + ".png");
      $("#bobrspimg").attr("src", "img/" + opponentHand + ".png");
      $("#result").text(RESULT_MESSAGE[result]);
    });
  }

  function setRspButtons() {
    $("#button-area").empty();
    $("<div class='col-sm-4 col-xs-4'> <button type='button' class='btn-lg btn-primary rsp-btn' id='rock'>グー　</button> </div>").appendTo($("#button-area"));
    $("<div class='col-sm-4 col-xs-4'> <button type='button' class='btn-lg btn-primary rsp-btn' id='scissors'>チョキ</button> </div>").appendTo($("#button-area"));
    $("<div class='col-sm-4 col-xs-4'> <button type='button' class='btn-lg btn-primary rsp-btn' id='paper'>パー　</button> </div>").appendTo($("#button-area"));
    setRspOnClick();
  }

  function setStartButton() {
    $("#button-area").empty();
    $("<div class='col-sm-4 col-xs-4'> <button type='button' class='btn-lg btn-primary rsp-btn' id='start'>スタート</button> </div>").appendTo($("#button-area"));
  }
});
