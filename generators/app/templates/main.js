var microgear = window.microgear

microgear = Microgear.create({
  key: Config.appKey,
  secret: Config.appSecret,
})

microgear.on('connected', function () {
  microgear.setAlias(Config.alias)
  microgear.subscribe('/gearname/+')
})

microgear.on('present', function (event) {
  console.log(event)
})

microgear.on('absent', function (event) {
  console.log(event)
})

microgear.on('message', function (topic, msg) {
  console.log('on_message', topic, msg)
  $p = $('<p>' + new Date() + 'message: ' + msg + ' from: ' + topic + '</p>')
  $('#incoming-messages').prepend($p)
})

function connect_netpie () {
  microgear.resettoken(function (err) {
    if (err) {
      console.log('reset token err', err)
    } else {
      microgear.connect(Config.appId)
    }
  })
}
