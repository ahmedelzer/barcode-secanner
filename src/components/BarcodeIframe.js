import React, { useEffect, useState } from "react";

const BarcodeScannerRedirect = () => {
  const [scannedValue, setScannedValue] = useState("");

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "BARCODE_SCANNED") {
        setScannedValue(event.data.barcodeValue); // ✅ correct key
        console.log("✅ Received from scanner:", event.data.barcodeValue);
        window.focus(); // bring main window to front
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // // ✅ Test value after 2 seconds
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     const testValue = "TEST-12345";
  //     setScannedValue(testValue);
  //     console.log("✅ Test value set:", testValue);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  const goToScanner = () => {
    window.open(
      "https://ihs-solutions.com:7552/scanbarcode",
      "scannerPopup",
      "width=400,height=600"
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Scan a Barcode</h2>

      <button
        onClick={goToScanner}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Open Secure Scanner
      </button>

      <div style={{ marginTop: "20px" }}>
        <strong>Scanned Value:</strong> {scannedValue || "Waiting..."}
      </div>
    </div>
  );
};

export default BarcodeScannerRedirect;
