import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComingSoon from "./components/ComingSoon";
import PaymentStatus from "./components/PaymentStatus";
import BarcodeInput from "./components/BarcodeInput";
import BarcodeScannerRedirect from "./components/BarcodeScannerRedirect";
import Terms from "./components/Terms";
import AccountDeletion from "./components/AccountDeletion";
import RefundPolicy from "./components/RefundPolicy";

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
        <Route path="*" element={<ComingSoon />} />
        <Route path="/" element={<ComingSoon />} />
        <Route path="/paymentStatus" element={<PaymentStatus />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/account-deletion" element={<AccountDeletion />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
