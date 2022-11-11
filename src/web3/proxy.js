import { ethers } from "ethers";
import { v4 as uuidv4 } from 'uuid';
import CertificateContract from './contracts/CertificateContract.json';
const contractAddress = CertificateContract.networks[5777].address
const abi = CertificateContract.abi

class Web3Proxy {
    provider = null
    contract = null
    signer = null
    isConnected = false;

    async connect() {
        this.provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);
        this.signer = provider.getSigner()
        this.contract = new ethers.Contract(contractAddress, abi, signer);
        this.isConnected = this.provider && this.signer && this.contract;
    }

    async createCertificate(data) {
        const certificate = {
            id: uuidv4(),
            data,
            issuedTo: data.issuedTo,
            expireAt: new Date(data.expireAt).toISOString(),
            createdAt: new Date(data.createdAt).toISOString(),
        }

        const tx = await this.contract.functions.create(
            certificate.id,
            certificate.data,
            certificate.issuedTo,
            certificate.expireAt,
            certificate.createdAt,
        )
        console.log("tx: ", tx);

        const receipt = await tx.wait();
        console.log("receipt: ", receipt);

        return certificate;
    }

    async getCertificateById(id) {
        if(!this.isConnected)
            await this.connect()

        const filter = await contract.filters.CertificateWrite(
            null,
            null,
            id.current.value,
            null
        );
    
        const entries = await contract.queryFilter(filter)

        return entries.map(entry => ({
            id: entry.args.certificate.id,
            data: JSON.parse(entry.args.certificate.data),
            issuedTo: entry.args.certificate.issuedTo,
            expireAt: new Date(entry.args.certificate.expireAt),
            createdAt: new Date(entry.args.certificate.createdAt),
        }));
    }

    async getCertificateByIssuer(address) {
        if(!this.isConnected)
            await this.connect()

        const filter = await contract.filters.CertificateWrite(
            address,
            null,
            null,
            null
        );
    
        const entries = await contract.queryFilter(filter)

        const certificates = entries.map(entry => ({
            id: entry.args.certificate.id,
            data: JSON.parse(entry.args.certificate.data),
            issuedTo: entry.args.certificate.issuedTo,
            expireAt: new Date(entry.args.certificate.expireAt),
            createdAt: new Date(entry.args.certificate.createdAt),
        }));

        return certificates;
    }
}

const web3proxy = new Web3Proxy()

export default web3proxy;