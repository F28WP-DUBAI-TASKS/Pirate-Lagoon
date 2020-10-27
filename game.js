stg=0
bgx=0
spd=70
buls=0
act=false
/********************************************************/
function ani(){
    var int
    act=true
    bgx-=52
    stg++
    $('#jack').css('background-position','-52px 0px')
    int=setInterval(function(){
        if(stg<4){bgx-=52;  stg++}
            else{   bgx=0;      stg=0 }
        $('#jack').css('background-position',bgx+'px 0px')
        if(stg==4)  new Bullet();
        if(!stg){
            act=false
            clearInterval(int)
        }
    },spd)
}
/********************************************************/
function Bullet(){
    var x,img,int
    x=52
    img=document.createElement('img')
        img.src='canon_ball.png'
        img.setAttribute('class','mh posAbs')
        img.setAttribute('style','top:0px;left:'+x+'px')
        img.setAttribute('id','bul'+buls)
    scre.appendChild(img)
    img=document.getElementById('bul'+buls)
    buls++
    int=setInterval(function(){
        if(x<300){
            x+=13
            img.setAttribute('style','top:0px;left:'+x+'px')
        }
            else{
                img.src='canon_ball.png'
                clearInterval(int)
                setTimeout(function(){ scre.removeChild(img) },100)
            }
    },spd)
}
/********************************************************/
$(document).ready(function(){
    $('html').keydown(function(){
        if(!act){
            if(Event.keyCode==13)   ani();
        }
    })
    $('html').click(function(){
        if(!act)    ani();
    })
})
/**************************************************/