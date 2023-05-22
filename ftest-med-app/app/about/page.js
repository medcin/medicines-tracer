import React from 'react';
import NextLink from 'next/link';

export default function About() {
    return (
      <div>
        <h1>About Medicine tracker</h1>
        <p>This application will track your medicines</p>
        <NextLink href="/">
          Home
        </NextLink>
      </div>
    );
  }