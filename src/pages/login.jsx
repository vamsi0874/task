
import { CardWrapper } from '../components/CardWrapper';
import { LoginForm } from '../components/login-form';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <CardWrapper
          headerLabel="Welcome Back"
          backButtonLabel="Don't have an account?"
          backButtonHref="/signup"
        >
          <LoginForm />
        </CardWrapper>
      </div>
    </div>
  );
};

export default LoginPage;
