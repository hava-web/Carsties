'use client'
import { Button } from 'flowbite-react';
import React from 'react';
import { signIn } from 'next-auth/react';

const LoginButton = () => {
    return (
        <>
            <Button outline onClick={() => signIn(
                'id-server',
                { callbackUrl: '/' },
                { prompt: 'login' }
            )}>
                Login
            </Button>
            {/* <Button outline onClick={() => signIn(
                'google',
                { redirectTo: '/' }
            )}>
                Login
            </Button> */}
            {/* <Button outline onClick={() => signIn(
                'facebook',
                { callbackUrl: '/' },
                { prompt: 'login' }
            )}>
                Login
            </Button> */}
        </>
    )
}

export default LoginButton;