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

  function setRspOnClick() {
    $(".rsp-btn").click(function() {
      selected.push($(this).attr("id"));
      if (selected.length == 2) {
        var opponentHands = bobHands(2);
        selectStep(selected, opponentHands);
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
    console.log("hoge");
    $("#second-button-area").empty();
    selected = [];
    $("#button-area").html($("<h1><strong><p>じゃーんけーん</p></strong></h1>"));
    setTimeout(setRspButtons, 1000);
  }

  function selectStep(selected, cpuSelected) {
    var p = $("#second-button-area");
    p.empty();
    var myhand = $("<div class='col-sm-6 col-xs-6 text-center'/>");
    for (var i = 0; i < selected.length ; i++) {
      $("<h4>あなた</h4><img id='myrspimg' src='img/" + selected[i] + ".png' />").appendTo(myhand);
    }
    myhand.appendTo(p);
    console.log(cpuSelected);
    var bobhand = $("<div class='col-sm-6 col-xs-6 text-center'/>");
    for (var i = 0; i < cpuSelected.length ; i++) {
      $("<h4>ボブ</h4><img id='myrspimg' src='img/" + cpuSelected[i] + ".png' />").appendTo(bobhand);
    }
    bobhand.appendTo(p);
  }

});
