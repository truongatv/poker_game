//variable
var list_poker = new Object();
list_poker.card = ["c01.png","c02.png","c03.png","c04.png","c05.png","c06.png","c07.png","c08.png","c09.png","c10.png","c11.png","c12.png","c13.png","d01.png","d02.png","d03.png","d04.png","d05.png","d06.png","d02.png","d08.png","d09.png","d10.png","d11.png","d12.png","d13.png","h01.png","h02.png","h03.png","h04.png","h05.png","h06.png","h07.png","h08.png","h09.png","h10.png","h11.png","h12.png","h13.png","s01.png","s02.png","s03.png","s04.png","s05.png","s06.png","s07.png","s08.png","s09.png","s10.png","s11.png","s12.png","s13.png"];
list_poker.score = [1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13];
var row_poker = new Array();
var row_poker_score = new Array();
var player_score = new Array();
var random_num
var new_game = document.getElementById("new-game");
row_poker[0] = document.getElementById("row-1");
row_poker[1] = document.getElementById("row-2");
row_poker[2] = document.getElementById("row-3");
row_poker[3] = document.getElementById("row-4");
row_poker[4] = document.getElementById("row-5");
row_poker[5] = document.getElementById("row-6");
var pair_poker_score = new Array();
var status = 0;
var loop =0;
var session = new Array();

//main

new_game.addEventListener('click', function(){
    var card_temp_1, card_temp_2;
    console.log("new game");
    for(i=0;i<6;i++){
        for(j=0;j<9;j++){
            if(list_poker.card.length <= 0){
                console.log("test");
                break;
            }
            random_num = Math.floor(Math.random()*list_poker.card.length);
            row_poker[i][j]="png/"+list_poker.card[random_num].toString();
            var new_card = document.createElement('img');
            new_card.src = "png/z02.png";
            // new_card.src = "png/"+list_poker.card[random_num].toString();
            new_card.setAttribute("class", "card");
            row_poker_score[i*10+j] = list_poker.score[random_num];
            new_card.setAttribute("id", i*10+j);
            new_card.onclick = function(e){
                var position_click = parseInt(e.path[0].id);
                var column = position_click % 10;
                var row = parseInt(position_click / 10);
                session[row*10 + column] = e.path[0].id;
                var click_card = document.getElementById(e.path[0].id);
                // click_card.src = "png/z01.png";
                click_card.src = row_poker[row][column];
                row_poker_score[row*10+column] += 100;
                for(k=0;k<52;k++){
                    if(loop == 2){
                        card_temp_1.src = card_temp_2.src = "png/z02.png";
                    }
                    if(k==row*10+column) {
                        continue;
                    }
                    if(row_poker_score[k] > 100) {
                        loop = 2;
                        console.log("if")
                        if(row_poker_score[row*10 + column] === row_poker_score[k]){
                            console.log("done");
                            row_poker_score[k] -= 100;
                            row_poker_score[row*10+column] -= 100;
                            card_temp_1 = document.getElementById(session[row*10+column]);
                            card_temp_2 = document.getElementById(session[k]);
                            card_temp_1.style.visibility = "hidden";
                            card_temp_2.style.visibility = "hidden";
                            status = 1;
                            alert('done');
                            loop = 0;
                            break;
                        }
                        else if(row_poker_score[row*10 + column] !== row_poker_score[k]) {
                            row_poker_score[k] -= 100;
                            row_poker_score[row*10+column] -= 100;
                            card_temp_1 = document.getElementById(+parseInt(session[row*10+column]/10)+session[row*10+column]%10);
                            card_temp_2 = document.getElementById(parseInt(session[k]/10)+session[k]%10);
                            // alert('new-session');
                            // card_temp_1.src = "png/z02.png";
                            // card_temp_2.src = "png/z02.png"
                            break;
                        }
                    }
                }
            }
            list_poker.card.splice(random_num,1);
            list_poker.score.splice(random_num,1);
            row_poker[i].appendChild(new_card);
        }
        
    }
}) 