const logUtil = require('../common/util/logUtil');
const pdf = require('html-pdf');
const ejs = require('ejs');
const BizException = require('../common/exception/BizException');
const uuid = require('uuid');
const constant = require('../common/constant');

const pdfOptions = {
  "format": 'A4',
  "header": {
    "height": "10mm",
    "contents": ''
  }
};

/**
 * html 转 pdf
 * 
 * @param file 模板文件
 * @param data 模板数据
 * @author cch
 */
async function html2pdf(template, data) {
  // 模板渲染
  try {
    template = ejs.render(template, data);
  } catch (e) {
    throw new BizException('模板渲染错误，请检查模板和对应的填充数据是否正确');
  }
  // 导出 pdf, 使用 promise 解决回调地狱
  return new Promise((resolve, reject) => {
    pdf.create(template, pdfOptions).toFile(constant.FILE_TMP_PATH + '/' + uuid.v4() + '.pdf', (err, file) => {
      if (err) {
        logUtil.error('html 转换 pdf 失败', err);
        reject(new BizException('html 转换 pdf 失败'));
        return;
      }
      resolve(file.filename);
    });
  });
}

module.exports = {
  html2pdf
}