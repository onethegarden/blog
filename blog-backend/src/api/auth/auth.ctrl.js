import Joi from 'joi';
import User from '../../models/user';

//회원가입
/*
POST /api/auth/register
{
    username : 'velopert',
    password : 'mypass123'
}
*/
export const register = async (ctx) => {
  //Request Body 검증
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    //username존재하는지 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; //Conflict
      return;
    }

    const user = new User({
      username,
    });
    await user.setPassword(password); //비밀번호 설정
    await user.save(); //db저장

    //응답할 데이터 hashedpassword 필드 제거
    ctx.body = user.serialize(); 
  } catch (e) {
    ctx.throw(500, e);
  }
};
//로그인
export const login = async (ctx) => {};
//로그인상태확인
export const check = async (ctx) => {};
//로그아웃
export const logout = async (ctx) => {};
