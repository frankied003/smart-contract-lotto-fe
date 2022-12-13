import { useEffect, useRef } from "react";
import Head from "next/head";

export default function Custom404() {
  const dude = useRef(null);
  const textRowRef = useRef(null);

  useEffect(() => {
    const dots = textRowRef.current.querySelectorAll(".dot");

    const tl = gsap.timeline();

    tl.fromTo(
      dude.current,
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.75,
        ease: "power4.inOut",
      }
    ).fromTo(
      dots,
      {
        opacity: 0,
      },
      {
        stagger: 0.2,
        opacity: 1,
        ease: "power4.inOut",
      }
    );
  }, []);

  return (
    <div className="page404">
      <Head>
        <title>SM Lotto - 404</title>
        <meta name="description" content="SM Lotto, winner takes all." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="wrapper">
        <div className="center-wrapper">
          <div className="text-row" ref={textRowRef}>
            <h2 className="dude" ref={dude}>
              This is not a page
            </h2>
            <h2 className="dot">.</h2>
            <h2 className="dot">.</h2>
            <h2 className="dot">.</h2>
          </div>
        </div>
      </section>
    </div>
  );
}
