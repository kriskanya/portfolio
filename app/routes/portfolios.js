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
  var userId = req.session.userId;

  form.parse(req, (err, fields, files)=>{
    var portfolio = {};  //makes a blank portfolio object, which we will be saving in the db
    portfolio.title = fields.title[0];
    portfolio.description = fields.description[0];
    portfolio.tags = fields.tags[0];
    portfolio.git = fields.git[0];
    portfolio.app = fields.app[0];
    portfolio.date = fields.date[0];
    portfolio.userId = userId;
    portfolio.photoPaths = [];
    var photoOrigPaths = [];  //the old path is the temporary path that node set up when you imported the file
    files.photo.map(photo=>{  //goes into the photo object (coming from the jade) and passes it in
      portfolio.photoPaths.push(`/img/${userId}/${portfolio.title}/${photo.originalFilename}`);  //pushes the path of all the photos into photoPaths
      photoOrigPaths.push(photo.path);  //pushes the temporary path into photoOrigPaths
    });

    console.log('xxxxx');
    console.log(portfolio.photoPaths);

    if(portfolio.photoPaths.length > 0){
      if(!fs.existsSync(`{$__dirname}/../static/img/${userId}`)){  //if the directory does not exist,
        fs.mkdirSync(`${__dirname}/../static/img/${userId}`);  // create it
      }
      if(!fs.existsSync(`{$__dirname}/../static/img/${userId}/${portfolio.title}`)){  //if the directory does not exist
        fs.mkdirSync(`${__dirname}/../static/img/${userId}/${portfolio.title}`);  //create it
      }

      portfolio.photoPaths.forEach((path, i)=>{  //for each of the new photo paths, change the sync from the old path to the new one
        fs.renameSync(photoOrigPaths[i], `${__dirname}/../static/${path}`);
      });
    }

      var newPortfolio = new Portfolio(portfolio);
      newPortfolio.save(()=>{
        res.redirect(`/portfolio`);
    });
  });
};
