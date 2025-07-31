import { Buffer } from "buffer";
import process from "process";

window.Buffer = Buffer;
window.process = process;
import "./App.css";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';

import '@solana/wallet-adapter-react-ui/styles.css';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    
    // Add more if needed
} from "@solana/wallet-adapter-wallets";
import {
    WalletModalProvider,
   
} from '@solana/wallet-adapter-react-ui';
import CreateWalletPage from "./components/CreateWallet";
import GenerateMnemonic from "./components/GenerateMnemonic";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MainWallet from "./components/MainWallet";
import Navbar from "./components/common/Navbar";
import AccountPage from "./components/pages/AccountPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ConnectWallet from "./components/ConnectWallet";
import SetPassword from "./components/SetPassword";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const showNavbar = ["/home", "/main-wallet"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-black text-white">
      {showNavbar && <Navbar />}
      {children}
    </div>
  );
};
const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),

];
function App() {
  return (
 <ConnectionProvider endpoint={"https://solana-mainnet.g.alchemy.com/v2/Li1JYRU9rCvggRYHdOKmaYZ2MZ6ECCpI"}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/create-wallet" element={<CreateWalletPage />} />
                <Route path="/generate-mnemonic" element={<GenerateMnemonic />} />
                <Route path="/home" element={<HomePage />} />
                <Route
                  path="/main-wallet"
                  element={
                    <ProtectedRoute>
                     
                      <MainWallet />
                    </ProtectedRoute>
                  }
                />
                <Route path="/set-password" element={<SetPassword />} />
                <Route path="/account/:id" element={<AccountPage />} />
                <Route path="/connect-wallet" element={<ConnectWallet />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
