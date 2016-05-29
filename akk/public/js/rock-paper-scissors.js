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
  $("#start").click(onStart);

  function bobHand() {
    return HAND_TYPE[ Math.floor(Math.random() * 3) ];
  }

  function bobHands(n) {
    var res = [];
    for (var i = 0; i < n; i++) {
      res.push(HAND_TYPE[Math.floor(Math.random() * 3)]);
    }
    return res;
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

  var selected = [];
  var bobSelected = [];
  var bobHP = 10;
  var playerHP = 10;

  function setPlayerHP(n) {
    playerHP = n;
    console.log(n);
    $("#playerHP").text("Your HP: " + playerHP);
  }

  function decPlayerHP() {
    setPlayerHP(playerHP - 1);
  }

  function incPlayerHP() {
    setPlayerHP(playerHP + 1);
  }

  function setBobHP(n) {
    bobHP = n;
    $("#bobHP").text("Bob's HP: " + bobHP);
  }

  function decBobHP() {
    setBobHP(bobHP - 1);
  }

  function incBobHP() {
    setBobHP(bobHP + 1);
  }

  function setRspOnClick() {
    $(".rsp-btn").click(function() {
      selected.push($(this).attr("id"));
      if (selected.length == 2) {
        bobSelected = bobHands(2);
        selectStep();
        return;
      }
      // var result = judge( $(this).attr("id"), opponentHand);

      // $("#myrspimg").attr("src", "img/" + $(this).attr("id") + ".png");
      // $("#bobrspimg").attr("src", "img/" + opponentHand + ".png");
      // $("#result").text(RESULT_MESSAGE[result]);
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
    $("<div class='col-sm-4 col-xs-4'> <button type='button' class='btn-lg btn-primary' id='start'>スタート</button> </div>").appendTo($("#button-area"));
    $("#start").click(onStart);
  }

  function onStart() {
    $("#second-button-area").empty();
    selected = [];
    $("#button-area").html($("<h1><strong><p>じゃーんけーん</p></strong></h1>"));
    setTimeout(setRspButtons, 1000);
  }

  function selectStep() {
    var p = $("#second-button-area");
    p.empty();
    var myhand = $("<div class='col-sm-6 col-xs-6 text-center'><h4>あなた</h4></div>");
    for (var i = 0; i < selected.length ; i++) {
      $("<h4/><button type='button' class='second-rsp-button' id='" + selected[i] + "'><img src='img/" + selected[i] + ".png' /></button>").appendTo(myhand);
    }
    myhand.appendTo(p);
    var bobhand = $("<div class='col-sm-6 col-xs-6 text-center'><h4>ボブ</h4></div>");
    for (var i = 0; i < bobSelected.length ; i++) {
      $("<h4></h4><img src='img/" + bobSelected[i] + ".png' />").appendTo(bobhand);
    }
    bobhand.appendTo(p);
    $('.second-rsp-button').click(onSecondSelect);
  }

  function onSecondSelect() {
    var bob = bobSelected[Math.floor(Math.random() * bobSelected.length)];
    var result = judge($(this).attr("id"), bob);

    $("#myrspimg").attr("src", "img/" + $(this).attr("id") + ".png");
    $("#bobrspimg").attr("src", "img/" + bob + ".png");
    $("#result").text(RESULT_MESSAGE[result]);

    switch (result) {
      case RESULT_CODE.WIN:
        decBobHP();
        break;
      case RESULT_CODE.LOSE:
        decPlayerHP();
        break;
      case RESULT_CODE.DRAW:
        break;
    }

    $('.second-rsp-button').unbind("click");
  }

});
