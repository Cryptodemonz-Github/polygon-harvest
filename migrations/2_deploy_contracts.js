const Harvest = artifacts.require("Harvest");
const xLLTH = artifacts.require("xLLTH");

module.exports = async function (deployer) {
    await deployer.deploy(xLLTH).then( async res => {
        await deployer.deploy(Harvest, res.address)
    })
  };