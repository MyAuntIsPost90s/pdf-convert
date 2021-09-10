const express = require('express');
const logUtil = require('../common/util/logUtil');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const abilityService = require('../model/abilityService');
const BizException = require('../common/exception/BizException');
const constant = require('../common/constant');
const upload = multer({ dest: constant.FILE_TMP_PATH })

/**
 * html 转 pdf
 * 
 * @param file 模板文件
 * @param data 模板数据 json 格式
 * @author cch
 */
router.post("/html2pdf", upload.any(), async (req, res) => {
  try {
    // 参数解析
    if (!req.files || req.files.length < 1) {
      return res.send({ code: 0, message: '请上传模板文件' });
    }
    if (!req.files[0].originalname.endsWith('.html')) {
      return res.send({ code: 0, message: '模板文件类型不正确' });
    }
    // 解析 data 参数
    let data = {};
    if (req.body.data) {
      data = JSON.parse(req.body.data)
    }
    // 读取模板信息
    let template = fs.readFileSync(req.files[0].path, 'utf-8');
    fs.unlinkSync(req.files[0].path);
    let path = await abilityService.html2pdf(template, data)
    return res.download(path, req.files[0].originalname.replace('.html', '.pdf'), (err) => {
      fs.unlinkSync(path);
      if (err) {
        logUtil.error('pdf 下载异常', e);
      }
    });
  } catch (e) {
    if (e instanceof BizException) {
      return res.send({ code: 0, message: e.message });
    }
    logUtil.error('html 转 pdf 异常', e);
    return res.send({ code: 0, message: '系统异常，请联系开发人员处理' });
  }
});

module.exports = router;