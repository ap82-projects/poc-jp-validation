"use client";
import Link from "next/link";
import { Address, getAddressJposta, getAddressPostcodeJP } from "./actions";
import { FC, useState } from "react";

const isValidPostalCode = (postalCode: string) => {
  return /^[0-9０-９]{7}$/.test(postalCode);
};

const AddressDemo = () => {
  const [postalCode, setPostalCode] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  const lookupMethods = [
    {
      getAddress: getAddressJposta,
      label: "jposta",
    },
    {
      getAddress: getAddressPostcodeJP,
      label: "Postcode-JP",
    },
  ];

  const onInputPostalCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^[0-9０-９]{0,7}$/.test(value)) {
      setPostalCode(value);
      setIsValid(true);
      setHasError(false);
    }
  };

  const resetPostalCode = () => {
    setPostalCode("");
    setIsValid(null);
    setHasError(false);
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
        <h1>Address Verification Demo</h1>
        <div className="flex flex row gap-4 items-center">
          <input
            className="border border-gray-300 rounded px-4 py-2 w-full max-w-sm"
            inputMode="numeric"
            name="postal-code"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={onInputPostalCode}
          />
          <button
            className="bg-gray-500 hover:bg-gray-700 active:bg-gray-900 cursor-pointer text-white rounded px-4 py-2"
            onClick={resetPostalCode}
          >
            Reset
          </button>
        </div>
        {isValid === false && (
          <p className="text-red-500">
            Invalid postal code format. Must be either XXXXXXX or XXX-XXXX.
          </p>
        )}
        {hasError === true && (
          <p className="text-red-500">
            Error occurred while fetching the address. Please try again.
          </p>
        )}
        <div className="flex flex-row gap-4">
          {lookupMethods.map(({ getAddress, label }) => (
            <AddressRetrieval
              getAddress={getAddress}
              key={label}
              label={label}
              postalCode={postalCode}
              setHasError={setHasError}
              setIsValid={setIsValid}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface AddressRetrievalProps {
  getAddress: (postalCode: string) => Promise<Address>;
  label: string;
  postalCode: string;
  setHasError: (hasError: boolean) => void;
  setIsValid: (isValid: boolean | null) => void;
}

const AddressRetrieval: FC<AddressRetrievalProps> = ({
  getAddress,
  label,
  postalCode,
  setHasError,
  setIsValid,
}) => {
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");

  const resetAddress = () => {
    setPrefecture("");
    setCity("");
    setArea("");
  };

  const lookupAddress = async () => {
    if (!isValidPostalCode(postalCode)) {
      setIsValid(false);
      return;
    }

    try {
      const address = await getAddress(postalCode);
      if (!address) {
        setHasError(true);
        return;
      }

      setPrefecture(address.pref);
      setCity(address.city);
      setArea(address.area ?? "");
      setHasError(false);
      setIsValid(true);
    } catch (error) {
      resetAddress();
      setHasError(true);
      setIsValid(true);
      return;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center">{`Using ${label}`}</h2>
      <button
        className="bg-blue-500 active:bg-blue-900 hover:bg-blue-700 cursor-pointer text-white rounded px-4 py-2 w-full max-w-sm"
        onClick={lookupAddress}
      >
        Get Address
      </button>
      <input
        className="border border-gray-300 rounded px-4 py-2 w-full max-w-sm"
        placeholder="Prefecture"
        readOnly
        type="text"
        value={prefecture}
      />
      <input
        className="border border-gray-300 rounded px-4 py-2 w-full max-w-sm"
        placeholder="City"
        readOnly
        type="text"
        value={city}
      />
      <input
        className="border border-gray-300 rounded px-4 py-2 w-full max-w-sm"
        placeholder="Area"
        readOnly
        type="text"
        value={area}
      />
      <button
        className="bg-green-500 active:bg-green-900 hover:bg-green-700 cursor-pointer text-white rounded px-4 py-2 w-full max-w-sm"
        onClick={resetAddress}
      >
        Reset
      </button>
    </div>
  );
};

export default AddressDemo;
