const Tg = require('tg-yarl')
const Rx = require('rx')

module.exports = function telegram (config) {
  const tg = Tg(config['telegram-api-token'])
  return (subject, message) =>
    Rx.Observable.forkJoin(
      config['telegram-recipients'].map(r =>
        Rx.Observable.fromPromise(tg.sendMessage(r, `${subject} \n${message}`))
      )
    )
}