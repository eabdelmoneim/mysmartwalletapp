import type { AppProps } from "next/app";
import { ThirdwebProvider,embeddedWallet, metamaskWallet} from "@thirdweb-dev/react";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "arbitrum-goerli";

// load the API key and factory address from environment variables
const thirdwebAPIKey = process.env.NEXT_PUBLIC_THIRDWEB_API_KEY as string;
const factoryAddress = process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS as string;
const gaslessURL = process.env.NEXT_PUBLIC_GASLESS_URL as string;
const paperWalletClientId = process.env.NEXT_PUBLIC_PAPER_KEY as string;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChain} 
    clientId={thirdwebAPIKey} 
    supportedWallets={[
     metamaskWallet(),
    embeddedWallet(),
    // smartWallet(emailWallet,{
    //         factoryAddress: factoryAddress, // Address of your account factory smart contract
    //         gasless: true,
    //       }),
      ]}
      sdkOptions={{
        gasless: {
          engine: {
            relayerUrl: gaslessURL,
          }
        }
      }}
      >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
