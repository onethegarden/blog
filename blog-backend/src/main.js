require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
//import createFakeData from './createFakeData';

const api = require('./api');

//비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT , MONGO_URI} = process.env;

//mongoose로 데이터베이스 연결
mongoose
.connect(MONGO_URI, { useNewUrlParser : true, useFindAndModify: false})
.then(()=>{
  console.log('Connected to MongoDB');
  //createFakeData(); //fakedata만들기
}).catch(e => {
  console.error(e)
})

const app = new Koa();
const router = new Router();

//라우터 설정
router.use('/api', api.routes()); //api라우트 적용

//라우터 적용 전에 bodyParser적용
app.use(bodyParser());

//app인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

//포트 지정되어 있지 않다면 4000사용
const port = PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
