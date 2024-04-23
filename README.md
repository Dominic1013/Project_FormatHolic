# FormatHolic

![FormatHolic](https://github.com/Dominic1013/Project_FormatHolic/assets/129192292/9acc9ce6-e187-4ce1-8d52-95e81c20d701)

> 此專案是專門提供給為編排隊形所苦惱的人們所使用的 Web App，具有兩種模式：籃球戰術版模式、編舞模式。
> 目前開發中，僅提供籃球戰術版部分功能。

- [線上觀看連結](https://mern-formatholic-client.vercel.app/)

## 功能

測試帳號密碼

```bash
帳號： exampleName
密碼： exampleName11
```

- [x] 登入
- [x] 登出
- [x] 使用籃球戰術版模式
- [x] 創建戰術版
- [x] 操作戰術版
- [x] 儲存戰術版
      ...

## 畫面

> 以下畫面為 首頁、創建戰術版、操作戰術版

![home](https://github.com/Dominic1013/Project_FormatHolic/assets/129192292/ea31a03a-5d71-4ccb-ad8c-89aa86f4653e)
![formatSetting](https://github.com/Dominic1013/Project_FormatHolic/assets/129192292/44bcb7ab-45d5-4957-bb87-9aee4b0b43f3)
![formatBasketball](https://github.com/Dominic1013/Project_FormatHolic/assets/129192292/684ddf6f-c5ae-437f-8330-c61df4e135c7)

## 安裝

> 請務必依據你的專案來調整內容。

以下將會引導你如何安裝此專案到你的電腦上。

本專案Node.js 版本為：`21.6.1`

### 取得專案

```bash
git clone https://github.com/Dominic1013/Project_FormatHolic.git
```

### 移動到專案內

```bash
cd project_formatholic
```

### 安裝套件

```bash
cd Client
npm install
cd ..
cd Server
npm install
```

### 環境變數設定

前端環境的 .env 檔請添加：
localhost可依據電腦環境自行設定。
```bash
REACT_APP_API_URL= "http://localhost:5001/api/"
```

後端環境的 .env 檔需要申請 mongoDB 服務

```bash
TOKEN_SECRET = 你的密鑰

PORT = 5001
# 按照本地port改變

MONGODB_URL = 你的MongoDB_URL
```

### 運行專案

前端

```bash
npm start
```

後端

```bash
npm start
```

## 專案技術
- "@cloudinary/react": "^1.12.0",
- "@cloudinary/url-gen": "^1.16.1",
- "@reduxjs/toolkit": "^2.0.1",
- "@testing-library/jest-dom": "^5.17.0",
- "@testing-library/react": "^13.4.0",
- "@testing-library/user-event": "^13.5.0",
- "axios": "^1.6.5",
- "cloudinary": "^2.0.1",
- "formik": "^2.4.5",
- "immer": "^10.0.3",
- "konva": "^9.3.2",
- "query-string": "^8.1.0",
- "react": "^18.2.0",
- "react-dom": "^18.2.0",
- "react-icons": "^4.12.0",
- "react-konva": "^18.2.10",
- "react-redux": "^9.1.0",
- "react-router-dom": "^6.21.1",
- "react-scripts": "5.0.1",
- "redux": "^5.0.1",
- "redux-persist": "^6.0.0",
- "sass": "^1.69.7",
- "swiper": "^11.0.5",
- "use-image": "^1.1.1",
- "web-vitals": "^2.1.4",
- "yup": "^1.3.3"

- "axios": "^1.6.7",
- "cookie-parser": "^1.4.6",
- "cors": "^2.8.5",
- "dotenv": "^16.4.1",
- "express": "^4.18.2",
- "express-validator": "^7.0.1",
- "jsonwebtoken": "^9.0.2",
- "mongoose": "^8.0.3",
- "node": "^21.6.1",
- "nodemon": "^3.0.3"

## 第三方服務

- cloudinary
- mongoDB Atlas



## 聯絡作者


你可以透過以下方式與我聯絡：

- email: dominic.huang1013@gmail.com
- [個人網站](https://iamdominic.vercel.app/)
