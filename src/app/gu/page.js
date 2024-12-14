"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Check for user role in local storage
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user); // Parse the stored JSON string
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid user data:", error);
        alert("Invalid user data. Please login again!");
        router.push("/gu/auth/login");
      }
    } else {
      alert("Please login to continue!");
      router.push("/gu/auth/login");
    }
  }, [router]);

  return (
    <div>
      <h2 className="alignCenter">Dashboard</h2>

      <div className="grid" >
        {/* Show Contributions link for Super Admin */}
        {user.role === "SUPERADMIN" && (
            <Link href="/gu/contribution" className="card"> <h2>Contributions</h2></Link>
        )}
        {/* Show Users link for Super Admin and Admin */}
        {(user.role === "SUPERADMIN" || user.role === "ADMIN") && (
            <Link href={{ pathname: "/gu/users", query: { role: user.role } }} className="card"><h2>Users</h2></Link>
        )}

        {/* Show My Contributions link for User */}
        {(user.role === "USER" || user.role === "SUPERADMIN" || user.role === "ADMIN" )&& (
            <Link href={{ pathname: "/gu/myContributions", query: { userId: user.id } }} className="card"><h2>My Contributions</h2></Link>
        )}
      </div>
    </div>
  );
}
