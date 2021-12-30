const fs = require('fs');

function getFileData(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

async function getData(url){
  let data = await getFileData(url);
  return data;
}

module.exports = getData;