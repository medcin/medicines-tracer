import React from 'react';
import NextLink from 'next/link';

export default function Signup() {
    return (
      <div>
        <h1>Sign up</h1>
        {/* Signup form goes here */}
        <NextLink href="/">
          Home
        </NextLink>
      </div>
    );
  }