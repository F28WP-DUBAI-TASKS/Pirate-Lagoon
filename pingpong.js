$(window).load(function () 
{
    $(".popup_trigger1").click(function(){
       $('.bkgd1').show();
    });
    // $('.bkgd').click(function(){
    //     $('.bkgd').hide();
    // });
    $('.popupCloseButton1').click(function(){
        $('.bkgd1').hide();
    });

});