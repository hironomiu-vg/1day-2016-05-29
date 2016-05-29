jQuery(function($){
  "use strict";
  var HAND_TYPE = [ "rock" , "scissors" , "paper" ];
  var RESULT_CODE = { DRAW : 0, WIN : 1, LOSE : 2, };
  var RESULT_MESSAGE = [ "draw.","You win!","You lose!" ];
  var current_score = 0;
  var will_get_score = 0;
  var win_count = 0;
  var before_result = RESULT_CODE['DRAW'];

  var BOB_NEXT_HAND = HAND_TYPE[0];
  var SHINGAN_ENALBE = false;

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
    var opponentHand = bobHand();

    if(SHINGAN_ENALBE) {
      opponentHand = BOB_NEXT_HAND;
    }

    var result = judge( $(this).attr("id"), opponentHand);
    switch(result) {
    case RESULT_CODE['LOSE']:
        current_score = 0;
        will_get_score = 0;
        break;
    case RESULT_CODE['DRAW']:
        break;
    case RESULT_CODE['WIN']:
        will_get_score = (will_get_score == 0 ? 100 : will_get_score * 2);
        break;
    }

    $("#myrspimg").attr("src", "img/" + $(this).attr("id") + ".png");
    $("#bobrspimg").attr("src", "img/" + opponentHand + ".png");
    $("#result").text(RESULT_MESSAGE[result]);
    $(".game_hands").toggle(function() {
          
    });
    $("#current_score").html("今の持ち点："+current_score+"<br/>勝ち点："+will_get_score);

    SHINGAN_ENALBE = false;
  });

  $("#shingan").click(function(){
    SHINGAN_ENALBE = true;
    BOB_NEXT_HAND = bobHand();
    console.log(BOB_NEXT_HAND);
    $("#kokoro").attr("src", "img/" + BOB_NEXT_HAND + ".png");
    $("#kokoro").animate({ 
        left:"1095px"
    }, 1000 ).animate({
        left:"-103px"
    }, 0);

  });
  
  $(".score-btn").click(function() {
    if ($(this).attr("id") == "down") {
        current_score += will_get_score;
        will_get_score = 0;
        $("#current_score").html("今の持ち点："+current_score+"<br/>勝ち点："+will_get_score);
    }
    $(".game_hands").toggle(function() {
        
    });
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
