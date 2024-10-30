"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const TwoFactorModal = () => {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [invalidOtp, setInvalidOtp] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const [qrImage, setQrImage] = useState<string>();
  const [secret, setSecret] = useState<string>();

  useEffect(() => {
    // Check if user already has 2FA enabled
    const stored2FASecret = localStorage.getItem("2FASecret");
    if (stored2FASecret) {
      setIsNewUser(false);
      setSecret(stored2FASecret);
    } else {
      get2faQrCode();
    }
  }, []);

  /* Generate a QR */
  const get2faQrCode = async () => {
    try {
      const response = await axios.get(`api/2fa/qrcode`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status == 200) {
        setQrImage(response.data.data);
        setSecret(response.data.secret);
      }
    } catch (error) {
      console.error("Error fetching QR code:", error);
    }
  };

  /* Validate Code  */
  const handleOtpChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);

    if (e.target.value.length === 6) {
      const token = e.target.value;
      try {
        const response = await axios.post(
          `api/2fa/verify`,
          { secret, token },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.verified) {
          setInvalidOtp(false);

          if (isNewUser) {
            // For new users, store the secret
            localStorage.setItem("is2FAEnabled", "true");
            localStorage.setItem("2FASecret", secret as string);
            toast.success(
              "2FA Enabled successfully! Redirecting to dashboard...",
              {
                duration: 3000,
              }
            );
          } else {
            toast.success(
              "Authentication successful! Redirecting to dashboard...",
              {
                duration: 3000,
              }
            );
          }
          setTimeout(() => {
            router.push("/dashboard");
          }, 3000);
        } else {
          setInvalidOtp(true);
          toast.error("Invalid authentication code");
        }
      } catch (error) {
        console.error("Error verifying code:", error);
        setInvalidOtp(true);
        toast.error("Error verifying authentication code");
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-4">
      <Toaster position="top-center" />
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white backdrop-blur-md rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            {/* QR Code Section - Only show for new users */}
            {isNewUser && (
              <div className="flex-1 flex justify-center items-center p-4">
                {qrImage && (
                  <div className="relative">
                    <Image
                      src={qrImage}
                      alt="2FA QR Code"
                      className="rounded-lg border-2 max-w-[200px] md:max-w-[250px] mx-auto"
                      width={200}
                      height={200}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Instructions Section */}
            <div className={`flex-1 p-4 ${!isNewUser ? "w-full" : ""}`}>
              <h2 className="text-2xl text-gray-800 font-bold mb-6">
                {isNewUser
                  ? "Enable Two-Factor Authentication"
                  : "Two-Factor Authentication"}
              </h2>
              <div className="space-y-6">
                {isNewUser ? (
                  <div className="space-y-4">
                    <p className="text-gray-700 font-semibold">
                      Follow these steps:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                      <li>Scan the QR Code with your Authenticator app</li>
                      <li>Enter the 6-digit code from your app below</li>
                    </ol>
                  </div>
                ) : (
                  <p className="text-gray-700">
                    Please enter the 6-digit code from your authenticator app
                  </p>
                )}

                <div className="space-y-3">
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="Enter 6-digit code"
                    className="w-full border-2 border-gray-300 bg-white h-12 px-4 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  {invalidOtp && (
                    <p className="text-red-500 text-sm">
                      Invalid code. Please try again.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorModal;
