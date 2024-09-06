
"use client"
import { connect, StarknetWindowObject, } from "tokenbound-connector"
import React, { useState } from 'react'
import { constants} from "starknet"


export default function page() {

  const [connectedWallet, setWallet] = useState<StarknetWindowObject | null | undefined>(null)

  const contractAddress =
  '0x077e0925380d1529772ee99caefa8cd7a7017a823ec3db7c003e56ad2e85e300';

  const connectFn = async () => {
    try {
      const { wallet } = await connect({
        tokenboundOptions: {
          chainId: constants.NetworkName.SN_SEPOLIA,
        }
      });

    } catch (e) {
      console.error(e)
      alert((e as any).message)
    }
  }

  return (
    <div className='flex  flex-col gap-10 items-center justify-center h-[100vh]'>
      <p>{connectedWallet?.name}</p>
      <button className='bg-orange-600 py-3 px-6 text-white  cursor-pointer' onClick={connectFn}>Starknetkit</button>
    </div>
  )
}

