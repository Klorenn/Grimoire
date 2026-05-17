const { expect } = require("chai");

describe("GrimoireRegistry", function () {
  let registry;
  let owner;
  let other;

  beforeEach(async function () {
    [owner, other] = await hre.ethers.getSigners();
    const Factory = await hre.ethers.getContractFactory("GrimoireRegistry");
    registry = await Factory.deploy();
    await registry.waitForDeployment();
  });

  it("should create an inscription correctly", async function () {
    const tx = await registry.createInscription(
      "bafybeig7xvk3m9p2nqf4z8",
      "seed-phrase",
      "0xabc123"
    );
    await tx.wait();

    const myInscriptions = await registry.getMyInscriptions();
    expect(myInscriptions.length).to.equal(1);
    expect(myInscriptions[0].cid).to.equal("bafybeig7xvk3m9p2nqf4z8");
    expect(myInscriptions[0].kind).to.equal("seed-phrase");
    expect(myInscriptions[0].owner).to.equal(owner.address);
  });

  it("should return inscriptions for the caller", async function () {
    await registry.createInscription("cid-1", "note", "0x1");
    await registry.createInscription("cid-2", "letter", "0x2");
    const mine = await registry.getMyInscriptions();
    expect(mine.length).to.equal(2);
  });

  it("should support multiple users", async function () {
    await registry.createInscription("cid-owner", "note", "0x1");
    await registry.connect(other).createInscription("cid-other", "document", "0x2");
    const ownerInscriptions = await registry.getMyInscriptions();
    const otherInscriptions = await registry.connect(other).getMyInscriptions();
    expect(ownerInscriptions.length).to.equal(1);
    expect(otherInscriptions.length).to.equal(1);
  });

  it("should fail with empty CID", async function () {
    try {
      await registry.createInscription("", "note", "0x1");
      expect.fail("Should have reverted");
    } catch (e) {
      expect(e.message).to.include("CID cannot be empty");
    }
  });

  it("should fail with empty kind", async function () {
    try {
      await registry.createInscription("cid-1", "", "0x1");
      expect.fail("Should have reverted");
    } catch (e) {
      expect(e.message).to.include("Kind cannot be empty");
    }
  });
});
