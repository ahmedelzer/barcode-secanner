import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const BarcodeInput = ({ handleDetected }) => {
  const [barcodeValue, setBarcodeValue] = useState("");
  const [error, setError] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState(null);

  const html5QrCodeRef = useRef(null);
  const scannerId = "html5qr-code-full-region";

  // Get cameras when component mounts
  useEffect(() => {
    async function loadCameras() {
      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices.length === 0) {
          setError("No cameras found on this device.");
          return;
        }
        setCameras(devices);
        setSelectedCameraId(devices[0].id); // start with first camera
      } catch (err) {
        console.error("Error getting cameras:", err);
        setError("Unable to access camera list. Check browser permissions.");
      }
    }
    loadCameras();
  }, []);

  // Start scanner whenever camera changes
  useEffect(() => {
    if (!selectedCameraId) return;
    const html5QrCode = new Html5Qrcode(scannerId);
    html5QrCodeRef.current = html5QrCode;
    setError(null);

    async function startScanner() {
      try {
        await html5QrCode.start(
          { deviceId: { exact: selectedCameraId } },
          {
            fps: 10,
            qrbox: { width: 250, height: 150 },
            aspectRatio: 1.7778,
          },
          (decodedText) => {
            console.log("✅ Detected:", decodedText);
            setBarcodeValue(decodedText);
            if (handleDetected) handleDetected(decodedText);
          }
        );
      } catch (err) {
        console.error("❌ Failed to start scanner:", err);
        if (err?.name === "NotAllowedError") {
          setError("Camera access denied. Please allow camera permissions.");
        } else if (err?.message?.includes("getUserMedia")) {
          setError(
            "Camera not supported in this browser. Try HTTPS or another browser."
          );
        } else {
          setError(
            "Unable to start camera. Check permissions or device settings."
          );
        }
      }
    }

    startScanner();

    return () => stopScanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCameraId]);

  const stopScanner = async () => {
    const reader = html5QrCodeRef.current;
    if (reader) {
      try {
        await reader.stop();
        await reader.clear();
        console.log("[STOP] Scanner stopped.");
      } catch (err) {
        console.error("[ERROR] While stopping scanner:", err);
      }
    }
  };

  const handleCameraChange = async (id) => {
    if (id === selectedCameraId) return;
    await stopScanner();
    setSelectedCameraId(id);
  };
  // ✅ Test value after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const testValue = "TEST-12345";
      setBarcodeValue(testValue);
      console.log("✅ Test value set:", testValue);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (barcodeValue) {
      if (window.opener) {
        window.opener.postMessage(
          { type: "BARCODE_SCANNED", barcodeValue },
          "*"
        );
      }

      // ✅ Optionally redirect back to HTTP page
      // const params = new URLSearchParams(window.location.search);
      // const returnUrl = params.get("return");
      // if (returnUrl) {
      //   window.location.href = `${returnUrl}?code=${barcodeValue}`;
      // }
    }
  }, [barcodeValue]);
  return (
    <div className="flex flex-col items-center p-4">
      {/* Live camera preview */}
      {!error && (
        <div
          id={scannerId}
          className="border-2 border-gray-300 rounded-md w-[320px] h-[240px]"
        ></div>
      )}

      {/* Error message */}
      {error && (
        <div className="text-red-600 text-sm mt-3 text-center max-w-xs">
          ⚠ {error}
        </div>
      )}

      {/* Footer: Camera switcher */}
      {cameras.length > 1 && (
        <div className="mt-4 flex flex-wrap justify-center gap-2 border-t pt-3 w-full max-w-sm">
          {cameras.map((cam) => (
            <button
              key={cam.id}
              onClick={() => handleCameraChange(cam.id)}
              className={`px-3 py-1 rounded-md text-sm border transition ${
                selectedCameraId === cam.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {cam.label || `Camera ${cam.id.slice(-4)}`}
            </button>
          ))}
        </div>
      )}
      <div className=" tex-lg">{barcodeValue}</div>
    </div>
  );
};

export default BarcodeInput;
