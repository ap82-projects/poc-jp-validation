"use server";
import { getAddress } from "jposta";

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
