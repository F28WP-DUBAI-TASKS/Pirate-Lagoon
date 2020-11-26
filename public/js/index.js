$(window).one("load", function () 
{
    $(".popup_trigger").click(function(){
       $('.bkgd').show();
    });
    // $('.bkgd').click(function(){
    //     $('.bkgd').hide();
    // });
    $('.popupCloseButton').click(function(){
        $('.bkgd').hide();
    });
    $(function(){
        var socket = io.connect(),
        player = {},
        yc = $('.your_color'),
        oc = $('.opponent_color'),
        your_turn = false,
        url = window.location.href.split('/'),
        room = url[url.length-1];
    
        var text = {
            'yt' : "Your turn",
            'nyt' : "Waiting for opponent",
            'popover_h2' : "Waiting for opponent",
            'popover_p' : "Give the url to a friend to play a game",
            'popover_h2_win' : "You won the game!",
            'popover_p_win' : "Give the url to a friend to play another game",
            'popover_h2_lose' : "You lost the game..",
            'popover_p_lose' : "Give the url to a friend to play another game",
            'popover_h2_draw' : "Its a draw.. bummer!",
            'popover_p_draw' : "Give the url to a friend to play another game",
        }
    
        init();
    
        socket.on('assign', function(data) {
            player.pid = data.pid;
            player.hash = data.hash;
            if(player.pid == "1"){
                yc.addClass('red');
                oc.addClass('yellow');
                player.color = 'red';
                player.oponend = 'yellow';
                $('.underlay').removeClass('hidden');
                $('.popover').removeClass('hidden');
            }else{
                $('.status').html(text.nyt);
                yc.addClass('yellow');
                oc.addClass('red');
                oc.addClass('show');
                player.color = 'yellow';
                player.oponend = 'red';
            }
        });
    
        socket.on('winner', function(data) {
            oc.removeClass('show');
            yc.removeClass('show');
            change_turn(false);
            for(var i = 0; i < 4; i++){
                $('.cols .col .coin#coin_'+data.winner.winner_coins[i]).addClass('winner_coin');
            }
    
            if(data.winner.winner == player.pid){
                $('.popover h2').html(text.popover_h2_win);
                $('.popover p').html(text.popover_p_win);
            }else{
                $('.popover h2').html(text.popover_h2_lose);
                $('.popover p').html(text.popover_p_lose);
            }
            
            setTimeout(function(){
                $('.underlay').removeClass('hidden');
                $('.popover').removeClass('hidden');
            },2000);
        });
    
        socket.on('draw', function() {
            oc.removeClass('show');
            yc.removeClass('show');
            change_turn(false);
            $('.popover h2').html(text.popover_h2_draw);
            $('.popover p').html(text.popover_p_draw);
            setTimeout(function(){
                $('.underlay').removeClass('hidden');
                $('.popover').removeClass('hidden');
            },2000);
        });
    
        socket.on('start', function(data) {
            change_turn(true);
            yc.addClass('show');
            $('.underlay').addClass('hidden');
            $('.popover').addClass('hidden');
        });
    
        socket.on('stop', function(data) {
            init();
            reset_board();
        });
    
        socket.on('move_made', function(data) {
            make_move(data.col+1, true);
            change_turn(true);
            yc.addClass('show');
            oc.removeClass('show');
        });
    
        socket.on('opponent_move', function(data) {
            if(!your_turn){
                oc.css('left', parseInt(data.col)*100);
            }
            console.debug(data);
        });
    
        $('.cols > .col').mouseenter(function(){
            if(your_turn){
                yc.css('left', $(this).index()*100);
                socket.emit('my_move', {col: $(this).index()});
            }
        });
    
        $('.cols > .col').click(function(){
            if(parseInt($(this).attr('data-in-col')) < 6){
                if(your_turn){
                    var col = $(this).index()+1;
                    make_move(col);
                    socket.emit('makeMove', {col: col-1, hash: player.hash});
                    change_turn(false);
                    yc.removeClass('show');
                    oc.addClass('show');
                }
            }
        });
    
        function make_move(col, other){
            if(!other) other = false;
            var col_elm = $('.cols > .col#col_'+col);
            var current_in_col = parseInt(col_elm.attr('data-in-col'));
            col_elm.attr('data-in-col', current_in_col+1);
            var color = (other) ? player.oponend : player.color;
            var new_coin = $('<div class="coin '+color+'" id="coin_'+(5-current_in_col)+''+(col-1)+'"></div>');
            col_elm.append(new_coin);
            new_coin.animate({
                top : 100*(4-current_in_col+1),
            }, 400);
        }
    
        function init(){
            socket.emit('join', {room: room});
            $('.popover input').val(window.location.href);
            $('.popover h2').html(text.popover_h2);
            $('.popover p').html(text.popover_p);
            $('.status').html('');
        }
    
        function reset_board(){
            $('.cols .col').attr('data-in-col', '0').html('');
            yc.removeClass('yellow red');
            oc.removeClass('yellow red');
            yc.removeClass('show');
            oc.removeClass('show');
        }
    
        function change_turn(yt){
            if(yt){
                your_turn = true;
                $('.status').html(text.yt);
            }else{
                your_turn = false;
                $('.status').html(text.nyt);
            }
        }
        
        $('.popover input').click(function(){
             $(this).select();
        });
    
    });
});