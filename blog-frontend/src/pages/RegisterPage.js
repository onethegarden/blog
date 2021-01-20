import React from 'react';
import AuthTemplateBlock from '../components/auth/AuthTemplate';
import RegisterForm from '../containers/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthTemplateBlock>
      <RegisterForm />
    </AuthTemplateBlock>
  );
};

export default RegisterPage;
