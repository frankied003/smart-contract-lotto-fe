import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";

// Icon imports

// Scripts
import useScrollPosition from "../scripts/useScrollPosition";

export default function Home() {
  // Scripts
  const scrollPosition = useScrollPosition();

  // Animation refrences

  // States

  // animation useEffects
  useEffect(() => {}, []);

  return (
    <div className="home">
      <Head>
        <title>SM Lotto</title>
        <meta name="description" content="SM Lotto, winner takes all." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>SM Lotto</h1>
      </main>
    </div>
  );
}
