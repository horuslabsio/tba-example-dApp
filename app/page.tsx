"use client";
import React, { useState } from "react";
import { constants } from "starknet";
import {
  connect,
  disconnect,
  TBAStarknetWindowObject,
} from "tokenbound-connectorkit";

export default function page() {
  const [connectedWallet, setWallet] = useState<
    TBAStarknetWindowObject | null | undefined
  >(null);

  const contractAddress =
    "0x077e0925380d1529772ee99caefa8cd7a7017a823ec3db7c003e56ad2e85e300";

  const connectFn = async () => {
    try {
      const { wallet } = await connect({
        tokenboundOptions: {
          chainId: constants.NetworkName.SN_SEPOLIA,
        },
      });
      setWallet(wallet);
    } catch (e) {
      console.error(e);
      alert((e as any).message);
    }
  };

  const disconnectFn = async () => {
    await disconnect();
    setWallet(null)

  };


  console.log(connectedWallet?.account)

  return (
    <div className="flex  flex-col gap-10 items-center justify-center h-[100vh]">
      {connectedWallet?.isConnected && (
        <div>
          <p>{connectedWallet?.name}</p>
          <p>{connectedWallet?.selectedAddress}</p>
        </div>
      )}
      <button
        className="bg-orange-600 py-3 px-6 text-white  cursor-pointer"
        onClick={connectedWallet?.isConnected ? disconnectFn : connectFn}
      >
        {connectedWallet?.isConnected ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
}
