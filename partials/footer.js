import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import { BsInstagram, BsLinkedin, BsTwitter, BsYoutube } from "react-icons/bs";

export default function Footer() {
  const footer = useRef(null);

  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <footer
      className="footer"
      ref={footer}
      style={
        router.pathname !== "/" &&
        router.pathname !== "/about" &&
        router.pathname !== "/blog"
          ? { display: "none" }
          : null
      }
    ></footer>
  );
}
