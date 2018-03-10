const express = require('express')
const app = express()
const path = require('path');

app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => res.render('index'))
var port = 3000


//
var passport = require('passport')
, FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "https://invitation-system.herokuapp.com/auth/facebook/callback"
  }
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
));
 
app.get('/auth/facebook',
passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});

app.listen(port, function() {
 console.log('running at localhost: ' + port);
});
