---
layout: post
title: "ทดสอบ local npm package ด้วย yarn link"
summary: "เคยมั้ยครับที่โปรเจคของเราเรียกใช้ library ของคนอื่นแล้วพบว่ามันมีบั๊กต้องแก้ไข หรือไม่ก็เราอยากจะเพิ่มฟังก์ชันให้มันทำอะไรเพิ่มซักอย่าง เราก็เลย clone repo ของเค้าลงมาบนเครื่อง local แล้วทำการแก้ พอแก้เสร็จก็สงสัยว่าแล้วเราจะทดสอบ library ที่แก้แล้วนั้น กับโปรเจคของเรายังไง? (อ่านต่อ)"
tags:
- npmjs
- yarn
img: "https://raw.githubusercontent.com/LarngearTech/codesheep.io/master/pages/2016-12-10-yarn-link/yarn.jpg"
author: "Supasate Choochaisri"
---

เคยมั้ยครับที่โปรเจคของเราเรียกใช้ library ของคนอื่นแล้วพบว่ามันมีบั๊กต้องแก้ไข หรือไม่ก็เราอยากจะเพิ่มฟังก์ชันให้มันทำอะไรเพิ่มซักอย่าง เราก็เลย clone repo ของเค้าลงมาบนเครื่อง local แล้วทำการแก้ พอแก้เสร็จก็สงสัยว่าแล้วเราจะทดสอบ library ที่แก้แล้วนั้น กับโปรเจคของเรายังไง?

บทความนี้จะแนะนำวิธีหนึ่งที่นิยมใช้กันคือใช้ `yarn link` (หรือ `npm link` แต่ถึงตอนนี้ไม่น่าจะมีใครอยากใช้ `npm` แล้ว)

## Learn by doing
มาเรียนรู้โดยลองทำโปรเจคสั้นๆเล่นกันดูนะครับ โดยเราจะลองทำการเพิ่มฟังก์ชันง่ายๆให้ [lodash](https://github.com/lodash/lodash) กัน

คาดว่าทุกคนคงรู้จัก lodash นะครับ เป็น library สารพัดประโยชน์ แต่มันดันขาดฟังก์ชันนึงไปนั่นคือฟังก์ชัน **fizzbuzz** (เห็นคนชอบสอน TDD ด้วยตัวอย่างนี้สงสัยคงเป็นฟังก์ชันสำคัญแน่ๆ ทำไม lodash ไม่มีให้ใช้นะเลยต้องเพิ่มให้ซะหน่อย :P)

> **นิยาม:**
> **fizzbuzz** เป็นฟังก์ชันที่รับ array ของตัวเลขเข้ามา และจะแปลงตัวเลขแต่ละตัวใน array ให้เป็น string คำว่า "fizz" ถ้าหาร 3 ลงตัว, เป็นคำว่า "buzz" ถ้าหาร 5 ลงตัว, และเป็นคำว่า "fizzbuzz" ถ้าหารทั้ง 3 และ 5 ลงตัว กรณีนอกเหนือจากนี้ได้เป็น string ของตัวเลขเดิม เช่น `_.fizzbuzz([1,2,3,4,5,6,15,20])` จะถูกแปลงเป็น `['1','2','fizz','4','fuzz','6','fizzbuzz','20']` เป็นต้น

## ขั้นที่ 0 โครงสร้างโฟลเดอร์
หน้าตาโฟลเดอร์เราเดี๋ยวจะเป็นแบบนี้นะครับ
``` javascript
repo // โฟลเดอร์สำหรับเก็บโปรเจคต่างๆในเครื่องเรา
|-- lodash // เดี๋ยวเราจะ clone lodash มาไว้ตรงนี้
|-- try-fizzbuzz-lodash // โปรเจคของเราที่จะเรียกใช้ lodash
```

## ขั้นที่ 1 สร้างโปรเจค
ในโฟลเดอร์ `try-fizzbuzz-lodash` ทำการ init repo ด้วยคำส่ัง
`yarn init`
หลังจากนั้นลองติดตั้ง lodash ปกติก่อนด้วยคำสั่ง
`yarn add lodash`
ก็จะมีโฟลเดอร์ `try-fizzbuzz-lodash/node_modules/lodash` ขึ้นมาตามปกติให้เรียกใช้ได้

แล้วเราก็ลองสร้างไฟล์ `index.js` ขึ้นมาใน `try-fizzbuzz-lodash` ดังนี้
``` javascript
const _ = require('lodash') // import lodash เข้ามา
const nums = _.range(1, 21) // สร้าง array ของตัวเลขตั้งแต่ 1 ถึง 20

console.log(_.fizzbuzz(nums)) // แปลง array ให้เป็นค่า fizzbuzz
```
หลังจากนั้น save ไฟล์แล้วรัน
`node index.js`

ก็จะขึ้น error มาว่าตัว lodash ที่เราใช้ไม่มีฟังก์ชัน fizzbuzz
``` bash
console.log(_.fizzbuzz(nums))
              ^

TypeError: _.fizzbuzz is not a function
    at Object.<anonymous> (/path/to/repo/try-fizzbuzz-lodash/index.js:4:15)
```

โอเคเป็นไปตามที่คิด เพราะตัวต้นฉบับไม่มีฟังก์ชัน fizzbuzz อยู่

## ขั้นที่ 2 clone lodash
ในโฟลเดอร์  `repo` สั่ง

``` bash
git clone git@github.com:lodash/lodash.git
```

ก็จะได้โฟลเดอร์ lodash ต้นตำรับมา
(จริงๆแนะนำว่าให้ fork ไปเป็นของตัวเองก่อน แล้วค่อย clone เผื่ออีกหน่อยอยากส่ง pull request กลับไปหาต้นน้ำ)

เราจะทำการแก้ไข lodash ในโฟลเดอร์นี้กัน

## ขั้นที่ 3 yarn link
เข้าไปในโฟลเดอร์ `repo/lodash` แล้วสั่งคำสั่ง

``` bash
yarn link
```

คำสั่งนี้จะทำการ register node module ในโฟลเดอร์ที่สั่งคำสั่งเข้ากับ global registry ของเครื่อง local ที่เราใช้งาน เพื่อให้ project อื่นของเราเรียกใช้งานได้

## ขั้นที่ 4 yarn link package-name
กลับไปที่โฟลเดอร์ `repo/try-fizzbuzz-lodash` แล้วสั่งคำสั่ง

``` bash
yarn link lodash
```

คราวนี้เราจะทำการ link lodash ไปยังโฟลเดอร์ที่เรา register เอาไว้ในขั้นตอนก่อนหน้า

ลองตรวจสอบด้วยคำสั่ง `ls -l node_modules` จะแสดงให้เห็นว่า lodash ของเรากลายเป็น symbolic link ไปที่ yarn global registry ในเครื่องเราแล้ว
``` bash
$ ls -l node_modules
total 8
lrwxr-xr-x  1 ping  staff  33 Dec 10 20:44 lodash -> <path>/<to>/.yarn-cache/.link/lodash
```

## ขั้นที่ 5 แก้ไขโค้ด lodash
ที่เลือก lodash มาเพราะว่าการเพิ่มฟังก์ชันให้มันสามารถทำได้ง่ายมากเลย โดยแก้ในไฟล์ `repo/lodash/lodash.js`

ลองหาบรรทัดนี้
``` javascript
lodash.filter = filter;
lodash.flatMap = flatMap;
```
แล้วแทรก `lodash.fizzbuzz = fizzbuzz;` เข้าไป (จริงๆไว้ที่ไหนก็ได้ แบบนี้แค่จะได้เรียงลำดับอักษรเฉยๆ)
``` javascript
lodash.filter = filter;
lodash.fizzbuzz = fizzbuzz;
lodash.flatMap = flatMap;
```

คือเป็นการเพิ่ม property ชื่อ fizzbuzz ให้กับ lodash โดยชี้ไปยังฟังก์ชันที่ชื่อ fizzbuzz
ดังนั้นก็ให้เราเพิ่มฟังก์ชัน fizzbuzz ก็ไปต่อจากฟังก์ชัน filter เลยล่ะกัน
``` javascript
function filter(collection, predicate) {...}

function fizzbuzz(collection) {
  return collection.map(num =>
    (num % 3 === 0 ? 'fizz' : '') + (num % 5 === 0 ? 'buzz' : '')
    || String(num)
  )
}
```
โค้ดเขียนแบบสนุกๆโดยใช้ trick ของ javascript เล็กน้อย เอาเป็นว่าฟังก์ชันนี้ก็เช็ค fizzbuzz แบบปกตินั่นแหล่ะแล้ว return ค่าเป็น array ที่ element แต่ละตัวถูกแปลงค่าแล้ว (ไม่ขอลงรายละเอียดเพราะไม่ใช่ประเด็นของบทความนี้)

เมื่อเสร็จแล้วก็ลองไปที่โฟลเดอร์ `try-fizzbuzz-lodash` แล้วสั่งรัน `node index.js` อีกรอบนึงดูก็จะเห็นว่าสามารถเรียกใช้ lodash ที่อยู่ในเครื่อง local เราได้แล้ว!!!
``` bash
$ node index.js
[ '1',
  '2',
  'fizz',
  '4',
  'buzz',
  'fizz',
  '7',
  '8',
  'fizz',
  'buzz',
  '11',
  'fizz',
  '13',
  '14',
  'fizzbuzz',
  '16',
  '17',
  'fizz',
  '19',
  'buzz' ]
```

## ขั้นที่ 6 เปลี่ยนกลับไปใช้ lodash บน npm
สมมติว่าเราอยากกลับเปลี่ยนกลับไปใช้ lodash ดั้งเดิมบน npm เราสามารถยกเลิกการ link lodash บนเครื่อง local ได้โดยให้อยู่ที่โฟลเดอร์ `try-fizzbuzz-lodash` แล้วสั่ง

``` bash
yarn unlink lodash
```

แล้ว lodash ใน node_modules ของเราก็จะถูกลบไป แล้วให้ติดตั้ง lodash ตัวปกติด้วยคำสั่ง `yarn add lodash` ตามเดิม

ถ้าเกิดเราอยากลบ lodash ออกจาก local registry อย่างถาวรไม่ให้ใคร link ถึงได้อีกให้ไปที่โฟลเดอร์ `repo/lodash` ที่เรา clone มาแล้วสั่งคำสั่ง

``` bash
yarn unlink
```

เป็นอันเสร็จพิธี

## สรุป
คำสั่งที่ใช้ในการ link local package มีดังนี้ครับ
- `yarn link` ใน local package ที่เราจะใช้เพื่อ register กับ local registry
- `yarn link <package-name>` ในโปรเจคที่เราจะเรียกใช้ package ที่เรา link ไว้
- `yarn unlink <package-name>` เพื่อยกเลิกการใช้ตัวที่เรา link ไว้
- `yarn unlink` ใน local package เพื่อ unregister ออกจาก local registry

ขอให้สนุกกับการเขียนโปรแกรมครับ

Happy Hacking

ป.ล. ทิ้งท้ายสำหรับคนที่รอเรียนคอร์ส React กับทางทีม CodeSheep เดือนธันวานี้งานเข้าหนักหน่วง เลยคิดว่าจะเปิดสอนอีกทีเดือนมกราคมนะครับ ใครสนใจติดตามประกาศได้ที่เพจ [CodeSheep](https://www.facebook.com/codesheep/) นะครับ
