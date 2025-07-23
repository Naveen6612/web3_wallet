import "./App.css";

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

function App() {
  return (
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
  );
}

export default App;
