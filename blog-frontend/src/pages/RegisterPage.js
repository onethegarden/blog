import React from 'react';
import AuthForm from '../components/auth/AuthForm';
import AuthTemplateBlock from '../components/auth/AuthTemplate';

const RegisterPage = () => {
  return (
    <AuthTemplateBlock>
      <AuthForm />
    </AuthTemplateBlock>
  );
};

export default RegisterPage;
