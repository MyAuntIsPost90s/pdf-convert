pdf-convert
===========
支持 html 转 pdf

## 功能
1. html 转 pdf，支持大部分 css 参数。

## 技术栈
1. nodejs
2. express
3. pdf-html
4. ejs
5. log4js

## 启动命令
`首次执行，先执行 npm install 完成包引用。`

npm run start

## 接口
/api/ability/html2pdf

请求头

|  参数   | 值  |
|  ---- | ----  |
|  method  | POST  |
|  content-type  | multipart/form-data  |

请求参数
|  参数   | 说明  |
|  ---- | ----  |
|  file  | 必填，html 模板文件  |
|  data  | 非必填，模板参数 json 字符串 |

`注：resources/template 下有测试文件`