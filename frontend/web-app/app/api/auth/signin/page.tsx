import EmptyFilter from '@/app/components/EmptyFilter';
import React from 'react';

const SignIn = ({ searchParams }: { searchParams: { callbackUrl: string } }) => {
  const callbackUrl = searchParams.callbackUrl ?? '';
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
