const sha1 = require('sha1')
const config = require('../config')
const { getUserDataAsync,parseXMLAsync,formatMessage} = require('../utils/tool')

module.exports = (params) => {
  return async (req,res,next) =>{
    console.log('request is :')
    console.log(req.query)
    if(req.query && req.query.signature){
      const timestamp = req.query.timestamp
      const nonce = req.query.nonce
      const echostr = req.query.echostr
  
      const token = config.token
  
      const signature = req.query.signature
  
      const arr = [timestamp,nonce,token]
      const arrSort = arr.sort()
      console.log(`arrSort is ${arrSort}`)
      const str = arrSort.join('')
      const sha1Str = sha1(str)
      if(signature === sha1Str){
        console.log('signature success')
        // res.send(echostr)
      }else{
        res.end('error')
      }
    }

    if(req.method === 'GET'){
      res.end('')
    }else if(req.method === 'POST'){
      const xmlData = await getUserDataAsync(req)
      console.log('get user data is')
      // console.log(xmlData)

      const jsData = await parseXMLAsync(xmlData)
      const message = formatMessage(jsData)
      console.log(message)



      let content = ''
      if(message.MsgType === 'text'){
        if(message.FromUserName === 'oXYjk6LxKz6N8P-gKEYYi_VGn-to'){
          content = 'hello world'
        }
      }

      let replyMessage = `
      <xml>
        <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
        <CreateTime>${Date.now()}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${content}]]></Content>
      </xml>`
      
      res.send(replyMessage)
      // res.end('')
    }else {
      res.end('error')
    }
  }
}