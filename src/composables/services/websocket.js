const socketcluster = require('socketcluster-client')
const debug = true

// Public channel idenitfier and general options
let options = { waitForAuth: true }
let publicChannelKey = JSON.stringify({ type: 'public' })
let userChannel
// Initiate the connection to the websocket server
let socket = socketcluster.connect({
  hostname: 'localhost',
  port: 23958,
  autoReconnect: true
})

// Socket Error logging
socket.on('error', err => debug ? console.log('Websocket error:', err) : null)

// Channel Subscribe
socket.on('subscribe', channelName => {
  if (JSON.parse(channelName).type === 'role') {
    socket.watch(channelName, d => {
      if (debug) console.log('Received role channel message.', d)
      // Auth.authenticate()
    })
  }
  else if (JSON.parse(channelName).type === 'user') {
    socket.watch(channelName, d => {
      if (debug) console.log('Received user channel message', d)
      if (d.action === 'reauthenticate') Auth.authenticate()
      else if (d.action === 'logout' && d.sessionId === socket.getAuthToken().sessionId) {
        Auth.logout()
        Alert.warning('You have been logged out from another window.')
      }
      // else if (d.action === 'newMessage') { NotificationSvc.refresh() }
      // else if (d.action === 'refreshMentions') {
      //   NotificationSvc.refresh()
      //   NotificationSvc.refreshMentionsList()
      // }
    })
  }
  else if (JSON.parse(channelName).type === 'public') {
    socket.watch(channelName, d => d.action === 'announcement' ? Alert.warn(d.message) : null)
  }
  else debug ? console.log('Not watching', channelName) : null

  if (debug) console.log('Websocket subscribed to', channelName, 'with watchers', socket.watchers(channelName))
})

// Channel Unsubscribe
socket.on('unsubscribe', channelName => {
  if (debug) console.log('Websocket unsubscribed from', channelName, socket.watchers(channelName))

  // disconnect all watchers from the channel
  socket.unwatch(channelName)
})

// Socket Authentication
socket.on('authenticate', () => {
  if (debug) console.log('Authenticated WebSocket Connection')

  // Emit LoggedIn event to socket server
  socket.emit('loggedIn')

  // subscribe to user channel
  let userChannelKey = JSON.stringify({ type: 'user', id: Session.user.id })
  userChannel = socket.subscribe(userChannelKey, options)

  // subscribe to roles channels
  if (Session.user.roles) {
    Session.user.roles.forEach(role => {
      let channel = JSON.stringify({ type: 'role', id: role })
      socket.subscribe(channel, options)
    })
  }
})

socket.on('connect', status => {
  if (status.isAuthenticated) socket.emit('loggedIn')
})

// Handle LoginEvent
$rootScope.$on('loginEvent', socketLogin)

// Handle LogoutEvent
$rootScope.$on('logoffEvent', () => {
  socket.subscriptions().forEach(channel => {
    if (channel !== publicChannelKey) socket.unsubscribe(channel)
  })
  socket.deauthenticate()
  socket.emit('loggedOut')
})

const socketLogin = () => {
  socket.authenticate(Session.getToken())
  // NotificationSvc.refresh()
  // NotificationSvc.refreshMentionsList()
}

// API Functions
const watchUserChannel = handler => {
  if (userChannel) userChannel.watch(handler)
  else setTimeout(() => watchUserChannel(handler), 1000)
}

const unwatchUserChannel = handler => userChannel ? userChannel.unwatch(handler) : null

const isOnline = (user, callback) => {
  if (socket.state === 'open') socket.emit('isOnline', user, callback)
  else setTimeout(() => isOnline(user, callback), 1000)
}

// init function
if (Session.getToken()) socketLogin()

// always subscribe to the public channel
const publicChannel = socket.subscribe(publicChannelKey, options)

export default {
  watchUserChannel: watchUserChannel,
  unwatchUserChannel: unwatchUserChannel,
  isOnline: isOnline
}