import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";

// Auth
import { useSession } from "next-auth/react";

// Scripts
import useScrollPosition from "../scripts/useScrollPosition";
import CustomConnectButton from "components/connectButton";

export default function Home() {
  // Auth
  const { data: session } = useSession();

  // Scripts
  const scrollPosition = useScrollPosition();

  // Animation refrences

  // States
  const [status, setStatus] = useState("Closed");
  const [lotteryNumber, setLotteryNumber] = useState(1);
  const [currentPotAmount, setCurrentPotAmount] = useState(3.2);
  const [lastWinnerAddress, setLastWinnerAddress] = useState(
    "0x8C2b8CB9D10FCC2feE2fDe9927556904ECc926c1"
  );
  const [entryFee, setEntryFee] = useState(0.1);
  const [amountOfEntries, setAmountOfEntries] = useState(32);

  // animation useEffects
  useEffect(() => {}, []);

  return (
    <div>
      <Head>
        <title>SM Lotto</title>
        <meta name="description" content="SM Lotto, winner takes all." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="home">
        <div className="header-flex-row">
          <div className="logo-title-container">
            <div className="logo-container">
              <Image
                src="/assets/logo/smlogo.png"
                alt="SM Lotto Logo"
                layout="fill"
              />
            </div>
            <h2>SM Lotto</h2>
          </div>
          <CustomConnectButton />
        </div>
        <div className="content-container">
          <div className="modal-container">
            <div className="top-flex-row">
              <p className="lottery-status">
                Lottery Status: <strong>{status}</strong>
              </p>
              <p className="lottery-number">Lottery #{lotteryNumber}</p>
            </div>
            <div className="pot-enter-container">
              <p className="pot">
                Current Pot:{" "}
                <span className="pot-amount">{currentPotAmount}</span>
                eth
              </p>
              <button className="enter-button">Enter</button>
            </div>
            <div className="bottom-flex-row">
              <div className="lotto-info">
                <p>
                  Entry Fee: <strong>{entryFee}</strong>eth
                </p>
                <p>
                  Entries: <strong>{amountOfEntries}</strong>
                </p>
              </div>
              <p className="last-winner">
                Last Winner:{" "}
                <a
                  href={`https://etherscan.io/address/${lastWinnerAddress}`}
                  target="#"
                >
                  <strong>
                    {lastWinnerAddress.substring(0, 4)}...
                    {lastWinnerAddress.substring(lastWinnerAddress.length - 4)}
                  </strong>
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
