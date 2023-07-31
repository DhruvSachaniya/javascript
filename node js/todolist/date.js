
module.exports = getdate;



function getdate() {
    let today = new Date();
    let currentday = today.getDate();

    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    let day = today.toLocaleDateString("en-US", options)

    return day;
}
