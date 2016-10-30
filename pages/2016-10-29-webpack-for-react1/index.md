---
layout: post
title: "Webpack for React developer ตอนที่ 1"
summary: "บล๊อก technical blog แรกในชีวิต อยากจะมาแชร์การตั้งค่า webpack ที่ใช้ในการพัฒนา project react ที่ตัวเองใช้อยุ่บ่อยๆ"
tags:
- wepback
img: "https://raw.githubusercontent.com/LarngearTech/codesheep.io/master/pages/2016-10-29-webpack-for-react1/thumbnail.jpg"
author: "Arnupharp Viratanapanu"
---
จำได้ว่าเมื่อตอนที่เริ่มหัดเขียน react ใหม่ๆ สิ่งที่เป็นปัญหาอย่างหนึ่งในการหัดเขียนคือการ set environment
เนื่องด้วย react เอง เป็นคนเพื่อนเยอะ กว่าจะได้เริ่มเขียน Hello, world ได้เล่นเอาต้องไปไล่แนะนำตัวกับ
เพื่อนมันซะหลายคน เพื่อนตัวนึงที่ใช้เวลาในการทำความเข้าใจเยอะกว่าตัวอื่นเนื่องจากความสามารถมันเยอะคือเจ้า webpack นี่แหละ
บล๊อกนี้เนื้อหาอาจจะไม่ใหม่มาก(แหงสิมาเขียนเอาจนตอนเค้าจะออก version 2 แล้วนี่) แต่จะพยายามสรุป feature
ของ webpack ที่คิดว่ามีประโยชน์ในการพัฒนา react project เท่าที่ได้เคยใช้มามาแนะนำกันครับ

## Webpack นั้นคืออะไรตับไตไส้พุง
ใครเคยเขียนเวบในช่วงก่อนหน้านี้มาคงคุ้นเคยกับ code แบบข้างล่างนี้ดี 
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>jQuery • TodoMVC</title>
  <link rel="stylesheet" href="node_modules/todomvc-common/base.css">
  <link rel="stylesheet" href="node_modules/todomvc-app-css/index.css">
  <link rel="stylesheet" href="css/app.css">
</head>
<body>
    ...
  <script src="node_modules/todomvc-common/base.js"></script>
  <script src="node_modules/jquery/dist/jquery.js"></script>
  <script src="node_modules/handlebars/dist/handlebars.js"></script>
  <script src="node_modules/director/build/director.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
```
จะทำเวบๆนึงก็ต้อง include resource ต่างๆ ไม่ว่าจะเป็น javascript เอย css เอย แถมแต่ละตัวมีหลายไฟล์อีกแน่ะ

ปัญหาที่เกิดขึ้นอย่างแรกเลยคือไอ้พวก resource ต่างๆเหล่านี้เนี่ย เวลา browser อ่านไปเจอแต่ละตัวก็วิ่งไป server ที่นึง
เพื่อจะโหลดมา ยิ่งมีเยอะๆแบบนี้ก็วิ่งกันเหนื่อยเลยเวบก็โหลดช้า ยิ่งกว่านั้นยังต้องมาคอยระวังลำดับการ import เข้ามาอีก
เช่นถ้า handlebars.js ใช้ jquery ก็ต้อง import jquery.js ก่อนถึงจะ import handlebars.js ได้

webpack ช่วยเราแก้ปัญหาเหล่านี้โดยการสร้าง dependency graph ของ resource ที่ระบบของเราต้องการขึ้นมา แล้ว pack
resource ต่างๆเหล่านั้นเข้าด้วยกันเป็นไฟล์เดียว (หรืออาจจะหลายไฟล์ก็ได้แล้วแต่ตั้งค่า) โดยเรียงลำดับก่อนหลังให้ด้วยไม่ต้องเรียงเอง!

เพราะฉะนั้นหลังจากใช้ webpack แล้ว code ข้างบนจะกลายเป็น
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>React • TodoMVC</title>
</head>
<body>
  <div id="react-root" />
  <script src="/bundle.js"></script>
</body>
</html>
```
พูดง่ายๆ import bundle.js ไฟล์เดียวมาหมดทั้ง javascript ทั้งฝูงและ css และ font และก็อื่นๆแล่้วแต่ว่าจะสั่งให้มัน pack อะไร
โดยกระบวนการ pack เนี่ย webpack ทำผ่านสิ่งที่เรียกว่า loader ซึ่งจริงๆก็เป็น javascript ที่ทำหน้าที่เปลี่ยน file ชนิดต่างๆให้อยู่ใน
รูปแบบที่เหมาะสมในการ pack นั่นเอง

## สร้างโปรเจค react
เราจะมาลองสร้าง react project แล้ว pack มันด้วย webpack กันดู

ขั้นแรกสร้าง directory ว่างๆ สำหรับ project ที่เราจะทำการ pack แล้วทำการ `npm init`
ใครยังไม่มี `npm` ไปดาวโหลดน์ [nodejs](https://nodejs.org/en/) มาติดตั้งก่อน

```bash
mkdir helloreact
cd helloreact
npm init
```
ไม่ว่าจะเจอคำถามอะไรกด enter รัวๆ เพราะเราจะใช้ค่า default หมด npm จะสร้างไฟล์ package.json ขึ้นมาให้เรา
ขั้นต่อมาเราต้อง install react และ react-dom เพื่อใช้งาน react
```bash
npm install --save react react-dom
```
จากนั้นให้สร้างไฟล์ต่างๆตามให้มีโครงสร้างตามนี้
```javascript
helloreact
|--src
|  |--index.js
|  |--Hello.js
|  |--index.html
|--webpack.config.js
|--.babelrc
|--package.json
```
เรามาดูภายในไฟล์ดีกว่าเริ่มจาก

### src/index.html
เป็นไฟล์ template ของ index ไฟล์ของเรา โดยหลังจาก webpack สร้างไฟล์ output เสร็จแล้วเราจะสั่งให้มันเพิ่ม
`<script>...</script>` ที่ทำการ import ไฟล์ output เข้ามาใน index file โดยอัตโนมัติ
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Hello, React</title>
</head>
<body>
  <div id="react-root" />
</body>
</html>
```

### src/Hello.js
ไฟล์ React Component ของเรา เราจะยังไม่เน้นเรื่องการสร้าง react component ในบทความนี้ แต่จะเห็นได้ว่า
React Component ที่เราสร้างขึ้นนั้นเป็นเพียง javascript function ธรรมดาที่รับ props เป็น parameter 

ในการเขียนโปรแกรมด้วย React เราจะเน้นการสร้าง reusable Component ขึ้นมาใช้งาน คิดง่ายๆว่า
เราสามารถสร้าง tag `<Hello you="" me="" />` ไว้เรียกใช้งานได้ โดย tag นี้จะ render ค่าที่ถูก return โดย
ฟังก์ชั่นที่เราเขียนขึ้น เราสามารถเรียกใช้ you และ me ได้ผ่าน props
```javascript
import React from 'react'
const Hello = (props) => (
  <h1>Hello {props.you} from {props.me}</h1>
)
export default Hello
```

### src/index.js
ไฟล์ที่ทำการเรนเดอร์ React component ลงไปที่ ```<div id="react-root">``` ที่เราเตรียมไว้
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './Hello'

ReactDOM.render(<Hello you="React" me="jQuery" />, document.getElementById('react-root'))
```

## แปลงไฟล์ให้ browser เข้าใจก่อนจะ pack
babel เป็นเพื่อนซี้อีกคนนึงของ react ทำหน้าที่ในการแปลง javascript เป็น javascript!!!!



อ้าวววววว แล้วจะแปลงไปทำไม!!!!



เรื่องของเรื่องก็คือ javascript เนี่ยมันเปลี่ยนแปลงเร็วมากๆ คนทำ browser เนี่ย
ตาม support ไม่ทัน ถ้าเราอยากจะเขียนโปรแกรมโดยใช้ feature ใหม่ๆที่ browser ยังไม่ support เราจะต้องแปลงมันก่อน
เรียกกระบวนการนี้ว่า transpile 

โดยเราจะใช้มันในการแปลง javascript ES2015 และ JSX เป็น javascript ที่ใช้ browser ส่วนใหญ่เข้าใจ

### ติดตั้ง babel
babel แปลงไฟล์โดยใช้สิ่งที่เรียกว่า preset ดังนั้นเราต้องทำการติดตั้ง babel-core ซึ่งทำหน้าที่แปลงไฟล์และ babel-cli
เพื่อให้สามารถเรียกใช้ babel ได้จาก command line (อันนี้ติดตั้งหรือไม่ก็ได้) พร้อมทั้ง preset ที่เราต้องการใช้งาน
```bash
npm install --save-dev babel-core babel-cli babel-preset-es2015 babel-preset-react
```

### ตั้งค่า babel ผ่าน .babelrc
จากนั้นเราต้องสร้างไฟล์ .babelrc ซึ่งเป็น config ไฟล์ของ babel มีรูปแบบเป็น json เพื่อบอกมันว่าเราต้องการใช้ preset อะไรในการ
transpile ไฟล์ โดยเราสามารถใส่เป็น array ของชื่อ preset (ปกติจะนำมาจาก babel-preset-* ) ที่ต้องการใช้งานได้เลย 

### .babelrc
```json
{
  "presets": [
    "react",
    "es2015"
  ]
}
```

### ไป pack กันเลยย
![webpack all the things](/2016/10/29/webpack-for-react1/letspack.jpg)
### ติดตั้ง webpack และ loader
ติดตั้ง webpack และ loader ที่จำเป็นต้องใช้ โดยในขั้นต้นนี้เราจะใช้เพียง babel-loader ซึ่งเป็น loader ที่จะไปเรียก
babel ในขั้นที่แล้วที่เราตั้งค่าไว้มาทำการแปลงไฟล์ก่อนจะ pack
```bash
npm install --save-dev webpack babel-loader
```

### webpack.config.js
เช่นเดียวกับ babel ที่ต้องการ .babelrc

webpack ต้องการ config ไฟล์เหมือนกัน โดย default แล้ว webpack จะอ่าน config จากไฟล์ webpack.config.js
ซึ่งจะ export object ของ config ออกมาให้ webpack ได้เรียกใช้งาน

เรามาลองตั้งค่าพื้นฐานกันดูเลย
```javascript
var path = require('path')
module.exports = {
  entry: path.resolve('./src/index.js'), // Absolute path
  output: {
    filename: 'bundle.js',
    path: path.resolve('./dist'), // Absolute path
    publicPath: '/dist/',
  },
  ...
}
```
อันดับแรกเราต้องทำการตั้งค่า entry point ของโปรแกรมเราก่อน โดย webpack จะเข้าไปที่ไฟล์นี้และอ่านคำสั่ง import เพื่อสร้าง dependency graph ของโปรแกรมเราขึ้นมา

ในส่วนของ output นั้นเราจะต้อง set parameter 3 ตัวประกอบด้วย
* `filename` - ชื่อของ output file
* `path` - path ที่จะใช้ write output file
* `publicPath` - url ที่ refer ถึง path ของเรา

ในโปรเจคนี้เราจะ set webroot ให้ชี้ไปที่ helloreact ดังนั้น bundle.js จะถูกเขียนไปที่ helloreact/dist
และเราจะตั้งค่าให้ webpack ใส่ script เพื่อโหลด /dist/bundle.js ให้เราโดยอัตโนมัติ

```javascript
var path = require('path')
module.exports = {
  entry: ...,
  output: {...},
  module: {
    loaders: [
      {
        test: /\.js$/, // Match *.js
        exclude: /node_modules/, // Dont transpile files in node_modules
        loader: 'babel', // Use babel-loader to transpile
      },
    ]
  },
}
```

ตั้งค่าให้ทุกไฟล์ที่ลงท้ายด้วย .js ถูก load ด้วย `babel-loader` เราสามารถใส่ `babel` เฉยๆก็ได้ webpack เติม `-loader` ให้เอง หรือจะใส่เต็มๆก็ได้

สำหรับการตั้งค่า loader นั้นเราจะใช้ regular expression ในการบอกว่า ไฟล์ extension ไหนจะถูก load ด้วย loader ตัวไหน
โดยเราสามารถ chain loader ได้ เช่น ให้ไฟล์ sass ไปผ่าน sass-loader ก่อนจึงไปผ่าน css-loader และ style-loader ซึ่งจะได้เห็นตัวอย่างใน blog เรื่องการ pack style file ด้วย webpack

### ทดลองเรียกใช้งาน webpack
ให้ทำการเพิ่ม build script ใน package.json ดังนี้
```json
  "scripts": {
    "build": "webpack"
  },
```
ทดลองรันโดยเรียก `npm run build` จะพบว่า webpack ได้สร้าง file bundle.js ไว้ใน directory dist
```bash
topscores:helloreact/ (master✗) $ npm run build

> helloreact@1.0.0 build /Users/topscores/Documents/src/helloreact
> webpack

Hash: 602c7694f5cdf97ce38f
Version: webpack 1.13.3
Time: 2552ms
    Asset    Size  Chunks             Chunk Names
bundle.js  738 kB       0  [emitted]  main
    + 173 hidden modules
topscores:helloreact/ (master✗) $
```

## สร้าง index.html แบบอัตโนมัติ
เราสามารถสร้างไฟล์ index.html และสั่งให้ import ไฟล์ bundle.js เข้าไปใช้งานได้เลย แต่ในการใช้งานระดับสูง
บางครั้งเราไม่สามารถจะรู้ชื่อไฟล์ได้ล่วงหน้าเช่นในกรณีที่ใช้ hash ของ content เป็นชื่อไฟล์เพื่อให้สะดวกในการทำ caching
ในกรณีแบบนี้เราสามารถสั่งให้ webpack สร้างไฟล์ index.html พร้อมทั้ง import ไฟล์ output ให้ได้เลยโดยผ่าน plugin ชื่อของ
[html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)

### ติดตั้ง
```bash
npm install --save-dev html-webpack-plugin
```

### ตั้งค่าใน webpack.config.js
ตั้งให้ใช้ index.html ใน directory src เป็น template
[html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) จะทำการเพิ่ม script เพื่อ import output ไฟล์ลงในไฟล์นี้และเขียนไปที่ output directory
```javascript
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: ...,
  output: {...},
  module: {...},
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
}
```
จากนั้นลองรัน `npm run build` อีกครั้ง จะพบว่านอกจากไฟล์ bundle.js webpack ยังสร้างไฟล์ index.html ไว้ใน directory dist ด้วย

```bash
topscores:helloreact/ (master✗) $ npm run build

> helloreact@1.0.0 build /Users/topscores/Documents/src/helloreact
> webpack

Hash: 602c7694f5cdf97ce38f
Version: webpack 1.13.3
Time: 3131ms
     Asset       Size  Chunks             Chunk Names
 bundle.js     738 kB       0  [emitted]  main
index.html  214 bytes          [emitted]  
    + 173 hidden modules
Child html-webpack-plugin for "index.html":
        + 3 hidden modules
topscores:helloreact/ (master✗) $
```

## ติดตั้ง development server
webpack มากับ development server ชื่อ [webpack-dev-server](https://github.com/webpack/webpack-dev-server) ซึ่ง development server ตัวนี้
นอกจากจะใช้แทน web server ได้อย่างสะดวกสบายแล้วยังมาพร้อมกับความสามารถอย่าง live reload อีกด้วย

ในบทความนี้เราจะมาลองติดตั้งและเรียกใช้งาน webpack-dev-server เริ่มจากติดตั้งด้วยคำสั่ง
```bash
npm install --save-dev webpack-dev-server
```

จากนั้นทำการเพิ่ม config ในไฟล์ webpack.config.js เพื่อใช้ feature live reload โดยใส่ option inline เพื่อบอก webpack-dev-server ให้เพิ่ม
client script ที่ทำหน้าที่ refresh หน้า web เมื่อมีการแก้ไข code ลงไปใน output ไฟล์ด้วย
```javascript
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: ...,
  output: {...},
  module: {...},
  plugins: [...],
  devServer: {
    inline: true,
  },
}
```

เพิ่ม npm script
```json
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server"
  },
```

สั่ง `npm run dev` เพื่อ start development server
```bash
topscores:helloreact/ (master✗) $ npm run dev

> helloreact@1.0.0 dev /Users/topscores/Documents/src/helloreact
> webpack-dev-server

 http://localhost:8080/webpack-dev-server/
webpack result is served from /dist/
content is served from /Users/topscores/Documents/src/helloreact
Hash: 602c7694f5cdf97ce38f
Version: webpack 1.13.3
Time: 4739ms
```

โดย default webpack-dev-server จะ listen ที่ port 8080 โดยมี directory ที่เรียกใช้งานเป็น webroot
webpack-dev-server จะทำการอ่านไฟล์ webpack.config.js และทำการสร้าง output ไฟล์ ไว้ใน memory (จะไม่เห็น output ไฟล์ใน directory dist)

ลองเปิด browser ไปที่ http://localhost:8080/dist/index.html ดู จะพบว่าแต่นแต๊นน ได้ Hello, React ขึ้นมาแสดงดังรูป
![helloreact](/2016/10/29/webpack-for-react1/helloreact.png)

ทดลองเปลี่ยนแปลง code ใน index.js ให้แสดง you กับ me เป็นคำอื่นแล้ว save จะพบว่า browser จะ refresh หน้าใหม่โดยอัตโนมัติ

เป็นอย่างไรบ้างครับกับการ setup เบื้องต้นเล่นเอาเหนื่อย เขียนไปเขียนมาชักจะยาวเกินในบทความถัดๆไปจะเจาะลึกลงเรื่องของการใช้ loader ในการ load ไฟล์ ชนิดอื่นๆ และ feature ที่น่าสนใจอย่างเช่นการทำ hot-reload ครับ



