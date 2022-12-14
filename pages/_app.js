import "../styles/config.scss";
import "@rainbow-me/rainbowkit/styles.css";
import Script from "next/script";
import Header from "partials/header";
import Footer from "partials/footer";
// next & rainbow auth provider
import { SessionProvider } from "next-auth/react";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";

// rainbowkit
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";

// wagmi methods
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from "wagmi";

// wagmi providers
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

// configure chains & providers with the Alchemy and Infura provider.
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }),
  publicProvider(),
]);

// rainbowkit wagmi connectors
const { connectors } = getDefaultWallets({
  appName: "SM Lotto",
  chains,
});

// initialize web3 client
const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session}>
          <RainbowKitSiweNextAuthProvider>
            <RainbowKitProvider chains={chains} theme={darkTheme()}>
              <Component {...pageProps} />
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </WagmiConfig>

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

      <Header />
      <Footer />
    </>
  );
}

export default MyApp;
