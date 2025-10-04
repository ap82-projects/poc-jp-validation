"use server";
import { getAddress } from "jposta";

const POSTCODE_JP_API_KEY = process.env.NEXT_PUBLIC_POSTCODE_JP_API_KEY || "";

export type Address = {
  area: string;
  city: string;
  pref: string;
};

const convertFullWidthToHalfWidth = (str: string) => {
  return str.replace(/[０-９]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0),
  );
};

// Fetch address using jposta library
// https://github.com/nickichi/jposta
export const getAddressJposta = async (
  postalCode: string,
): Promise<Address> => {
  const address = await getAddress(convertFullWidthToHalfWidth(postalCode));

  if (!address) throw new Error("Something went wrong");

  return {
    area: address.area || "",
    city: address.city,
    pref: address.pref,
  };
};

// Fetch address using Postcode-JP API
// https://postcode-jp.com/
export const getAddressPostcodeJP = async (postalCode: string) => {
  if (!POSTCODE_JP_API_KEY) {
    throw new Error("PostcodeJP API key is not set");
  }

  const res = await fetch(
    `https://apis.postcode-jp.com/api/v6/postcodes/${convertFullWidthToHalfWidth(postalCode)}`,
    {
      method: "GET",
      headers: {
        apikey: POSTCODE_JP_API_KEY,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const data = await res.json();

  if (data.length === 0) {
    throw new Error("No address found for this postal code");
  }

  return {
    area: data[0].town || "",
    city: data[0].city,
    pref: data[0].pref,
  };
};
