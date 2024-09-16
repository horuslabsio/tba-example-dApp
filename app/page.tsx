"use client";
import React, { useState } from "react";
import { constants, Contract, RpcProvider } from "starknet";
import {
  connect,
  disconnect,
  TBAStarknetWindowObject,
} from "tokenbound-connectkit";
import { ABI } from "./utils/abi";

export default function page() {
  const [connection, setConnection] = useState<
    TBAStarknetWindowObject | null | undefined
  >(null);

  const [account, setAccount] = useState();
  const [address, setAddress] = useState("");
  const [retrievedValue, setRetrievedValue] = useState("");

  const contractAddress = "0x077e0925380d1529772ee99caefa8cd7a7017a823ec3db7c003e56ad2e85e300";

  const connectFn = async () => {
    try {
      const { wallet } = await connect({
        tokenboundOptions: {
          chainId: constants.NetworkName.SN_MAIN,
        },
      });
      setConnection(wallet);
      setAccount(wallet?.account);
      setAddress(wallet?.selectedAddress)
    } catch (e) {
      console.error(e);
      alert((e as any).message);
    }
  };

  const disconnectFn = async () => {
    await disconnect();
    setAddress("")
    setAccount(undefined)
    setConnection(null);
  };

  const increaseCounter = async () => {
    try {
      const contract = new Contract(ABI, contractAddress, account).typedv2(ABI);
      await contract.increment();
      alert("you successfully increased the counter");
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseCounter = async () => {
    try {
      const contract = new Contract(ABI, contractAddress, account).typedv2(ABI);
      await contract.decrement();
      alert("you sucessfully decreased the counter");
    } catch (error) {
      console.log(error);
    }
  };


  const getCounter = async () => {
    const provider = new RpcProvider({
      nodeUrl: "https://starknet-mainnet.public.blastapi.io",
    });
    try {
      const contract = new Contract(ABI, contractAddress, provider).typedv2(
        ABI
      );
      const counter = await contract.get_current_count();
      setRetrievedValue(counter.toString());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] space-y-5">
      {!connection ? (
        <button className="button px-5 py-3 bg-[#0C0C4F]" onClick={connectFn}>
          Connect Wallet
        </button>
      ) : (
        <button className="" onClick={disconnectFn}>
          Disconnect
        </button>
      )}

      <header className="">
        {address && (
          <p>
            <b>Address: {address}</b>
          </p>
        )}

        <div className="card py-5">
          <p className="py-5">Increase/Decrease Counter &rarr;</p>

          <div className="cardForm">
            <input
              type="submit"
              value="Increase"
              className="px-5 py-3 bg-[#0C0C4F] cursor-pointer"
              onClick={increaseCounter}
            />
            <input
              type="submit"
              value="Decrease"
              className="bg-red-500 px-5 py-3 cursor-pointer"
              onClick={decreaseCounter}
            />
          </div>

          <hr />
          <p className="pt-10 text-center">Get Counter &rarr;</p>

          <div className="cardForm pt-5 flex items-center justify-center">
            <input
              type="submit"
              className="button cursor-pointer px-5 py-3 bg-[#0C0C4F] rounded-lg"
              value="Get Counter"
              onClick={getCounter}
            />
            <p>{retrievedValue}</p>
          </div>
        </div>
      </header>
    </div>
  );
}
