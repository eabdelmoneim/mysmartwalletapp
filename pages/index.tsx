import { ConnectWallet, SmartContract, Web3Button, useAddress } from "@thirdweb-dev/react";
import {CheckoutWithCard} from "@paperxyz/react-client-sdk"
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import ReactModal from "react-modal";
import { useState } from "react";

const Home: NextPage = () => {
  const address = useAddress();
  const [modalIsOpen, setIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '500px', // Set the width
      height: '500px', // Set the height
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
        width: "45vw",
        height: "75vh",
      }}
    >
      <ConnectWallet/>
      <Web3Button
        contractAddress={process.env.NEXT_PUBLIC_OE_CONTRACT_ADDRESS as string}
        action={(contract) => contract.erc721.claim(1)}
        onSuccess={() => alert("Claimed!")}
      >
        Claim OE NFT!
      </Web3Button>&nbsp;
      
      <button className={styles.button} onClick={openModal}>Buy with Card</button>
      <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
      {<CheckoutWithCard 
      configs={{
        // Registered contract ID
        contractId: process.env.NEXT_PUBLIC_PAPER_CONTRACT_ID as string,
        // Buyer wallet address
        walletAddress: address,
        title: "Buy with Credit Card",
        contractArgs: {
          tokenId: 0,
        },
      }
    }
      onPaymentSuccess={(result) => {
        alert("Payment successful: " + result.transactionId);
      }}
      options={{
        colorBackground: '#fefae0',
        colorPrimary: '#606c38',
        colorText: '#283618',
        borderRadius: 6,
        inputBackgroundColor: '#faedcd',
        inputBorderColor: '#d4a373',
      }}
    /> }
    </ReactModal>

  </div>  
  );
};

export default Home;