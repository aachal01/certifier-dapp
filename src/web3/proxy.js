import { ethers } from "ethers";
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import CertificateContract from './contracts/CertificateContract.json';
const contractAddress = CertificateContract.networks[5777].address
const abi = CertificateContract.abi

class Web3Proxy {
    provider = null
    contract = null
    signer = null
    isConnected = false;
    account = { address: '', balance: ''}

    async connect() {
        this.provider = new ethers.providers.Web3Provider(window.ethereum)
        await this.provider.send("eth_requestAccounts", []);
        this.signer = this.provider.getSigner()
        this.contract = new ethers.Contract(contractAddress, abi, this.signer);
        this.isConnected = this.provider && this.signer && this.contract;
        await this.getAccount()
    }

    async getAccount() {
        if(!this.isConnected) {
            toast.info("Connect Your Account to Continue!")
            this.account = { address: '', balance: ''}
            return this.account
        }

        const address = await this.signer.getAddress()
        const balance = ethers.utils.formatEther(await this.signer.getBalance())
    
        return this.account = { address, balance }
    }

    async createCertificate(data, id) {
        if(!this.isConnected) {
            toast.info("Connect Your Account to Continue!")
            return []
        }

        const certificate = {
            id: id || uuidv4(),
            data,
            issuedTo: data.issuedTo,
            expireAt: new Date(data.expireAt).toISOString(),
            createdAt: new Date(data.createdAt).toISOString(),
        }

        const tx = await this.contract.functions.create(
            certificate.id,
            JSON.stringify(certificate.data),
            certificate.issuedTo,
            certificate.expireAt,
            certificate.createdAt,
        )
        const receipt = await tx.wait();

        return certificate;
    }

    async getCertificateById(id) {
        if(!this.isConnected) {
            toast.info("Connect Your Account to Continue!")
            return []
        }

        const filter = await this.contract.filters.CertificateWrite(
            null,
            null,
            id,
            null
        );
    
        const entries = await this.contract.queryFilter(filter)

        return entries.map(entry => ({
            id: entry.args.certificate.id,
            data: JSON.parse(entry.args.certificate.data),
            issuedTo: entry.args.certificate.issuedTo,
            issuedBy: entry.args.certificate.issuedBy,
            expireAt: new Date(entry.args.certificate.expireAt),
            createdAt: new Date(entry.args.certificate.createdAt),
        }));
    }

    async getCertificateByIssuer(address) {
        if(!this.isConnected) {
            toast.info("Connect Your Account to Continue!")
            return []
        }

        const filter = await this.contract.filters.CertificateWrite(
            address,
            null,
            null,
            null
        );
    
        const entries = await this.contract.queryFilter(filter)

        let certificates = entries.map(entry => ({
            id: entry.args.certificate.id,
            data: JSON.parse(entry.args.certificate.data),
            issuedTo: entry.args.certificate.issuedTo,
            issuedBy: entry.args.certificate.issuedBy,
            expireAt: new Date(entry.args.certificate.expireAt),
            createdAt: new Date(entry.args.certificate.createdAt),
        }));

        const set = new Set()
        certificates.reverse()

        certificates = certificates.filter(c => {
            if(!set.has(c.id)) {
                set.add(c.id)
                return true
            }
            return false
        })

        return certificates;
    }
}

const web3proxy = new Web3Proxy()

export default web3proxy;