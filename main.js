const express = require('express')
// const sha1 = require('sha1')
// const config = require('./config')
const auth = require('./wechat/auth')


const Wechat = require('./wechat/accessToken')
const w = new Wechat()
w.fetchAccessToken()

const app = express()


app.get('/search',(req,res) => {

})

app.use(auth())

app.listen(3001,()=>{
  console.log('server is running...')
})

