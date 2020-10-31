    function openWindow(){
//code for opening the window is way down and is not spaced. The spaced/tabbed code here is the tictactoe one.
      
      
      var player1Score = [];
      var player2Score = [];
      
      
      var clickCount = 0;
      
      function clicked(id){
      
      
      if(clickCount%2==0 && player1Score.indexOf(id)<0 && player2Score.indexOf(id)<0 && clickCount<=9){
      
      document.getElementById(id).style.backgroundColor = "red";
      player1Score.push(id);
      clickCount++;
      if(checkWinnerPlayer1())
      clickCount = 10;
      }
      
      if(clickCount%2!=0 && player1Score.indexOf(id)<0 && player2Score.indexOf(id)<0 && clickCount<=9){
      
      document.getElementById(id).style.backgroundColor = "green";
      player2Score.push(id);
      clickCount++;
      if(checkWinnerPlayer2())
      clickCount = 10;
      }
      
      }
      
      function Reset()
      {
      
      player1Score = [];
      player2Score = [];
      clickCount = 0;
      location.reload();
      }
      
      
      
      function checkWinnerPlayer1(){
      
      var player1rows = [];
      var player1cols = [];
      
      
      for(i=0;i<player1Score.length; i++){
      var rowsColumns1 = [];
      rowsColumns1 = player1Score[i].toString().split('.');
      player1rows.push(rowsColumns1[0]);
      player1cols.push(rowsColumns1[1]);
      
      }
      
      
      var player1Winner = checkForRowColumn(player1rows);
      if(!player1Winner)
      player1Winner = checkForRowColumn(player1cols);
      if(!player1Winner)
      player1Winner = checkForDiagonal(player1Score);
      
      if(player1Winner){
      var play1 = document.getElementById("txtPlayer1Name").value;
      alert(play1+ ' wins click play again to resume');
      document.getElementById("divResult").style.display = "block";
      document.getElementById("divwinner").innerHTML = play1;
      return true;
      }
      return false;
      }
      
      function checkWinnerPlayer2(){
      var player2rows = [];
      var player2cols = [];
      for(i=0;i<player2Score.length; i++){
      var rowsColumns2 = [];
      rowsColumns2 = player2Score[i].toString().split('.');
      player2rows.push(rowsColumns2[0]);
      player2cols.push(rowsColumns2[1]);
      
      }
      
      
      var player2Winner = checkForRowColumn(player2rows);
      if(!player2Winner)
      player2Winner = checkForRowColumn(player2cols);
      if(!player2Winner)
      player2Winner = checkForDiagonal(player2Score);
      
      if(player2Winner){
      var play2 = document.getElementById("txtPlayer2Name").value;
      alert(play2 +'wins click play again to resume');
      document.getElementById("divResult").style.display = "block";
      document.getElementById("divwinner").innerHTML = play2;
      return true;
      }
      return false;
      
      
      }
      
      function checkForRowColumn(array){
      if(array.length>2){
      var one = 0;
      var two = 0;
      var three = 0;
      for(i=0;i<array.length;i++){
      if(array[i]=='1')
      one++;
      if(array[i]=='2')
      two++;
      if(array[i]=='3')
      three++;
      }
      if(one==3 || two==3 || three==3)
      return true;
      
      return false;
      }
      return false;
      
      }
      
      function checkForDiagonal(playerScore){
      if(playerScore.length >2){
      if(playerScore.indexOf('1.1')>-1 && playerScore.indexOf('2.2')>-1 && playerScore.indexOf('3.3')>-1)
      return true;
      if(playerScore.indexOf('1.3')>-1 && playerScore.indexOf('2.2')>-1 && playerScore.indexOf('3.1')>-1)
      return true;
      return false;
      }  
  }

  
   {
      newWindow = window.open("tictactoe.html", null, "width=500,height=700,status=yes,toolbar=no,menubar=no,location=no"); 
      newWindow.onload = function(){
          let content = "<button class='btn btn-primary' onclick='window.print();'>Confirm</button>";
        newWindow.document.getElementById('mainBody').innerHTML = content;
         } 
     
     newWindow.window.close();
  }}

  // Get the modal
var tictac = document.getElementById("myBox");

// Get the button that opens the modal
var button = document.getElementById("game1");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
button.onclick = function() {
  tictac.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  tictac.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == tictac) {
    tictac.style.display = "none";
  }
}