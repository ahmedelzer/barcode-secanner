import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComingSoon from "./components/ComingSoon";
import PaymentStatus from "./components/PaymentStatus";
import BarcodeInput from "./components/BarcodeInput";
import BarcodeIframe from "./components/BarcodeIframe";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="*" element={<ComingSoon />} />
        <Route path="/" element={<ComingSoon />} />
        <Route path="/paymentStatus" element={<PaymentStatus />} /> */}
        <Route
          path="/scanBarcode"
          element={<BarcodeInput handleDetected={() => {}} />}
        />
        <Route path="/" element={<BarcodeIframe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
