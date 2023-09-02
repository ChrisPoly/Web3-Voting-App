// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Contestant {
        string name;
        uint256 voteCount;
    }

    Contestant[] public Contestants;
    address owner;
    mapping(address => bool) public voters;

    constructor(string[] memory _countryNames) {
        for (uint256 i = 0; i < _countryNames.length; i++) {
            Contestants.push(Contestant({
                name: _countryNames[i],
                voteCount: 0
            }));
        }
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function addContestant(string memory _name) public onlyOwner {
        Contestants.push(Contestant({
                name: _name,
                voteCount: 0
        }));
    }

    function vote(uint256 _ContestantId) public {
        require(!voters[msg.sender], "You have already voted.");
        require(_ContestantId < Contestants.length, "Invalid Contestant ID.");

        Contestants[_ContestantId].voteCount++;
        voters[msg.sender] = true;
    }

    function getAllVotesOfContestantNames() public view returns (Contestant[] memory){
        return Contestants;
    }
}
