const express = require('express')
const app = express()
const ejs = require('ejs')
const nodemailer = require("nodemailer");
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/thanks', (req, res) => {
    // res.send(req.protocol)
    res.render('thanks')
})

app.post('/submit',async (req, res) => {
    let transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'octaright@gmail.com',
            pass: 'octaright@123'
        }
    });

    let mailOptions = {
        from: '"Octaright"octaright@gmail.com',
        to: 'saifalishaikh.dev@gmail.com',
        subject: 'New Website Order',
        text: `Hi Octaright

I am intrasted this offer, This my details
   
Name : ${req.body.name}
Email : ${req.body.email}
Phone : ${req.body.phone}

Plz call me sir.`
        // html: text_var
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (!error) {
            res.redirect('/thanks')
            // return res.send(error);
        } else {
            res.send(error)
            // res.redirect('/')
            // return res.send('Email sent: ' + info.response);
            // return res.json({ expires: expires })
        }
    });
})

app.get('*', (req, res) => {
    res.render('index')
})

app.listen(port)