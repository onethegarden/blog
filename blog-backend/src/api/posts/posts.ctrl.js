import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';

//object 검증
const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; //Bad Request
    return;
  }
  return next();
};

/*
POST /api/posts
{
    title:'제목',
    body:'내용',
    tags:['태그', '태그2']
}
*/
export const write = async ctx => {
  const schema = Joi.object().keys({
    //객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });
  //검증하고 나서 검증 실패한 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { title, body, tags } = ctx.request.body;
  //포스트의 인스턴스 만들 때는 new 사용
  const post = new Post({
    title,
    body,
    tags,
  });

  try {
    await post.save(); //save로 데이터베이스에 저장
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
 GET /api/posts
*/
export const list = async (ctx) => {
  try {
    //find() 함수를 호출 한 뒤에는 exec()를 붙여주어야 서버에 쿼리 요청 가능
    const posts = await Post.find().exec();
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
 GET /api/posts/:id
*/
export const read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
 DELLETE /api/posts/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; //No Content (성공, 응답할 데이터x);
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
 PATCH /api/posts/:id
{
    title:'제목',
    body:'내용',
    tags:['태그', '태그2']
}
*/
export const update = async (ctx) => {
  const { id } = ctx.params;
  //write에서 사용한 schema와 비슷, required가 없음
  const schema = Joi.object().keys({
      title: Joi.string(),
      body: Joi.string(),
      tags: Joi.array().items(Joi.string()),
  });
  //검증
  const result = schema.validate(ctx.request.body);
  if(result.error){
      ctx.status = 400;
      ctx.body = result.error;
      return;
  }
  
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, //이 값을 설정하면 업데이트된 데이터 반환
      //false 일 때는 업데이트 되기 전 데이터 반환
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
