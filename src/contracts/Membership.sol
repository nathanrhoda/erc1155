// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import  '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';

contract Membership  is ERC1155 {
  
  mapping(uint256 => MembershipDetails) private _membershipDetails;

  struct MembershipDetails
  {
    address author;
    string membershipType;    
    uint256 membershipCount;
  }

  uint256 public TokenCounter;

  constructor() ERC1155("https://") {
    TokenCounter = 0;
  }

  function publish(string memory membershipType, uint256 _count) public {
    uint256 newTokenId = TokenCounter+1;
    _membershipDetails[newTokenId].author = msg.sender;
    _membershipDetails[newTokenId].membershipType = membershipType;
    _membershipDetails[newTokenId].membershipCount = _count;
    _mint(msg.sender, newTokenId,_count, "");
    TokenCounter += 1;
  } 
}
