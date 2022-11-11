// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Certificate Contract
 * @dev Implements Certificate Generation
 */
contract CertificateContract {

    event CertificateWrite(address indexed issuedBy, address indexed issuedTo, string indexed id, Certificate certificate);

    struct Certificate {
        string id;
        string createdAt;
        string expireAt;
        address issuedBy;
        address issuedTo;
        string data;
    }

    mapping(string => Certificate) public certificates;

    function create(string memory id, string memory data, address issuedTo, string memory expireAt, string memory createdAt) public {
        Certificate memory c;
        c.createdAt = createdAt;
        c.expireAt = expireAt;
        c.issuedTo = issuedTo;
        c.issuedBy = msg.sender;
        c.data = data;
        c.id = id;
        certificates[id] = c;
        emit CertificateWrite(msg.sender, issuedTo, id, c);
    }
}