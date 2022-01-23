import React, { useState } from "react"
import { ethers } from "ethers"

import Storage from "../abis/Storage.json"
import Header from "./Header"

const contractAddress = "0x220d2616E26C7549CEC6625e3AD2160971fdbE86"
const buttonStyle = "mx-4 py-2 px-5 bg-[#35fbab] text-lg rounded-xl text-[#f7f7f7] drop-shadow-lg hover:bg-[#7cf7cc] cursor-pointer"


const App = () => {
  const [address, setAddress] = useState(null)
  const [provider, setProvider] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)

  const [value, setValue] = useState(null)
  const [bar, setBar] = useState(true)

  const connectWallet = () => {
    if(window.ethereum) {    
      window.ethereum.request({method: "eth_requestAccounts"})
      .then(accounts => {
        setAddress(accounts[0])
        updateEthers()
      })
    } else {
      alert("Install Metamask")
    }
  }

  const updateEthers = async () => {
    let _provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(_provider)

    let _network = await _provider.getNetwork()
    let _chainId = _network.chainId
    setChainId(_chainId)

    let _signer = _provider.getSigner()
    setSigner(_signer)

    let _contract = new ethers.Contract(contractAddress, Storage.abi, _signer)
    setContract(_contract)
  }

  const check = () => {
    if(address === null) {
      alert("Connect Metamask")
      return false
    }
    else if(chainId !== 1666700000) {
      return false
    }
    return true
  }

  const getVal = async () => {
    if(check()) {
      let val = await contract.get()
      setValue(val)
    }
  }

  const setVal = async (event) => {
    event.preventDefault()
    if(check()) {
      contract.set(event.target.setText.value)
    }
  }

  return(
    <div className="flex flex-col min-h-screen text-center gradient-bg">
      <Header connectWallet={connectWallet} address={address} chainId={chainId} bar={bar} setBar={setBar}/>

      <div className="flex flex-grow justify-center pt-10">
        { bar ?
          <div className="flex flex-col justify-between items-center w-1/3 h-40 p-2 bg-[#f7f7f7] rounded-xl shadow-xl">
            <div className="flex flex-grow items-center justify-center w-full rounded-xl bg-[#e3e3e3]">
              <p className="text-2xl text-gray-700">{value}</p>
            </div>
            <button onClick={getVal} className={`w-full mt-2 shadow-none ${buttonStyle}`}>Get current value</button>
          </div>
          :
          <form 
            onSubmit={setVal} autoComplete="off" 
            className="flex flex-col justify-between items-center w-1/3 h-40 p-2 bg-[#f7f7f7] rounded-xl shadow-xl"
          >
            <div className="flex flex-grow items-center justify-center w-full rounded-xl bg-[#e3e3e3]">
              <input id="setText" type="text" placeholder="string" 
                className="w-full h-1/2 m-2 text-2xl text-gray-700 bg-[#e3e3e3] focus:outline-none"
              />
            </div>
            <button type="submit" className={`w-full mt-2 shadow-none ${buttonStyle}`}>Set value</button>
          </form>
        }
      </div>
    </div>
  )
}

export default App