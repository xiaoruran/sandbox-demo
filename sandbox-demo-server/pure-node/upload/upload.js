const http = require("http");
const fs = require("fs");
const path = require('path');
const { readFile } = require("../filereader/index");
const querystring = require("querystring");

const port = 3000;

//创建服务器
const server = http.createServer((req, res) => {
  console.log(req.url + '--' + req.method);
  if (req.url === '/upload' && req.method === 'GET') {
    res.writeHead(200, { "Content-Type": "text/html" });
    // 读取文件
    readFile(path.join(__dirname, './upload.html'), ({ success, data }) => {
      if (success) {
        res.end(data)
      } else {
        res.end(`找不到哦`);
      }
    });
  } else if (req.url === '/upload' && req.method === 'POST') {
    if (req.headers["content-type"].indexOf("multipart/form-data") !== -1) {
      parseFile(req, res)
    }
  }
});


function parseFile(req, res) {
  req.setEncoding("binary"); // 二进制编码
  let body = ""; // 文件数据

  req.on("data", function (chunk) {
    body += chunk;
  });

  req.on("end", function () {
    console.log(body);
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
    });
    res.end('上传成功');
  });
}

server.listen(port, () => {
  console.log(`${port}正在被监听`);
})
