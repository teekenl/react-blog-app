const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
let session = require('express-session');
const user = require('./user');

module.exports = {
    app: function () {
        const app = express();
        const indexPath = path.join(__dirname, 'index.html');
        const homePath = path.join(__dirname, 'home.html');
        const publicPath = express.static(path.join(__dirname, '../dist'));


        // setup db
        app.use(bodyParser.json()); // handle json data
        app.use(bodyParser.urlencoded({ extended: true })); // handle URL-encoded data
        app.use(session({secret: 'my-secret'}));
        app.use('/dist', publicPath);

        app.get('/', function (_, res) {
            res.sendFile(indexPath);
        });

        app.get('/signup',function(_,res) {
            res.sendFile(indexPath);
        });

        app.get('/home',function(req, res) {
            if(session && session.name) {
                res.sendFile(homePath);
            } else{
                res.redirect('/');
            }
        });

        // POST URL for sign in
        app.post('/login', function(req, res) {
            let email = req.body.email;
            let password = req.body.password;

            if(email && password) {
                user.signin(email, password, function(err,result){
                    if(err) res.send('Failed');
                    session = req.session;
                    session.username = result.name;
                    res.redirect('/home');
                })
            }
        });

        // POST URL for sign up
        app.post('/register',function(req,res) {
           let name = req.body.name;
           let email = req.body.email;
           let password = req.body.password;

           if(name && email && password) {
               user.signup(name,email,password,function(err,result){
                    if(err) res.send('Failed');
                    session = req.session;
                    session.username = result.name;
                    res.redirect('/home');
               });
           } else{
               res.send("Failure");
           }
        });

        return app;
    }
};
