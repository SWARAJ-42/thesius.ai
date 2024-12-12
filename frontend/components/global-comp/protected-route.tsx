"use client";

import { useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await axios.get("http://localhost:8000/auth/protected", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setAuthorized(true);
        }
      } catch (error) {
        console.error("Not authorized:", error);
        setAuthorized(false);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuthorization();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  if (!authorized) return null; // Optionally, show a "Not authorized" message here.

  return <>{children}</>;
};

export default ProtectedRoute;
