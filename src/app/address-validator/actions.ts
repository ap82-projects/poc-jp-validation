"use server";

const POSTCODE_JP_API_KEY = process.env.NEXT_PUBLIC_POSTCODE_JP_API_KEY || "";

export const validateAddressPostcodeJP = async (address: string) => {
  if (!POSTCODE_JP_API_KEY) {
    throw new Error("PostcodeJP API key is not set");
  }

  const res = await fetch("https://apis.postcode-jp.com/api/v6/parse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: POSTCODE_JP_API_KEY,
    },
    body: JSON.stringify({ address }),
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const data = await res.json();

  // If score is greater than 0.7, consider it valid
  // Individual scores can befound on the data.meta.score_detail object
  return data.meta.score > 0.7;
};
