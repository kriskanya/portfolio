'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.login = (req, res)=>{
  res.render('users/login', {title: 'Login'});
};

exports.authenticate = (req, res)=>{
  User.login(req.body, u=>{
    if(u){
      req.session.userId = u._id;
      res.redirect('/portfolio');
    }else{
      req.session.userId = null;
      res.redirect('/login');
    }
  });
};

exports.lookup = (req, res, next)=>{  //if you want a function to do something and then hand if off to the next guy, you need to do a next
  User.findByUserId(req.session.userId, u=>{
    res.locals.user = u;  //locals is an object
    next();
  });
};

exports.logout = (req, res)=>{
  req.session.userId = null;
  res.redirect('/');
};
