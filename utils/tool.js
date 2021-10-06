
const {parseString} = require('xml2js')
module.exports = {
  getUserDataAsync(req){
    return new Promise((resolve,reject)=>{
      let xmlData = ''
      req.on('data',data => {
        xmlData += data.toString()
      })
      .on('end',()=>{
        resolve(xmlData)
      })
    })

  },
  parseXMLAsync(xmlData){
    return new Promise((resolve,reject)=>{
      parseString(xmlData, {trim:true}, (err,data)=>{
        if(!err){
          resolve(data)
        }else{
          reject('parseXMLAsync error '+ err)
        }
      })
    })

  },
  formatMessage(jsData){
    let message = {}
    if(jsData.xml && typeof jsData.xml === 'object'){
      for(let key in jsData.xml){
        let value = jsData.xml[key]
        if(Array.isArray(value) && value.length > 0){
          message[key] = value[0]
        }
        
      }
    }
    return message
  }
}