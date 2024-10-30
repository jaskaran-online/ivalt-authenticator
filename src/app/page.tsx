import TwoFactorModal from "../components/TwoFactorModal";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className=" flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="bg-grid absolute inset-0"></div>
      <Image
        src="https://ivalt.com/images/logo.png"
        alt="iVALT Logo"
        className="text-center mb-4"
        width={200}
        height={200}
      />

      <TwoFactorModal />
      <Toaster position="top-center" />
    </main>
  );
}
