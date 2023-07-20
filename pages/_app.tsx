import type { AppProps } from "next/app";
import { ThirdwebProvider, coinbaseWallet, localWallet, metamaskWallet, paperWallet, smartWallet } from "@thirdweb-dev/react";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

// load the API key and factory address from environment variables
const thirdwebAPIKey = process.env.NEXT_PUBLIC_THIRDWEB_API_KEY as string;
const factoryAddress = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as string;
const gaslessURL = process.env.NEXT_PUBLIC_GASLESS_URL as string;
const paperWalletClientId = process.env.NEXT_PUBLIC_PAPER_KEY as string;
const emailWallet = paperWallet({
  paperClientId: paperWalletClientId
});
emailWallet.meta.name = "Email Wallet";
emailWallet.meta.iconURL = "https://cdn0.iconfinder.com/data/icons/apple-apps/100/Apple_Mail-512.png";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChain} 
    clientId={thirdwebAPIKey} 
    supportedWallets={[
    metamaskWallet(),
    coinbaseWallet(),
    emailWallet,
    localWallet({
          persist: true,
    }),
    // smartWallet({
    //         factoryAddress: factoryAddress, // Address of your account factory smart contract
    //         gasless: true,
    //         // add local wallet as option to EOA
    //         personalWallets: [
    //           localWallet({
    //             persist: true,
    //           }),
    //           emailWallet,
    //           metamaskWallet(),
    //           coinbaseWallet(),
    //         ],
    //       }),
      ]}
      // sdkOptions={{
      //   gasless: {
      //     openzeppelin: {
      //       relayerUrl: gaslessURL,
      //     }
      //   }
      // }}
      >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
