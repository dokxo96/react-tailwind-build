const Tokens = artifacts.require("NFTx");

module.exports = function (deployer) {
  deployer.deploy(Tokens);
};
