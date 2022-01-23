// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Storage {
  string public storedData;

  function set(string memory text) public {
    storedData = text;
  }

  function get() public view returns (string memory) {
    return storedData;
  }
}