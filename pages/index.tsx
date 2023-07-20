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
        width: "35vw",
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
      </Web3Button>&nbsp;
      
      <button className={styles.button} onClick={openModal}>Buy with Card</button>
      <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
      {<CheckoutWithCard 
      configs={{
        // Registered contract ID
        contractId: "a8d97610-eecd-4408-820f-00d8df0dd092",
        // Buyer wallet address
        walletAddress: address,
        title: "Buy with Credit Card",
        contractArgs: {
          tokenId: 0,
        },
        // mintMethod: {
        //   name: "claim",
        //   args: {
        //     _receiver: address,
        //     _tokenId: 0,
        //     _quantity: "$QUANTITY",
        //     _currency: ,
        //   },
        //   payment: { 
        //     value: "0.1 * $QUANTITY",
        //     currency: "ETH"
        //   }
        // }, 
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