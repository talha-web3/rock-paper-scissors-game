let ourMove= JSON.parse(localStorage.getItem('ourMove')) || ' ';
let compMove= JSON.parse(localStorage.getItem('compMove')) || ' ' ;
let score =JSON.parse(localStorage.getItem('score')) || {wins : 0, losses : 0, ties : 0};
let result=JSON.parse(localStorage.getItem('result')) || 'Result.';
let setIntervalId;
let autoPlaying = false;


function computerMove(){
const randomNumber= Math.random();
if(randomNumber >= 0 && randomNumber < 1/3){
  compMove='rock';
}else if(randomNumber >= 1/3 && randomNumber < 2/3){
  compMove= 'paper';
}else if(randomNumber >= 2/3 && randomNumber < 1){
  compMove= 'scissors';
}
localStorage.setItem('compMove',JSON.stringify(compMove));
return compMove;
}


function autoPlay(){
  if(!autoPlaying){
    setIntervalId= setInterval(function(){
      const ourMove = computerMove();
      playGame(ourMove);
    }, 1000)
    autoPlaying= true;
    document.querySelector('.js-auto-play-button')
      .innerHTML='Stop Playing'
  }
  else{
    clearInterval(setIntervalId);
    autoPlaying= false;
    document.querySelector('.js-auto-play-button')
    .innerHTML='Auto Play'
  }
}

function stopAutoPlay(){
  clearInterval(setIntervalId);
}
    // .addEventListener():-
    document.querySelector('.js-rock-button')
    .addEventListener('click', ()=>{
      playGame('rock');
    });

    document.querySelector('.js-paper-button')
    .addEventListener('click', ()=>{
      playGame('paper');
    });

    document.querySelector('.js-scissors-button')
    .addEventListener('click', ()=>{
      playGame('scissors');
    });

    document.body.addEventListener('keydown', (event)=>{
      if(event.key==='r' || event.key==='R'){
        playGame('rock');
      }
    });

    document.body.addEventListener('keydown', (event)=>{
      if(event.key==='p' || event.key==='P'){
        playGame('paper');
      }
    });

    document.body.addEventListener('keydown', (event)=>{
      if(event.key==='s' || event.key==='S'){
        playGame('scissors');
      }
    });

function playGame(ourMove){
localStorage.setItem('ourMove', JSON.stringify(ourMove));
  compMove= computerMove();
  //let result='';

  if(ourMove==='scissors'){

  if (compMove==='rock'){
    result='You lose.'
  }
  else if (compMove==='paper'){
    result='You win.'
  }
  else if (compMove==='scissors'){
    result='Tie.'
  }
}
else if (ourMove==='paper'){

  if (compMove==='rock'){
    result='You win.'
  }
  else if (compMove==='paper'){
    result='Tie.'
  }
  else if (compMove==='scissors'){
    result='You lose.'
  }
}
else if (ourMove==='rock'){

  if (compMove==='rock'){
    result='Tie.'
  }
  else if (compMove==='paper'){
    result='You lose.'
  }
  else if (compMove==='scissors'){
    result='You win.'
  }
}
localStorage.setItem('result',JSON.stringify(result));



document.querySelector('.js-result').innerHTML= result;


if(result==='You win.'){
  score.wins=score.wins + 1;
}else if (result==='You lose.'){
  score.losses+=1;
}else if (result==='Tie.'){
  score.ties++;
}
document.querySelector('.js-score').innerHTML= `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}` ;
document.querySelector('.js-moves').innerHTML= `You<img src="icons/${ourMove}-emoji.png" class="rock-img">
<img src="icons/${compMove}-emoji.png"class="rock-img">Computer`


localStorage.setItem('score', JSON.stringify(score));
// alert(`You selected ${ourMove}, Computer selected ${compMove}, ${result}
//Wins:${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`)
}


document.querySelector('.js-score').innerHTML= `Wins:${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}` ;


function resetEverything()
{
score.wins = 0 ;
  score.losses = 0 ;
  score.ties = 0 ;
  localStorage.removeItem('score');
  document.querySelector('.js-score').innerHTML= `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}` ;
  localStorage.removeItem('result');
  localStorage.removeItem('ourMove');
  localStorage.removeItem('compMove');
  location.reload();
};

document.querySelector('.js-auto-play-button')
  .addEventListener('click', ()=>{
    autoPlay();
  });
  document.body.addEventListener('keydown', (event)=>{
    if(event.key==='a'|| event.key==='A'){
      autoPlay();
    }
  });

  document.querySelector('.js-stop-auto-play-button')
  .addEventListener('click', ()=>{
    stopAutoPlay();
  });

document.querySelector('.js-reset-button')
  .addEventListener('click', ()=>{
    confirmationBar()
  });
  document.body.addEventListener('keydown', (event)=>{
    if(event.key==='Backspace'){
      confirmationBar();
    }
  });

  function confirmationBar(){
    document.querySelector('.js-confirmation-message')
        .classList.add('confirmation-message');
      document.querySelector('.js-confirmation-message')
        .innerHTML=`<p class="confirmation-parag">Are you sure you want to reset the score?</p>
        <button onclick="
          resetEverything();
        " class="yes-button">Yes</button>
        <button onclick="
        document.querySelector('.js-confirmation-message')
        .innerHTML='';
        document.querySelector('.js-confirmation-message')
        .classList.remove('confirmation-message');
        " class="no-button">No</button>
        `
  }