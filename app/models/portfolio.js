'use strict';

var portfolios = global.nss.db.collection('portfolios');

class Portfolio{
  constructor(portfolio){
    this.userId = portfolio.userId;
    this.title = portfolio.title;
    this.description = portfolio.description;
    this.tags = portfolio.tags;
    this.git = portfolio.git;
    this.app = portfolio.app;
    this.date = portfolio.date;
    this.photos = portfolio.photos;
  }

  save(fn){
    portfolios.save(this, ()=>{
      fn();
    });
  }

  static findById(portId, fn){
    portfolios.findOne(portId, (err, port)=>{
      fn(port);
    });
  }
}

module.exports = Portfolio;
