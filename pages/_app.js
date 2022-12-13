import "../styles/config.scss";
import { useRouter } from "next/router";
// import Header from "partials/header";
// import Footer from "partials/footer";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";
import Header from "partials/header";
import Footer from "partials/footer";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const firstMount = useRef(false);

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/Flip.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/ScrollTrigger.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/ScrollToPlugin.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/TextPlugin.min.js"
        strategy="beforeInteractive"
      ></Script>
      <Footer />
    </>
  );
}

export default MyApp;
