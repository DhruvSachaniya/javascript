$('h1').addClass('big margin')
$('h1').text('bugger');

// $('button').html("Don't");


console.log($('img').attr('src'));


$('h1').click(function () {
    $('h1').css('color', 'yellow');
});

//basic javascript

// for (var i = 0; i<5; i++) {
//     document.querySelectorAll('button')[i].addEventListener('click', function () {
//         document.querySelector('h1').style.color = 'white';
//         setTimeout(() => {
//             document.querySelector('h1').style.color = 'red';
//         }, 100);
//     }, )
// }

//jquery

// $('button').on('click', function () {
//     $('body').css('background-color', 'white');

//     // $('h1').hide();
//     setTimeout (() => {
//         $('body').css('background-color', 'black');
//     }, 100)
// })

// $('input').keypress(function (event) {
//     // console.log(event.key);
//     $('h1').text(event.key);
// })

// $('h1').on('mouseover', function () {
//     $('h1').css('color', 'blue');
// })


// $('a').on('click', function () {
//     if ($('body').hasClass('dark')) {
//         console.log('hii');
//     } else {
//         ($('body').addClass('dark'));
//     }
//     // $('body').css('background-color', 'white')
// })


// dark mode //

$( "button" ).on("click", function() {
    if( $( "body" ).hasClass( "dark" )) {
        $( "body" ).removeClass( "dark" );
        $( "button" ).text( "OFF" );
    } else {
        $( "body" ).addClass( "dark" );
        $( "button" ).text( "ON" );
    }
});

