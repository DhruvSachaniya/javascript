import express from "express";
import axios from "axios";


const app = express();
const port = 5000;

app.use(express.static('public'));

app.use('/', async (req, res) => {
    try {
    const result = await axios.get("https://secrets-api.appbrewery.com/random");
    res.render("index.ejs", 
        {
            secret: result.data.secret,
            user: result.data.username
        }
    )
    } catch (error) {
        res.status(500);
    }
})

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})