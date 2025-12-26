const AccountDeletion = () => {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Account & Data Deletion Request</h1>

        <p style={styles.text}>
          Users may request deletion of their account and associated personal
          data by sending an email to:
        </p>

        <p style={styles.email}>support@ihs-solutions.com</p>

        <p style={styles.text}>
          <strong>Email Subject:</strong> Account Deletion Request
        </p>

        <p style={styles.text}>
          Please include your registered email address or phone number in the
          email so we can identify your account.
        </p>

        <p style={styles.text}>
          All requests are processed within <strong>7 business days</strong>.
        </p>
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
    marginBottom: "15px",
  },
};

export default AccountDeletion;
