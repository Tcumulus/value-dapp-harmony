import React from "react"

const buttonStyle = "py-2 px-5 bg-blue-600 rounded-2xl text-white hover:bg-blue-700"

const Header = ({ connectWallet, address }) => {
  return (
    <div className="flex justify-between m-2">
      { address ?     
        <div className="flex flex-grow items-top justify-between">
          <button onClick={connectWallet} className={buttonStyle}>Wallet Connected</button>
          <p className="text-sm text-gray-700">{address}</p>
        </div>
      : 
        <button onClick={connectWallet} className={buttonStyle}>Connect Wallet</button> 
      }
    </div>
  )
}

export default Header