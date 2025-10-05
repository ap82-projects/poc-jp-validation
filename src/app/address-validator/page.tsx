"use client";
import Link from "next/link";
import { useState } from "react";
import { validateAddressPostcodeJP } from "./actions";

const AddressValidationDemo = () => {
  const [address, setAddress] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const onInputAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
  };

  const validate = async () => {
    try {
      await validateAddressPostcodeJP(address);
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
    }
  };

  const resetAddress = () => {
    setAddress("");
    setIsValid(null);
  };

  return (
    <div>
      <Link href="/">
        <button
          className="px-6 py-3 bg-black text-white rounded-lg text-lg sm:text-xl font-medium cursor-pointer hover:bg-gray-800 active:bg-gray-900 transition"
          type="button"
        >
          Back
        </button>
      </Link>
      <div className="font-sans flex flex-col gap-8 items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20">
        <h1>Address Validation Demo</h1>
        <div className="flex flex row gap-4 items-center">
          <input
            className="border border-gray-300 rounded px-4 py-2 w-full max-w-sm"
            inputMode="numeric"
            name="phone-number"
            placeholder="Enter address"
            value={address}
            onChange={onInputAddress}
          />
          <button
            className="bg-gray-500 hover:bg-gray-700 active:bg-gray-900 cursor-pointer text-white rounded px-4 py-2"
            onClick={resetAddress}
          >
            Reset
          </button>
        </div>
        <button
          className="bg-blue-500 active:bg-blue-900 hover:bg-blue-700 cursor-pointer text-white rounded px-4 py-2 w-full max-w-sm"
          onClick={validate}
        >
          Validate
        </button>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            {isValid === true && (
              <p className="text-green-500">Valid address</p>
            )}
            {isValid === false && (
              <p className="text-red-500">Invalid address</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressValidationDemo;
