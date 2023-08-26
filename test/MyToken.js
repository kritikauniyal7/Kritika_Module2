const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("This is a test for my MyToken", () => {
  let owner, addr1, MyToken, signer;

  before("Deploy the contract instance first", async () => {
    const MyTokenFactory = await ethers.getContractFactory("MyToken");
    MyToken = await MyTokenFactory.deploy();

    [owner, addr1] = await ethers.getSigners();
  });

  it("Should get the owner's name", async () => {
    const name = await MyToken.ownerName();
    assert.equal(name, "Kritika");
  });

  it("should get the owner's balance", async () => {
    const bal = await MyToken.ownerBal();
    const balance = await ethers.provider.getBalance(owner.address);
    assert.equal(bal.toString(), balance.toString());
  });

  it("Should transfer ether to the owner", async () => {
    const contractConnect = MyToken.connect(addr1);

    const transferTx = await contractConnect.transferOwner({
      value: ethers.utils.parseEther("10"),
    });

    await expect(transferTx)
      .to.emit(MyToken, "Transaction")
      .withArgs("Transaction successful!!");
  });

  it("Should get an error for 0 ethers", async () => {
    const contractConnect = MyToken.connect(addr1);

    await expect(
      contractConnect.transferOwner({
        value: ethers.utils.parseEther("0"),
      })
    ).to.be.revertedWith("Amount should be more than 0");
  });
});
