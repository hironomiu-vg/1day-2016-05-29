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
  var timer, index;

  const random_var = Math.floor(Math.random()*4)
  const ENEMY_NAME = ['キマイラ', 'メデューサ', 'ドラゴン', 'ウルフ'][random_var]
  const ENEMY_IMG = {'キマイラ': 'khimaira.png', 'メデューサ': 'medusa.png', 'ドラゴン': 'dragon.png', 'ウルフ': 'wolf.png'}[ENEMY_NAME]
  const ENEMY_MAX_HP = [120, 100, 212, 180][random_var]
  var ENEMY_HP = ENEMY_MAX_HP
  const ENEMY_ATTACK = [21, 14, 41, 31][random_var]
  const MY_MAX_HP = 100 + random_var * 14
  var MY_HP = MY_MAX_HP

  $('#my_hp').text(MY_HP + ' HP')
  $('#enemy_hp').text(ENEMY_HP + ' HP')
  $('#enemy_name').html('<b>' + ENEMY_NAME + '</b>')

  $('#enemy_image').attr('src', 'img/' + ENEMY_IMG).show()
  $('#my_image').attr('src', 'img/' + 'character.png').show()

  console.log(ENEMY_HP)

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
      $(this).text('戦闘中');
      $(this).addClass('btn-danger')
      $('.rsp-btn').each(function(i, elem) {
        $(elem).prop('disabled', false);
      });
      $("#result").text("じゃーんけーん");
      loop();
  });


  function loop() {
    index = 0;
    timer = setInterval(function() {
      index += 1
      if(index > 2){
        index = 0;
      }
      const path = ['paper.png', 'rock.png', 'scissors.png'][index]
      $('#bobrspimg').attr('src', 'img/' + path)
    }, 50);
  }

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
    $('.rsp-btn').each(function(i, elem) {
      $(elem).prop('disabled', true);
    });
    $('#start').text('戦闘する')
    $('#start').removeClass('btn-danger')
    $('#start').prop('disabled', false)
  });

  function bobHand() {
    return HAND_TYPE[index]
    //return HAND_TYPE[ Math.floor(Math.random() * 3) ];
  }

  function judge(myHand, opponentHand) {
    clearInterval(timer);
    var html = '<td>' + HAND_NAME[myHand] + '</td><td>' + HAND_NAME[opponentHand] + '</td>';
    var result;
    if (myHand === opponentHand) {
      result = RESULT_CODE.DRAW;
      when_draw();
    } else if ((myHand === HAND_TYPE[0] && opponentHand === HAND_TYPE[1]) ||
               (myHand === HAND_TYPE[1] && opponentHand === HAND_TYPE[2]) || 
               (myHand === HAND_TYPE[2] && opponentHand === HAND_TYPE[0])) {
      result = RESULT_CODE.WIN;
        shake($("#enemy_image"))
      when_win();
    }else {
      result = RESULT_CODE.LOSE;
        shake($("#my_image"));
      when_lose();
    }
    html += '<td>' + RESULT_MESSAGE[result] + '</td>';
    const $tr = $('<tr>').html(html);
    $('#history').append($tr);
    console.log('enemy HP is ' + ENEMY_HP);
    console.log('my HP is ' + MY_HP);
    return result;
  }


  // 負けた場合の処理
  function when_lose() {
      your_lose += 1;
      winning_streak = 0;
      MY_HP -= ENEMY_ATTACK
      setProgressBar('#my_hp', 100 * MY_HP / MY_MAX_HP)
      if(MY_HP <= 0) {
        gameover(false)
      }
  }
  // 買った場合の処理
  function when_win() {
      your_win += 1;
      winning_streak += 1;
      ENEMY_HP -= 10 + winning_streak*5
      setProgressBar('#enemy_hp',  100 * ENEMY_HP / ENEMY_MAX_HP)
      if(ENEMY_HP <= 0) {
        gameover(true)
      }
  }
  // ドローの場合の処理
  function when_draw() {
    draw += 1;
    winning_streak = 0;
  }

  function gameover(if_win) {
    if(if_win) {
      alert('win!');
    } else {
      alert('lose!');
    }
  }

  function setProgressBar(elem, hp) {
    hp = parseInt(hp, 10)
    if(hp < 0) hp = 0;
    const $this = $(elem)
    $this.attr('aria-valuenow', hp)
    $this.css('width', hp.toString() + '%')
    $this.text(hp.toString() + 'HP')

    if(hp < 60) {
      $this.removeClass('progress-bar-success')
      $this.addClass('progress-bar-warning')
      $this.removeClass('progress-bar-danger')      
    } else if(hp < 20) {
      $this.removeClass('progress-bar-success')
      $this.removeClass('progress-bar-warning')
      $this.addClass('progress-bar-danger')
    }
  }

    function shake(image) {
        var mvw=2; // 横揺れ　pxの値( 2 は　2pxの意味)
        var mvh=2; // 縦揺れ　pxの値( 2 は　2pxの意味)
        var tw=10; // 横揺れ時間 10は。0.01秒
        var th=10; // 縦揺れ時間 10は。0.01秒
        image.css({position: 'relative'});
        image.stop()
                .animate({left : mvw+'px'},tw)
                .animate({left : mvw*-1+'px'},tw)
                .animate({left : mvw+'px'},tw)
                .animate({left : mvw*-1+'px'},tw)
                .animate({left : mvw+'px'},tw)
                .animate({left : mvw*-1+'px'},tw)
                .animate({left : mvw+'px'},tw)
                .animate({left : mvw*-1+'px'},tw)
                // 縦揺れ 開始
                .animate({top : mvh+'px'},th)
                .animate({top : mvh*-1+'px'},th)
                .animate({top : mvh+'px'},th)
                .animate({top : mvh*-1+'px'},th)
                .animate({top : mvh+'px'},th)
                .animate({top : mvh*-1+'px'},th)
                .animate({top : mvh+'px'},th)
                .animate({top : mvh*-1+'px'},th)
        };

});
