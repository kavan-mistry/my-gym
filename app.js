const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactGYM', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 4000;
const bodyparser = require("body-parser")

const contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    disc: String,
  });

const contact = mongoose.model('contact', contactSchema);


app.use('/static', express.static('static'));
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    const mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("this data has been saved to the database")
    }).catch(()=>{
        res.status(400).send("this data was not saved to the database")
    });
    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});