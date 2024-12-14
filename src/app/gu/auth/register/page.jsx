'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!/^\d+$/.test(phoneNumber)) newErrors.phoneNumber = "Phone number must contain only digits";
    if (!password) newErrors.password = "Password is required";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, phoneNumber, password }),
    });
    if (res.status === 201) {
      const data = await res.json();
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        router.push("/");
      }
    } else {
      alert(`Login failed: ${res.statusText}`);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1>Create New Account</h1>
        
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          style={styles.input}
        />
        {errors.username && <span style={styles.error}>{errors.username}</span>}

        <label>Phone Number</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          style={styles.input}
        />
        {errors.phoneNumber && <span style={styles.error}>{errors.phoneNumber}</span>}

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={styles.input}
        />
        {errors.password && <span style={styles.error}>{errors.password}</span>}

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          style={styles.input}
        />
        {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword}</span>}

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
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
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "0.8rem",
  },
};
