// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import  './ERC1155.sol';

contract Membership  is ERC1155 {
  
  mapping(uint256 => MembershipDetails) private _membershipDetails;

  struct MembershipDetails
  {
    address author;
    string membershipType;    
    uint256 membershipCount;
  }

  uint256 public TokenCounter;
  address private owner;

  constructor() ERC1155("https://www.drums-alive.com/wp-content/uploads/2019/11/Membership.jpeg") {
    TokenCounter = 0;
    owner = msg.sender;
  }

  function publish(string memory membershipType, uint256 _count) 
    public 
  {
    uint256 newTokenId = TokenCounter+1;
    _membershipDetails[newTokenId].author = msg.sender;
    _membershipDetails[newTokenId].membershipType = membershipType;
    _membershipDetails[newTokenId].membershipCount = _count;
    _mint(msg.sender, newTokenId,_count, "");
    TokenCounter += 1;
  } 

  function Approve(address operator)
    public 
  {
    require(operator != msg.sender);
    setApprovalForAll(operator, true);
  }

  function purchaseFromAuthor(uint256 TokenId, uint256 _numOfMembership)
    public
  {
    safeTransferFrom(_membershipDetails[TokenId].author, msg.sender, TokenId, _numOfMembership, "");
  }  

  function TypeOfMembership(uint256 membershipId) 
    public view 
    returns (string memory)   
  {
    return (_membershipDetails[membershipId].membershipType);
  }

  function TotalCountOfMembers(uint256 membershipId) 
    public view 
    returns(uint256) 
  {
    return (_membershipDetails[membershipId].membershipCount);
  }

  function AuthorOfMembership(uint membershipId)
    public view
    returns (address)
  {
    return (_membershipDetails[membershipId].author);
  }
}
