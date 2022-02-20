import "./App.css";
import Home from "./components/Home";
import Collections from "./components/Collections";
import Collection from "./components/Collection";
import GalleryState from "./context/GalleryState";
import WalletContext from "./context/WalletContext";
import NftDetails from "./components/NftDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useConnection, useWallet } from '@solana/wallet-adapter-react';
function App() {

  return (
    <>
      <BrowserRouter>
        <GalleryState>
          <WalletContext>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account/:acc" element={<Collections />} />
              <Route
                path="/account/:acc/collection/:collection_id"
                element={<Collection />}
              />
              <Route
                path="/account/:acc/:collection_id/sol/:mint"
                element={<NftDetails />}
              />
            </Routes>
          </WalletContext>
        </GalleryState>
      </BrowserRouter>
    </>
  );
}

export default App;
