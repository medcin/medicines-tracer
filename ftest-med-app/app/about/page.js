import React from 'react';
import NextLink from 'next/link';

export default function About() {
    return (
      <div>
        <h1>About Me</h1>
        <p>My name is John Doe and I'm a web developer.</p>
        <NextLink href="/">
          Home
        </NextLink>
      </div>
    );
  }