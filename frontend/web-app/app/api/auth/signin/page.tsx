import EmptyFilter from '@/app/components/EmptyFilter';
import React from 'react';

type SignInProps = Promise<{ callbackUrl: string }>

const SignIn = async (searchParams: SignInProps) => {
  const params = await searchParams
  const callbackUrl = params.callbackUrl;
  return (
    <>
      <EmptyFilter
        title='You need to be logged in to do that'
        subTitle='Please click below to login'
        showLogin
        callbackUrl={callbackUrl}
      />
    </>
  );
};

export default SignIn;
