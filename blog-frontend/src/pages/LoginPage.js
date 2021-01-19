import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthForm from '../components/auth/AuthForm';

const LoginPage = () => {
  return (
    <div>
      <AuthTemplate>
        <AuthForm type = "login"/>
      </AuthTemplate>
    </div>
  );
};

export default LoginPage;
