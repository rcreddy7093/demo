"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "./header.module.css";
import { useRouter } from 'next/navigation';

export default function Header({ name }) {
  const [user,setUser]=useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login state
  const menuRef = useRef(null);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    setIsLoggedIn(false); // Update state
    router.push("/");

  };

  useEffect(() => {
    // Check if user is stored in localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setUser(user);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); // Runs once on component mount

  // Close the menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

  return (
    <nav className={styles.navbar}>
      {/* Left section with Home and About links */}
      <div className={styles.left}>
        {isLoggedIn && <button className={styles.navButton}>Profile</button>
      }
        <Link href="/">
          <button className={styles.navButton}>Home</button>
        </Link>
        <Link href="/gu">
          <button className={styles.navButton}>Dashboard</button>
        </Link>
        <Link href="/gu/about">
          <button className={styles.navButton}>About</button>
        </Link>
      </div>

      {/* Scrollable welcome message */}
      <div className={styles.scrollContainer}>
        <h1 className={styles.scrollText}>{name}</h1>
      </div>

      {/* Right section with Login/Logout button */}
      <div className={styles.right}>
        {isLoggedIn ? (
          <button className={styles.navButtonLogOut} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link href="/gu/auth/login">
            <button className={styles.navButtonLogIn}>Login</button>
          </Link>
        )}
      </div>

      {/* Hamburger icon for mobile screens */}
      <button className={styles.menuIcon} onClick={toggleMenu}>
        &#9776; {/* Hamburger icon */}
      </button>

      {/* Dropdown menu in mobile view */}
      {menuOpen && (
        <div className={styles.dropdownMenu} ref={menuRef}>
          <Link href="/">
            <button className={styles.navButton} onClick={toggleMenu}>
              Home
            </button>
          </Link>
          <Link href="/gu">
            <button className={styles.navButton}  onClick={toggleMenu}>Dashboard</button>
          </Link>
          <Link href="/gu/about">
            <button className={styles.navButton} onClick={toggleMenu}>
              About
            </button>
          </Link>
          {isLoggedIn ? (
            <button className={styles.navButtonLogOut} onClick={() => { handleLogout(); toggleMenu(); }}>Logout</button>
          ) : (
            <Link href="/gu/auth/login">
              <button className={styles.navButtonLogIn} onClick={toggleMenu}>
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
