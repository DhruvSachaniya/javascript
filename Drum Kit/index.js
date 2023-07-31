// alert('hello');
// var n = '.w';
// document.querySelector(n).style.color = "black";
// for(let i=0; i<document.querySelectorAll('.drum').length;) {
//     document.querySelectorAll('.drum')[i].addEventListener('click', function () {
//         alert('I got clicked');
        // var audio = new Audio('sounds/crash.mp3');
        // audio.play();
//     });
// }

var numverOfDrumButtons = document.querySelectorAll('.drum').length;

for (var i = 0; i<numverOfDrumButtons; i++) {
    document.querySelectorAll('.drum')[i].addEventListener('click', function () {


        // this.style.color =  'white';
        var ButtonInnerHtml = this.innerHTML;
        chacker(ButtonInnerHtml)

        Buttonanimation(ButtonInnerHtml);
        
    });
}



document.addEventListener('keypress', function (event) {
    chacker(event.key)

    Buttonanimation(event.key);
})


function chacker (key) {

    switch (key) {
        case "w":
            var audio = new Audio('sounds/tom-1.mp3');
            audio.play();
        break;
        
        case "a":
            var audio = new Audio('sounds/tom-2.mp3');
            audio.play();
        break;

        case "s":
            var audio = new Audio('sounds/tom-3.mp3');
            audio.play();
        break;

        case "d":
            var audio = new Audio('sounds/tom-4.mp3');
            audio.play();
        break;

        case "j":
            var audio = new Audio('sounds/crash.mp3');
            audio.play();
        break;

        case "k":
            var audio = new Audio('sounds/kick-bass.mp3');
            audio.play();
        break;

        case "l":
            var audio = new Audio('sounds/snare.mp3');
            audio.play();
        break;

        default:
    }

}


function Buttonanimation (currentkey) {
    
    var activeButton = document.querySelector("."+ currentkey);
    activeButton.classList.add('pressed'); 

    setTimeout(() => {
        activeButton.classList.remove('pressed');
    }, 100);
}

