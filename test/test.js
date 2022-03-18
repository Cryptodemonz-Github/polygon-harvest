const Harvest = artifacts.require("Harvest");
const xLLTH = artifacts.require("xLLTH");
const Web3 = require("web3");
const truffleAssert = require("truffle-assertions");

contract("Harvest", async (accounts) => {
  let harvest;
  let llth;

  beforeEach(async () => {
    llth = await xLLTH.new();
    harvest = await Harvest.new(llth.address);

    const web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:9545")
    );

    // literally passing random address, it doesnt matters
    harvest.setCollection(harvest.address, true);
    harvest.setFee(web3.utils.toWei("0.01", "ether"));
  });

  it("success scenarios", async () => {
    await harvest.payFee({
      from: accounts[1],
      value: web3.utils.toWei("0.01", "ether"),
    });

    await harvest.harvest(harvest.address, 200, accounts[1], {
      from: accounts[0],
    });

    let balance;
    await llth.balanceOf(accounts[1]).then((res) => {
      balance = web3.utils.fromWei(res.toString(), "ether");
    });

    assert.equal(balance, 200);

    await harvest.setManager(accounts[1], true, { from: accounts[0] });
  });

  it("fail scenarios", async () => {
    await truffleAssert.fails(
      harvest.harvest(harvest.address, 200, accounts[1], { from: accounts[0] }),
      truffleAssert.ErrorType.REVERT
    );

    await harvest.payFee({
      from: accounts[1],
      value: web3.utils.toWei("0.01", "ether"),
    });
    await harvest.harvest(harvest.address, 200, accounts[1], {
      from: accounts[0],
    });

    await truffleAssert.fails(
      harvest.harvest(harvest.address, 200, accounts[1], { from: accounts[0] }),
      truffleAssert.ErrorType.REVERT
    );

    await truffleAssert.fails(
      harvest.setFee(10, { from: accounts[1] }),
      truffleAssert.ErrorType.REVERT
    );
  });
});
