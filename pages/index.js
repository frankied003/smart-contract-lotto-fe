import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";

// WAGMI
import contractData from "../contractData.json";
import { useContractReads } from "wagmi";
import { ethers } from "ethers";

// Auth
import { useSession } from "next-auth/react";

// Scripts
import CustomConnectButton from "components/connectButton";

export default function Home() {
  // Auth
  const { data: session } = useSession();

  // Animation refrences

  // States
  const [status, setStatus] = useState("");
  const [lotteryNumber, setLotteryNumber] = useState(null);
  const [currentPotAmount, setCurrentPotAmount] = useState(0);
  const [lastWinnerAddress, setLastWinnerAddress] = useState("");
  const [entryFee, setEntryFee] = useState(0.01);
  const [amountOfEntries, setAmountOfEntries] = useState(0);
  const [loadingContract, setLoadingContract] = useState(true);

  const lotteryStatusMap = {
    0: "Closed",
    1: "Open",
    2: "Calculating Winner",
  };

  // WAGMI States
  const lotteryContract = {
    address: contractData.address,
    abi: contractData.abi,
    chainId: 5,
  };

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...lotteryContract,
        functionName: "getLotteryNumber",
      },
      {
        ...lotteryContract,
        functionName: "lottery_state",
      },
      {
        ...lotteryContract,
        functionName: "getPotAmount",
      },
      {
        ...lotteryContract,
        functionName: "winners",
        args: -1,
      },
    ],
    onSuccess(data) {
      console.log("Success", data);
      setLotteryNumber(data[0].toString());
      setStatus(lotteryStatusMap[data[1]]);
      setCurrentPotAmount(ethers.utils.formatEther(data[2].toString()));
      setAmountOfEntries(
        Math.ceil(ethers.utils.formatEther(data[2].toString()) * 100)
      );
      setLastWinnerAddress(data[3]);
      setLoadingContract(false);
    },
  });

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
            {loadingContract ? (
              <div className="pot-enter-container">
                <p>Loading...</p>
              </div>
            ) : (
              <>
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
                  <button
                    className={
                      session?.address
                        ? status == "Closed" || status == "Calculating Winner"
                          ? "enter-button disabled"
                          : "enter-button"
                        : "enter-button disabled"
                    }
                    disabled={session?.address ? false : true}
                  >
                    Enter
                  </button>
                  <p className="subtext">
                    {session?.address
                      ? status == "Closed" || status == "Calculating Winner"
                        ? "Lottery is currently not open, please wait for the next one."
                        : null
                      : "Please connect your wallet."}
                  </p>
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
                        {lastWinnerAddress?.substring(0, 4)}...
                        {lastWinnerAddress?.substring(
                          lastWinnerAddress.length - 4
                        )}
                      </strong>
                    </a>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
