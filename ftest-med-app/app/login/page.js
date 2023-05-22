import React from 'react';
import NextLink from 'next/link';


export default function Login() {
    return (
      <div>
        <h1>Login</h1>
        {/* Login form goes here */}
        <NextLink href="/">
          Home
        </NextLink>
      </div>
    );
  }