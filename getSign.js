
const sha1 = require('sha1')


let url = 'http://3f0a-36-26-8-234.ngrok.io/'
url = 'http://digitalcitylab.com.cn/iBuildingWechat/'
const timestamp = Date.now().toString().slice(0,10)
const jsapi_ticket = 'LIKLckvwlJT9cWIhEQTwfBoMCsVVSYGz8fd28IfjLQGBiYS7WAMqdN5XlacMqaqlFUs81Sh3FTwLn27H6VwZvw'
const noncestr = (Math.random()*10000000000).toString().split('.')[0]

const arr = [
  `noncestr=${noncestr}`,
  `jsapi_ticket=${jsapi_ticket}`,
  `timestamp=${timestamp}`,
  `url=${url}`
]

const arr2 = arr.sort()
const str = arr2.join('&')

const str2 = sha1(str)
console.log(arr)
console.log(arr2)
console.log(str)
console.log(str2)