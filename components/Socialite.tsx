"use client";
import React from "react";
import FacebookLoginButton from "./FacebookLoginButton";

export default function Socialite() {
  return (
    <div className="flex flex-col gap-4">
      <FacebookLoginButton />
    </div>
  );
}