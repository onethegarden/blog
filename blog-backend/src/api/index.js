import Router from 'koa-router' ; //라우트 모듈화
import posts from'./posts';

const api = new Router();

api.use('/posts', posts.routes());

api.get('/test', ctx => {
    ctx.body = 'test 성공';
})

//라우터 내보내기
module.exports = api;