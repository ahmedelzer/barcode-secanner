import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountDeletion from "./components/AccountDeletion";
import BarcodeInput from "./components/BarcodeInput";
import ComingSoon from "./components/ComingSoon";
import PaymentStatus from "./components/PaymentStatus";
import RefundPolicy from "./components/RefundPolicy";
import Terms from "./components/Terms";
import LocationMap from "./components/LocationMap";

function App() {
  return (
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
      <Route path="/displayMap" element={<LocationMap />} />
      <Route path="/account-deletion" element={<AccountDeletion />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
    </Routes>
  );
}

export default App;
