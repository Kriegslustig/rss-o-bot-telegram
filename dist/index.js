'use strict';

var Tg = require('tg-yarl');
var Rx = require('rx');

module.exports = function telegram(config) {
  var tg = Tg(config['telegram-api-token']);
  return function (subject, message) {
    return Rx.Observable.forkJoin(config['telegram-recipients'].map(function (r) {
      return Rx.Observable.fromPromise(tg.sendMessage(r, subject + ' \n' + message));
    }));
  };
};