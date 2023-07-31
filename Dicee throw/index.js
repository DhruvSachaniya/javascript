var randomNumber1 = Math.floor(Math.random() * (6 - 1 + 1) + 1); 
var randomNumber2 = Math.floor(Math.random() * (6 - 1 + 1) + 1); 

document.getElementById('img1').src = 'images/dice'+randomNumber1+".png";

document.getElementById('img2').src = 'images/dice'+randomNumber2+".png";

if (randomNumber1 === randomNumber2) {
    document.querySelector('h1').innerHTML = 'Draw!';
} else if (randomNumber1 > randomNumber2) {
    document.querySelector('h1').innerHTML = '🚩 Player 1 won!';
} else {
    document.querySelector('h1').innerHTML = 'Player 2 won! 🚩';
}


