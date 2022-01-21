import React, { useState } from "react"
import { ethers } from "ethers"

import Storage from "../abis/Storage.json"
import Header from "./Header"

const buttonStyle = "py-2 px-5 m-2 mt-5 bg-blue-600 rounded-2xl text-white hover:bg-blue-700"

const App = () => {
  const contractAddress = "0x220d2616E26C7549CEC6625e3AD2160971fdbE86"

  const [address, setAddress] = useState(null)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)
  const [value, setValue] = useState(null)

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

  const updateEthers = () => {
    let _provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(_provider)

    let _signer = _provider.getSigner()
    setSigner(_signer)

    let _contract = new ethers.Contract(contractAddress, Storage.abi, _signer)
    setContract(_contract)
  }

  const getVal = async () => {
    let val = await contract.get()
    setValue(val)
  }

  const setVal = async (event) => {
    event.preventDefault()
    contract.set(event.target.setText.value)
  }

  return(
    <div className="text-center">
      <Header connectWallet={connectWallet} address={address}/>
      <form onSubmit={setVal} autoComplete="off">
        <input id="setText" type="text" className="mt-3 border-2"/>
        <button type="submit" className={`py-1 ${buttonStyle}`}>Change Value</button>
      </form>
      <button onClick={getVal} className={buttonStyle}>Get current value</button>
      { value ?
        <p className="text-xl">{value}</p> : null
      }
    </div>
  )
}

export default App