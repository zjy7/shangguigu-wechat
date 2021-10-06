

const rp = require('request-promise-native')
const { writeFile, readFile } = require('fs')
const config = require('../config')
const { resolve } = require('path')


module.exports = class Wechat {
  constructor(){

  }

  getAccessToken(){
    const url =`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appID}&secret=${config.appsecret}`
    return new Promise((resolve,reject)=>{
      rp(
        {
          method:'GET',
          url:url,
          json: true
        }
      ).then(res=>{
  
        console.log(res)
        res.expires_in = Date.now() + (res.expires_in - 300) * 1000
        resolve(res)
      }).catch(err=>{
        reject('getAccessToken error '+err)
      })
    })

  }

  saveAccessToken(accessToken){
    const x = JSON.stringify(accessToken)
    return new Promise((resolve,reject)=>{
      writeFile('./accessToken.txt', x, err=>{
        if(!err){
          console.log('文件保存成功')
          resolve()
        }else{
          console.log('文件保存失败')
          reject('saveAccesToken '+err)
        }
      })
    })
  }

  readAccessToken(){
    return new Promise((resolve,reject)=>{
      readFile('./accessToken.txt',(err,data)=>{
        if(!err){
          console.log('文件读取成功')
          resolve(JSON.parse(data))
        }else{
          reject('readAccessToken '+err)
        }
      })
    })
  }

  isValidAccessToken(data){
    if(!data && !data.access_token && !data.expires_in){
      return false
    }else if(data.expires_in < Date.now()){
      return false
    }else{
      return true
    }
  }

  fetchAccessToken(){
    if(this.access_token && this.expires_in && this.isValidAccessToken(this)){
      return Promise.resolve(
        {
          access_token:this.access_token,
          expires_in:this.expires_in
        }
      )
    }

    return this.readAccessToken()
      .then(async res=>{
        if(this.isValidAccessToken(res)){
          return Promise.resolve(res)
          // resolve(res)
        }else{
          const res = await this.getAccessToken()
          await this.saveAccessToken(res)
          return Promise.resolve(res)
          // resolve(res)
        }
      })
      .catch(async err=>{
        const res = await this.getAccessToken()
        await this.saveAccessToken(res)
        return Promise.resolve(res)
        // resolve(res)
      })
      .then(res=>{
        this.access_token = res.access_token
        this.expires_in = res.expires_in
        return Promise.resolve(res)
      })
    
  }

  createMenu(){
    return new Promise((resolve,reject) => {
      const url = ``
    })
  }

}

