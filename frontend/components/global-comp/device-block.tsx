"use client"

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface DeviceBlockerProps {
  children: ReactNode;
}

const DeviceBlocker: React.FC<DeviceBlockerProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const isMobileOrTablet = (): boolean => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /iphone|ipad|android|mobile/i.test(userAgent);
      const isTablet = /tablet/i.test(userAgent);
      const isSmallScreen = window.innerWidth < 1500; // Adjust breakpoint as needed
      return isMobile || isTablet || isSmallScreen;
    };

    if (isMobileOrTablet()) {
      alert("This page is currently not optimized for smaller screens. Please access it from a laptop or desktop in full page mode.");
      router.push("/"); // Redirect to a custom unsupported page
    }
  }, [router]);

  return <>{children}</>;
};

export default DeviceBlocker;
