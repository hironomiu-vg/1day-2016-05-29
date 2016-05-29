jQuery(function($){
  "use strict";
  var HAND_TYPE = [ "rock" , "scissors" , "paper" ];
  var HAND_NAME = { rock: 'グー', scissors: 'チョキ', paper: 'パー'};
  var RESULT_CODE = { DRAW : 0, WIN : 1, LOSE : 2, };
  var RESULT_MESSAGE = [ "draw.","You win!","You lose!" ];

  var your_win = 0;
  var your_lose = 0;
  var draw = 0;
  var winning_streak = 0;

  setTimeout(function() {
    $('#title').text('rock-paper-scissors');
  }, 2000);

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
  
  $('.button').click(function(){
      $(this).next().toggle(function(){
          if ($(this).is(':visible')) {
              $('#button').text('非表示');
          } else {
              $('#button').text('表示');
          }
      });
  });

  $("#start").click(function(){
      $(this).prop("disabled", true);
      $('.rsp-btn').each(function(i, elem) {
        $(elem).prop('disabled', false);
      });
      $("#result").text("じゃーんけーん");
      $(this).fadeOut();
  });

  $(".rsp-btn").click(function(){
    var opponentHand = bobHand();
    var result = judge( $(this).attr("id"), opponentHand);

    $("#myrspimg").attr("src", "img/" + $(this).attr("id") + ".png");
    $("#bobrspimg").attr("src", "img/" + opponentHand + ".png");
    $('.match_history').fadeIn(500);
    $('#match_count').text((your_win + your_lose + draw).toString() + '戦')
    $("#your_win").text(your_win.toString() + '勝');
    $('#your_lose').text(your_lose.toString() + '敗')
    $('#draw').text(draw.toString() + '引き分け');
    if(winning_streak >= 3) {
      $('#winning_streak').text(winning_streak.toString() + '連勝!!');
      $('#winning_streak').show();
    } else {
      $('#winning_streak').hide();
    }
    $("#result").text(RESULT_MESSAGE[result]);
  });

  function bobHand() {
    return HAND_TYPE[ Math.floor(Math.random() * 3) ];
  }

  function judge(myHand, opponentHand) {
    var html = '<td>' + HAND_NAME[myHand] + '</td><td>' + HAND_NAME[opponentHand] + '</td>';
    var result;
    if (myHand === opponentHand) {
      result = RESULT_CODE.DRAW;
      draw += 1;
      winning_streak = 0;
    } else if ((myHand === HAND_TYPE[0] && opponentHand === HAND_TYPE[1]) ||
               (myHand === HAND_TYPE[1] && opponentHand === HAND_TYPE[2]) || 
               (myHand === HAND_TYPE[2] && opponentHand === HAND_TYPE[0])) {
      result = RESULT_CODE.WIN;
      your_win += 1;
      winning_streak += 1;
    }else {
      result = RESULT_CODE.LOSE;
      your_lose += 1;
      winning_streak = 0;
    }
    html += '<td>' + RESULT_MESSAGE[result] + '</td>';
    const $tr = $('<tr>').html(html);
    $('#history').append($tr);
    return result;
  }
});
