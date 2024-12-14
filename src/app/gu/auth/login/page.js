'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.status === 200) {
      const data = await res.json();
      if (data) {
        localStorage.setItem("user", JSON.stringify(data.user));
        // router.push("/");
        window.location.href = "/";

      }
    } else {
      const data = await res.json();
      alert(`Login failed: ${data.error}`);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert("Please contact ADMIN");
  };

  return (
    <div style={styles.container}>
      <div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1>Login</h1>

          <label>Phone Number</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            style={styles.input}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={styles.input}
          />

          <div style={styles.buttonContainer}>
            <span onClick={handleForgotPassword} style={styles.forgotLink}>
              Forgot Password
            </span>
            <button type="submit" style={styles.loginButton}>
              Login
            </button>
          </div>
        </form>

        <hr />

        <Link href="/gu/auth/register">
          <button style={styles.registerButton}>Create Account</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "300px",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
  },
  forgotLink: {
    color: "#0070f3",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "0.9rem",
    paddingTop: "0.5rem",
  },
  loginButton: {
    padding: "0.4rem 1rem",
    fontSize: "0.9rem",
    borderRadius: "4px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  registerButton: {
    display: "block",
    marginTop: "1rem",
    width: "100%",
    padding: "0.5rem",
    fontSize: "0.9rem",
    borderRadius: "4px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};
