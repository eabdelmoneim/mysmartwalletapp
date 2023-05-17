import { ConnectWallet, Web3Button, useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const address = useAddress();

  if (!address) return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50vw",
        height: "75vh",
      }}
    >
  
  <ConnectWallet btnTitle="Login" modalTitle="Login"/> 
  </div>);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50vw",
        height: "75vh",
      }}
    >
      <ConnectWallet/>
      <Web3Button
        contractAddress="0x83ff7D5f97eCF44c66066622018bC9DCa652a7f1"
        action={(contract) => contract.erc721.claim(1)}
        onSuccess={() => alert("Claimed!")}
      >
        Claim OE NFT!
      </Web3Button>

    </div>
  );
};

export default Home;