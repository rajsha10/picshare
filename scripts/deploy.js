const hre = require("hardhat");

async function main() {
  console.log("Starting deployment script...");

  const Upload = await hre.ethers.getContractFactory("Upload");

  console.log("Deploying Upload contract...");

  // Deploy the contract
  const upload = await Upload.deploy();
  await upload.deployed();

  console.log("Upload contract deployed successfully!");
  console.log("Contract Address:", upload.address);

  if (hre.network.name !== "hardhat") {
    console.log(`Network: ${hre.network.name}`);
    console.log("Waiting for deployment confirmations...");

    await upload.deployTransaction.wait(5);

    try {
      await hre.run("verify:verify", {
        address: upload.address,
        constructorArguments: [],
      });
      console.log("Contract verified on AiaScan!");
    } catch (verifyError) {
      console.log("Verification failed:", verifyError);
    }
  }
}

// Execute the main function and handle any errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
