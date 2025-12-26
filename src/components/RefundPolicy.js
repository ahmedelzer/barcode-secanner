const RefundPolicy = () => {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Refund Policy</h1>

        <p style={styles.text}>
          All purchases made through the Google Play Store are subject to Google
          Play’s refund policies.
        </p>

        <p style={styles.text}>
          If you believe a purchase was made in error, you may request a refund
          directly through your Google Play account within the time frame
          allowed by Google.
        </p>

        <p style={styles.text}>
          For questions or assistance regarding refunds, please contact us at:
        </p>

        <p style={styles.email}>support@ihs-solutions.com</p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
    padding: "60px 16px",
  },
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "15px",
  },
  email: {
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default RefundPolicy;
