/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
const inquirer = require('inquirer');
const qr = require('qr-image');
const fs = require('fs');

inquirer
    .prompt([
        {
            name: "first_name",
            type: "input",
            message: "enter your url here? ",
          },
    ])
    .then((answer) => {
        const qr_svg = qr.image(answer.first_name, {type:"png"});
        qr_svg.pipe(fs.createWriteStream('qr_img_two.png'));
        
        fs.writeFile('url.txt', answer.first_name, (err) => {
            if(err) throw err;
            console.log('file hase been saved succesfully');
        })

    })
    .catch((err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("somthing get wrong");
        }
    })



// const svg_string = qr.imageSync(answer.first_name, {type: 'svg'});