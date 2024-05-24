// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract ContactBook {
    address private owner;

    struct Contact {
        string name;
        uint256 age;
        string healthIssues;
        string prescribedMedicines;
        address wallet;
    }

    Contact[] private contacts;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function addContact(
        string memory _name,
        uint256 _age,
        string memory _healthIssues,
        string memory _prescribedMedicines,
        address _wallet
    ) public onlyOwner {
        contacts.push(Contact(_name, _age, _healthIssues, _prescribedMedicines, _wallet));
    }

    function removeContact(uint256 _index) public onlyOwner {
        require(_index < contacts.length, "Index out of bounds.");
        for (uint256 i = _index; i < contacts.length - 1; i++) {
            contacts[i] = contacts[i + 1];
        }
        contacts.pop();
    }

    function getContacts() public view returns (Contact[] memory) {
        return contacts;
    }

    function getPatientContact(string memory _name, uint256 _age) public view returns (Contact memory) {
        for (uint256 i = 0; i < contacts.length; i++) {
            if (keccak256(bytes(contacts[i].name)) == keccak256(bytes(_name)) && contacts[i].age == _age) {
                return contacts[i];
            }
        }
        revert("Patient record not found");
    }
}

