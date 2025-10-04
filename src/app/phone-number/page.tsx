"use client";
import Link from "next/link";
import { useState } from "react";
import {
  validatePhoneNumberAwesome,
  validatePhoneNumberBetterRegex,
  validatePhoneNumberLibPhone,
} from "./actions";

const PhoneNumberDemo = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidAwesome, setIsValidAwesome] = useState<boolean | null>(null);
  const [isValidJs, setIsValidJs] = useState<boolean | null>(null);
  const [isValidBetterRegex, setIsValidBetterRegex] = useState<boolean | null>(
    null,
  );
  console.log("isValidAwesome", isValidAwesome);
  console.log("isValidJs", isValidJs);
  console.log("isValidBetterRegex", isValidBetterRegex);

  const onInputPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Japanese phone numbers are limited to 11 digits
    if (/^[0-9０-９]{0,11}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const validate = async () => {
    setIsValidAwesome(await validatePhoneNumberAwesome(phoneNumber));
    setIsValidJs(await validatePhoneNumberLibPhone(phoneNumber));
    setIsValidBetterRegex(await validatePhoneNumberBetterRegex(phoneNumber));
  };

  const resetPhoneNumber = () => {
    setPhoneNumber("");
    setIsValidAwesome(null);
    setIsValidJs(null);
    setIsValidBetterRegex(null);
  };

  const validators = [
    { isValid: isValidAwesome, name: "awesome-phonenumber" },
    { isValid: isValidJs, name: "libphonenumber-js" },
    { isValid: isValidBetterRegex, name: "Better Regex" },
  ];

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
        <h1>Phone Number Verification Demo</h1>
        <div className="flex flex row gap-4 items-center">
          <input
            className="border border-gray-300 rounded px-4 py-2 w-full max-w-sm"
            inputMode="numeric"
            name="phone-number"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={onInputPhoneNumber}
          />
          <button
            className="bg-gray-500 hover:bg-gray-700 active:bg-gray-900 cursor-pointer text-white rounded px-4 py-2"
            onClick={resetPhoneNumber}
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
          {validators.map(({ isValid, name }) => (
            <div className="flex flex-row gap-4" key={name}>
              {isValid !== null && <h2 className="text-center">{name}</h2>}
              {isValid === true && (
                <p className="text-green-500">Valid phone number</p>
              )}
              {isValid === false && (
                <p className="text-red-500">Invalid phone number</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberDemo;
