
# Certifier Dapp - Decentralized and Secured Certification System using Blockchain

Certifier Dapp is a web application built on the Ethereum blockchain that allows users to issue, update, verify and track the change history of certificates. It is built using Web3, Ethers.js, Truffle, and Solidity for the backend and React.js for the frontend. It demonstrates the power and potential of blockchain technology in the field of certification.

## Features

- Signin with Ethereum Wallet (MetaMask)
- Issue New Certificate
- Update Issued Certificates
- Verify Issued Certificates
- Track Change history of Issued Certificates


## Authors

- [@aachal01](https://www.github.com/aachal01)
- [@jhasuraj01](https://www.github.com/jhasuraj01)


## Tech Stack

#### Web3
- [Ethers.js](https://docs.ethers.io)
- [Truffle](https://trufflesuite.com/docs/)
- [Solidity](https://soliditylang.org/)

#### Frontend
- [React.js](https://reactjs.org)
- [React Router](https://reactrouter.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
## Environment Setup

- Download and install the latest node and npm from https://nodejs.org/en/download/
- Download and install Visual Studio Code from https://code.visualstudio.com/
- Download and install Ganache from https://trufflesuite.com/ganache/
    - Create new Workspace
    - Link this project to workspace
    - Update port number to 8545
    - ![Ganache Setup](https://user-images.githubusercontent.com/95211796/201491935-87f8d7cb-254e-40ff-aaae-290d25134be8.png)

- Install Truffle `npm install truffle -g`
- Link Metamask to Local Blockchain network created by Ganache

## Run Locally

Clone the project

```bash
  git clone https://github.com/aachal01/certifier-dapp.git
```

Go to the project directory

```bash
  cd certifier-dapp
```

Install dependencies

```bash
  npm install
```

Deploy Smart Contract locally

```bash
  npm run contract:deploy
```

Start the server

```bash
  npm run start
```


## Screenshots

Link MetaMask Account
![image](https://user-images.githubusercontent.com/95211796/201492972-eb48fcad-4dc0-4f36-b90a-7c5ce95d3a2b.png)

View all the Issued Certificates by You!
![image](https://user-images.githubusercontent.com/95211796/201492912-30767f59-dbe6-4b48-880b-288ff630ce84.png)

Create New Certificate
![image](https://user-images.githubusercontent.com/95211796/201493658-e29db623-9fed-45d4-9e8b-4a9f89e8c4df.png)

Update Issued Certificate
![image](https://user-images.githubusercontent.com/95211796/201493733-2d0d3a6f-c9d3-4a38-9e1b-d9ba53152b5e.png)

Verify Certificate and view Change History
![image](https://user-images.githubusercontent.com/95211796/201493785-5bfecdd4-8a63-4217-bdb6-ca4b6b8a3abd.png)

Transactions Preview in Ganache
![Ganache Transactions Screenshots](https://user-images.githubusercontent.com/95211796/201492047-fb8dba47-ae70-4163-8ad3-bf193191126e.png)

Deployed Smart Contract
![Ganache Smart Contract Screenshots](https://user-images.githubusercontent.com/95211796/201492116-f163e22e-a9e7-400b-abbd-291780756fec.png)


## Appendix

This project was created as a semester course work for the Blockchain Honor Degree at Pimpri Chinchwad College Of Engineering.
