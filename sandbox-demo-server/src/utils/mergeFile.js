const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');


function streamMerge(sourceFiles, targetFile) {
  const fileWriteStream = fs.createWriteStream(targetFile); // 创建一个可写流
  streamMergeRecursive(sourceFiles, fileWriteStream);
}

function streamMergeRecursive(sourceFiles = [], fileWriteStream) {
  // 递归到尾部情况判断
  if (sourceFiles.length === 0) {
    console.log('合并完成！')
    return fileWriteStream.end("console.log('Stream 合并完成')"); // 关闭可写流，防止内存泄漏
  }

  const currentFile = sourceFiles.shift();
  console.log(currentFile);
  const currentReadStream = fs.createReadStream(currentFile); // 获取当前的可读流

  currentReadStream.pipe(fileWriteStream, { end: false });
  currentReadStream.on('end', function () {
    streamMergeRecursive(sourceFiles, fileWriteStream);
  });

  currentReadStream.on('error', function (error) { // 监听错误事件，关闭可写流，防止内存泄漏
    console.error(error);
    fileWriteStream.close();
    throw new Error('文件合并发生错误');
  });
}

async function merge(sourceFiles, targetFile) {

  const doc = await PDFDocument.create();
  console.log(sourceFiles);
  for (let i = 0; i < sourceFiles.length; i++) {
    let page = await PDFDocument.load(fs.readFileSync(sourceFiles[i]));
    let [pageInner] = await doc.copyPages(page, [0]);
    doc.addPage(pageInner);
  }
  // 将文件流写入到目标文件中
  fs.writeFileSync(targetFile, await doc.save());
}

// merge(['../../public/pdf/output6.pdf', '../../public/pdf/output5.pdf', '../../public/pdf/outputFragmentCover.pdf'], '../../public/pdf/output7.pdf').catch((err) => {
//   console.log(err);
// })

module.exports = { merge };

// streamMerge(['../../public/pdf/output6.pdf', '../../public/pdf/output5.pdf'], '../../public/pdf/output7.pdf')