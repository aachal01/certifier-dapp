const CertificateContract = artifacts.require("CertificateContract");

module.exports = (deployer) => {
    deployer.deploy(CertificateContract);
}