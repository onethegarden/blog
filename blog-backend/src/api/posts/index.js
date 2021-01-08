import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);

//:id를 위한 경로
const post = new Router();
post.get('/:id', postsCtrl.checkObjectId, postsCtrl.read);
post.delete('/:id', postsCtrl.checkObjectId, postsCtrl.remove);
post.patch('/:id', postsCtrl.checkObjectId, postsCtrl.update);

//해당 라우터들을 등록
posts.use('/:id', postsCtrl.checkObjectId, post.routes());


export default posts; 