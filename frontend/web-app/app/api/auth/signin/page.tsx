import EmptyFilter from '@/app/components/EmptyFilter';
import React from 'react';

const SignIn = async (props: { searchParams: Promise<{ callbackUrl: string }> }) => {
  const params = await props.searchParams
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
