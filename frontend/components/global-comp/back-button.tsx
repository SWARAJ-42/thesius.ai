"use client"

import { ChevronLeft, ChevronLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

type BackButtonProps = {
  className?: string;
  label?: string;
};

const BackButton: FC<BackButtonProps> = () => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back(); // Navigate to the previous route
    } else {
      router.push("/"); // Fallback to home page if no history
    }
  };

  return (
    <button onClick={handleBack} className="z-50 fixed top-10 left-10 p-2 bg-green-500 rounded-full text-white">
      <ChevronLeft className="h-10 w-10" />
    </button>
  );
};

export default BackButton;