"use server";
import { parsePhoneNumber } from "awesome-phonenumber";
import { isValidPhoneNumber } from "libphonenumber-js/max";

const convertFullWidthToHalfWidth = (str: string) => {
  return str.replace(/[０-９]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0),
  );
};

// Validate phone number using awesome-phonenumber library
// https://github.com/grantila/awesome-phonenumber
export const validatePhoneNumberAwesome = async (phoneNumber: string) => {
  const pn = parsePhoneNumber(convertFullWidthToHalfWidth(phoneNumber), {
    regionCode: "JP",
  });

  return pn.valid;
};

// Validate phone number using libphonenumber-js library
// https://github.com/catamphetamine/libphonenumber-js
export const validatePhoneNumberLibPhone = async (phoneNumber: string) => {
  return isValidPhoneNumber(convertFullWidthToHalfWidth(phoneNumber), "JP");
};

// Validate phone number using Better Regex
// https://github.com/sakatam/a-better-jp-phone-regex
const JP_PHONE_REGEX =
  /^(0([1-9]{1}-?[1-9]\d{3}|[1-9]{2}-?\d{3}|[1-9]{2}\d{1}-?\d{2}|[1-9]{2}\d{2}-?\d{1})-?\d{4}|0[789]0-?\d{4}-?\d{4}|050-?\d{4}-?\d{4})$/;

export const validatePhoneNumberBetterRegex = async (phoneNumber: string) => {
  return JP_PHONE_REGEX.test(convertFullWidthToHalfWidth(phoneNumber));
};
