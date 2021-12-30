const crypto = require('crypto');
const hash = crypto.createHash('sha256');
let timestamp = Math.floor(new Date().getTime() / 1000)
// username:airyli
// appid：b2b5b4ee50c411eca9ce14050957eeaa
// appKey：c89eef0c50c411eca9ce14050957eeaa
// timestamp: 1638858679
hash.update('*airyli*c89eef0c50c411eca9ce14050957eeaa*1638858679*');

const hashstr = hash.digest('hex');
console.log(hashstr);
// e49b5e681b1e1310c9eb67c946342571d9ce2903cd11138004f18bf467245ef2

let str = "[('碳中和', 25.12309), ('零碳,排,放,', 19.75996), ('碳平衡', 18.730606), ('使用,可再,生能源', 18.228424), ('减少二氧化碳排放', 18.18361)]";
// str = str.replace(/\(/g, '@');

// let match = regexp.exec(str);
// while ((match = regexp.exec(str)) !== null) {
//   let tempArr = match[1].split(',');
//   let tempObj = {
//     word: tempArr[0],
//     confidence: tempArr[1],
//   }
//   ans.push(tempObj);
//   console.log(`${match[1]}`);

// }
// // console.log(str);
// // console.log(regexp.exec(str)[0]);
// console.log(ans);
str = str.replace(/'/g, '');
// 正则匹配（）中间的值
const regexp = /\((.*?)\)/mg;
let match = regexp.exec(str);
const ans = [];
let ifMatch = true
while (ifMatch) {
  let index = match[1].lastIndexOf(',');
  if (index === -1) {
    continue;
  }
  const tempArr = match[1].split(',');
  const tempObj = {
    // word: tempArr[0],
    word: match[1].substring(0, index),
    // confidence: tempArr[1],
    confidence: match[1].substring(index + 1),
  };
  ans.push(tempObj);
  // console.log(`${match[1]}`);
  ifMatch = (match = regexp.exec(str)) !== null;
}
console.log(ans);
