jQuery(function($){
  "use strict";
  var HAND_TYPE = [ "rock" , "scissors" , "paper" ];
  var RESULT_CODE = { DRAW : 0, WIN : 1, LOSE : 2, };
  var RESULT_MESSAGE = [ "draw.","You win!","You lose!" ];
  var i=0,j=0,z=0;
  var preri = 0
  var enablematta = false;

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
    var result = judge( $(this).attr("id"), opponentHand);


    // 引き分け
    if(result == 0)
    {
      i++;
    }
    // 勝ち
    if(result == 1)
    {
      j++;
    }

  // 　負け
    if(result == 2)
    {
      z++
    }





    $("#myrspimg").attr("src", "img/" + $(this).attr("id") + ".png");
    $("#bobrspimg").attr("src", "img/" + opponentHand + ".png");
    $("#result").text(RESULT_MESSAGE[result]);
    $("#result2").text("引き分け：" + z );
    $("#result3").text("勝ち：" + i );
    $("#result4").text( "負け：" + j);
    preri = result;
  });

$(".rsv-btn").click(function matta(){
if(enablematta){
  return;
}
enablematta=true;
  if(preri == 0)
  {i--;}
if(preri == 1)
  {j--;}
  if(preri == 2)
  {z--;}




    $("#result").text("stop!!");
    $("#result2").text("引き分け：" + z );
    $("#result3").text("勝ち：" + i );
    $("#result4").text( "負け：" + j);

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
    ;
  }
});
