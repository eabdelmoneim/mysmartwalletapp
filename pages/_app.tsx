import type { AppProps } from "next/app";
import { ThirdwebProvider, coinbaseWallet, localWallet, metamaskWallet, smartWallet } from "@thirdweb-dev/react";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

// load the API key and factory address from environment variables
const thirdwebAPIKey = process.env.NEXT_PUBLIC_THIRDWEB_API_KEY as string;
const factoryAddress = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as string;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChain}
    supportedWallets={[
        smartWallet({
          factoryAddress: factoryAddress, // Address of your account factory smart contract
          thirdwebApiKey: thirdwebAPIKey, // The API key you got from the previous step
          gasless: true,
          // add local wallet as option to EOA
          personalWallets: [
            localWallet({
              persist: true,
            }),
            metamaskWallet(),
            coinbaseWallet(),
          ],
        }),
      ]}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
