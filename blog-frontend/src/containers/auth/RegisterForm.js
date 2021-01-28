import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  //인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { username, password, passwordConfirm } = form;
    //하나라도 비어있다면
    if([username, password, passwordConfirm].includes('')){
      setError('빈 칸을 모두 입력하세요');
      return;
    }
    //비밀번호가 일치x
    if(password !== passwordConfirm){
      setError('비밀번호가 일치하지 않습니다');
      changeField({form: 'register', key: 'password', value:''})
      changeField({form: 'register', key: 'passwordConfirm', value:''})
      return;
    }
    dispatch(register({ username, password }));
  };

  //컴포넌트가 처음 렌더링 될 때 폼을 초기화
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  //회원가입 성공/실패처리
  useEffect(() => {
    if (authError) {
      console.log('오류발생');
      console.log(authError);
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  //user값이 잘 성정되었는지 확인
  useEffect(() => {
    if (user) {
      console.log('check API성공');
      console.log(user);
      history.push('/'); //홈 화면으로 이동
    }
  }, [history, user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterForm);
