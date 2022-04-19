/* scripts/deploy.js */
const hre = require('hardhat');
const fs = require('fs');

async function main() {
  /* these two lines deploy the contract to the network */
  const Event = await hre.ethers.getContractFactory('Event');
  const event = await Event.deploy('DAO Events');

  await event.deployed();
  console.log('DAO Events deployed to:', event.address);

  /* this code writes the contract addresses to a local */
  /* file named config.js that we can use in the app */
  fs.writeFileSync(
    './config.js',
    `
  export const contractAddress = "${event.address}"
  export const ownerAddress = "${event.signer.address}"
  `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
