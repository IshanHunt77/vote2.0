// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Vote {

    event AdminCreated(string name);
    event PollerCreated(string name);

    struct Admin {
        address adminAddress;
        string name;
    }
    
    struct PollCreator {
        address pollerAddress;
        string name;
    }

    struct Voter {
        address voter;
        string name;
    }

    mapping(address => mapping(uint => uint)) public pollAddrToCandidateID;
    mapping(address => mapping(address => bool)) public Voted; // Tracks votes per poll for each address
    mapping(address => bool) public AdminAddress;

    Admin[] public admins;
    PollCreator[] public pollers;
    Voter[] public voters;

    modifier onlyAdmin() {
        require(AdminAddress[msg.sender], "Caller is not an admin");
        _;
    }

    function createAdmin(string memory name) public {
        admins.push(Admin(msg.sender, name));
        AdminAddress[msg.sender] = true;
        emit AdminCreated(name);
    }

    function createPollers(string memory name) public {
        pollers.push(PollCreator(msg.sender, name));
        emit PollerCreated(name);
    }

    function votes(string memory name, address poll, uint Id) public {
        if (!AdminAddress[msg.sender]) {
            require(!Voted[poll][msg.sender], "You have already voted in this poll");
        }
        voters.push(Voter(msg.sender, name));
        Voted[poll][msg.sender] = true;
        pollAddrToCandidateID[poll][Id]++;
    }

    function getAllvotes(address poll, uint Id) public view returns (uint) {
        return pollAddrToCandidateID[poll][Id];
    }
}
