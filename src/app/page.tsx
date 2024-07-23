"use client"

import Image from "next/image";
import Logo from "../assets/logo.png"
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("here")
      window.location.pathname += "/login"
    }, 2000)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Image src={Logo} alt="Bubble Punch logo" width={240}></Image>
      <h1 className="text-yellow-400 font-black text-6xl animate-customFadein">Bubble Punch</h1>
    </main>
  );
}
