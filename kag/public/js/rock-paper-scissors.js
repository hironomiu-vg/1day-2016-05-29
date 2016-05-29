jQuery(function($){
  "use strict";
  var HAND_TYPE = [ "rock" , "scissors" , "paper" ];
  var RESULT_CODE = { DRAW : 0, WIN : 1, LOSE : 2, };
  var RESULT_MESSAGE = [ "draw.","You win!","You lose!" ];

  $(function() {
    document.title = "rock-paper-scissors"  
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
      $("#hand-buttons").hide();
  });

  $('#start').click(onStart);
  
  $('#button').click(function(){
      $('#main').toggle(function(){
          if ($(this).is(':visible')) {
              $('#button').text('非表示');
          } else {
              $('#button').text('表示');
          }
      });
  });

  $('#button-spec').click(function(){
      $('#spec').toggle(function(){
          if ($(this).is(':visible')) {
              $('#button-spec').text('非表示');
          } else {
              $('#button-spec').text('表示');
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
    } else if ((myHand === HAND_TYPE[0] && opponentHand === HAND_TYPE[1]) ||
               (myHand === HAND_TYPE[1] && opponentHand === HAND_TYPE[2]) || 
               (myHand === HAND_TYPE[2] && opponentHand === HAND_TYPE[0])) {
      result = RESULT_CODE.WIN;
    }else {
      result = RESULT_CODE.LOSE;
    }
    return result;
  }

  function onStart() {
    $("<h1><strong><p id='result' class='text-center'>じゃーんけーん</p></strong></h1>").appendTo($("#start-area"));;
    setTimeout(makeHandBtn, 1000);
  }

  function makeHandBtn() {
    $("#start-area").html($(" <div class='col-sm-4 col-xs-4'> <button type='button' class='btn-lg btn-primary rsp-btn' id='rock'>グー　</button> </div> <div class='col-sm-4 col-xs-4'> <button type='button' class='btn-lg btn-primary rsp-btn' id='scissors'>チョキ</button> </div> <div class='col-sm-4 col-xs-4'> <button type='button' class='btn-lg btn-primary rsp-btn' id='paper'>パー　</button> </div>"));
  }

  function makeStartBtn(parent) {
    $("<button>", {
      "class": "btn-lg btn-primary",
      text: "Start",
      click: onStart
    }).appendTo(parent);
  }
});
