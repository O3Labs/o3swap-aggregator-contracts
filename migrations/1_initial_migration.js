const Migrations = artifacts.require("Migrations");

module.exports = function (deployer, network, accounts) {
    if (network.includes("mainnet")) {
        return;
    }

    deployer.deploy(Migrations);
};
