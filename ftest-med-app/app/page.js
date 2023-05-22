import React from "react";
import NextLink from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to my Next.js app!</h1>
      <NextLink href="/about">About</NextLink>
      <NextLink href="/login">, login</NextLink>
      <NextLink href="/signup">, signup</NextLink>
    </div>
  );
}
