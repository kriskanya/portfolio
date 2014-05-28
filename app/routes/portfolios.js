'use strict';
var multiparty = require('multiparty');
var fs = require('fs');
var traceur = require('traceur');
var Portfolio = traceur.require(__dirname + '/../models/portfolio.js');  //imports the Portfolio class
// var portfolios = global.nss.db.collection('portfolios');

exports.index = (req, res)=>{
  console.log('USER ID....');
  console.log(req.session.userId);
  console.log('xxxxxx');
  console.log(res.locals.user);
  res.render('portfolios/index', {title: 'Portfolio: Index'});
};

exports.new = (req, res)=>{
  res.render('portfolios/new', {title: 'Portfolio: New'});
};

exports.create = (req, res)=>{
  var form = new multiparty.Form();

  form.parse(req, (err, fields, files)=>{
    var portfolio = {};  //makes a blank portfolio object, which we will be saving in the db
    portfolio.title = fields.title[0];
    portfolio.description = fields.description[0];
    portfolio.tags = fields.tags[0];
    portfolio.git = fields.git[0];
    portfolio.app = fields.app[0];
    portfolio.date = fields.date[0];
    portfolio.userId = req.session.userId;

    //creates a photos property within portfolios and fills it with an array of photo names

    portfolio.photos = [];
    files.photo.forEach(p=>{
      fs.renameSync(p.path, `${__dirname}/../static/img/${p.originalFilename}`);
      portfolio.photos.push(p.originalFilename);
    });

  //   var album = {};
  //   album.title = fields.title[0];
  //   album.date = new Date(fields.date[0]);
  //   album.photos = [];
  //   files.photos.forEach(p=>{
  //     fs.renameSync(p.path, `${__dirname}/../static/img/${p.originalFilename}`);
  //     album.photos.push(p.originalFilename)
  //   });

    console.log('xxxxxxxxxxxxxxxx');
    console.log(portfolio);

    var portfolioObj = new Portfolio(portfolio);
    console.log(portfolioObj);

    portfolio.save(()=>{
      res.redirect('/portfolio');
    });
    // portfolios.save(portfolio, ()=>res.redirect('/portfolio'));
  });
};
