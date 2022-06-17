import { ethers } from "ethers";

async function main() {
  const [deployer] = await ethers.getSigners();

  const Poll = ethers.getContractFactory("Poll");
  const poll = Poll.deploy();

  console.log("Poll Deployed", poll.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
