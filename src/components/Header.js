import React from "react"
import harmonyLogo from "../images/harmony-one-logo.svg"
import logo from "../images/logo.png"

const buttonStyle = "mx-4 py-2 px-5 bg-[#f7f7f7] text-gray-700 text-lg rounded-xl drop-shadow-lg hover:text-slate-900"

const Header = ({ connectWallet, address, chainId, bar, setBar }) => {
  const splitAddress = (address) => {
    let _address = address.substring(0,4) + "..." + address.substring(address.length - 3)
    return _address
  }

  const renderConnection = () => {
    if(address === null) {
      return <button onClick={connectWallet} className={buttonStyle}>Connect Wallet</button>
    }
    else if(chainId !== 1666700000) {
      return (
        <div className="flex items-top justify-end items-center">
          <button onClick={connectWallet} 
            className={"mx-4 py-2 px-5 bg-red-700 text-[#f7f7f7] text-lg rounded-xl drop-shadow-lg hover:text-[#f7f7f7] cursor-pointer"}
          >Wrong network</button>
          <p className={buttonStyle}>{splitAddress(address)}</p> 
        </div>
      )
    }
    else {
      return (
        <div className="flex items-top justify-end items-center">
          <img src={harmonyLogo} className={`w-12 px-3 py-3 ${buttonStyle}`}/>
          <a href={`https://explorer.pops.one/address/${address}`} target="_blank" 
            className={`cursor-pointer ${buttonStyle}`}
          >{splitAddress(address)}</a>
        </div>  
      )
    }
  }

  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-end w-1/3">
        <img src={logo} className="w-12"/>
      </div>

      { bar ? 
        <div className={`py-1 px-1 cursor-auto ${buttonStyle}`}>
          <button className={`bg-[#e3e3e3] py-1 mx-1 drop-shadow-none ${buttonStyle}`}>Get</button>
          <button onClick={() => setBar(false)} className={`py-1 mx-1 drop-shadow-none ${buttonStyle}`}>Set</button>
        </div> :
        <div className={`py-1 px-1 cursor-auto ${buttonStyle}`}>
          <button onClick={() => setBar(true)} className={`py-1 mx-1 drop-shadow-none ${buttonStyle}`}>Get</button>
          <button className={`bg-[#e3e3e3] py-1 mx-1 drop-shadow-none ${buttonStyle}`}>Set</button>
        </div>
      }

      <div className="flex w-1/3 justify-end">
         {renderConnection()}
      </div>
    </div>
  )
}

export default Header