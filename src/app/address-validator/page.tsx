"use client";
import Link from "next/link";
import { FC, useState } from "react";
import {
  validateAddressGoogleMaps,
  validateAddressPostcodeJP,
  Validity,
} from "./actions";

const AddressValidationDemo = () => {
  const [address, setAddress] = useState("");
  const [resultPostcodeJP, setResultPostcodeJP] = useState<Validity | null>(
    null,
  );
  const [isErrorPostcodeJP, setIsErrorPostcodeJP] = useState<boolean>(false);

  const [resultGoogleMaps, setResultGoogleMaps] = useState<Validity | null>(
    null,
  );
  const [isErrorGoogleMaps, setIsErrorGoogleMaps] = useState<boolean>(false);

  const onInputAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
  };

  const validate = async () => {
    try {
      setResultPostcodeJP(await validateAddressPostcodeJP([address]));
      setIsErrorPostcodeJP(false);
    } catch (error) {
      setIsErrorPostcodeJP(true);
      setResultPostcodeJP(null);
    }

    try {
      setResultGoogleMaps(await validateAddressGoogleMaps([address]));
      setIsErrorGoogleMaps(false);
    } catch (error) {
      setIsErrorGoogleMaps(true);
      setResultGoogleMaps(null);
    }
  };

  const resetAddress = () => {
    setAddress("");
    setIsErrorGoogleMaps(false);
    setResultGoogleMaps(null);
    setIsErrorPostcodeJP(false);
    setResultPostcodeJP(null);
  };

  const validationMethods = [
    {
      isError: isErrorPostcodeJP,
      label: "PostcodeJP",
      result: resultPostcodeJP,
    },
    {
      isError: isErrorGoogleMaps,
      label: "Google Maps",
      result: resultGoogleMaps,
    },
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
        <div className="flex flex-row gap-4">
          {validationMethods.map(({ isError, label, result }) => (
            <AddressValidation
              isError={isError}
              key={label}
              label={label}
              result={result}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface AddressValidationProps {
  isError: boolean;
  label: string;
  result: Validity | null;
}

const AddressValidation: FC<AddressValidationProps> = ({
  isError,
  label,
  result,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {(result || isError) && (
        <h2 className="text-center">{`Using ${label}`}</h2>
      )}
      <div className="flex flex-row gap-4">
        {result && <p>{result}</p>}
        {/* {isValid === true && <p className="text-green-500">Valid address</p>}
        {isValid === false && <p className="text-red-500">Invalid address</p>} */}
        {isError && <p className="text-red-500">Error validating address</p>}
      </div>
    </div>
  );
};

export default AddressValidationDemo;
