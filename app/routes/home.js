'use strict';

exports.index = (req, res)=>{
  res.render('home/index', {title: 'Node.js: Home'});
};

exports.help = (req, res)=>{
  res.render('home/help', {title: 'Node.js: Help'});
};

exports.about = (req, res)=>{
  res.render('home/about', {title: 'About Page'});
};

exports.contact = (req, res)=>{
  res.render('home/contact', {title: 'Contact Page'});
};

exports.resume = (req, res)=>{
  res.render('home/resume', {title: 'Resume'});
};
