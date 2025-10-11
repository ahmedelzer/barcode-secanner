import React from "react";

function PaymentStatus() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-5xl text-green-400 font-bold mb-8">Payment Status</h1>
      <p className="text-white text-lg mb-8">
        Your payment has been successfully processed! 🎉
      </p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
      >
        Go Back
      </a>
    </div>
  );
}

export default PaymentStatus;
