// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Storage {
  string public storedData;
  event updateEvent(string eventOutput);

  function set(string memory text) public {
    storedData = text;
    emit updateEvent(text);
  }

  function get() public view returns (string memory) {
    return storedData;
  }
}