"use server";

const POSTCODE_JP_API_KEY = process.env.NEXT_PUBLIC_POSTCODE_JP_API_KEY || "";
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export type Validity = "INVALID" | "VALID" | "CONFIRMATION_REQUIRED";

const convertFullWidthNumbersToHalfWidth = (str: string) => {
  return str.replace(/[０-９]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0),
  );
};

export const validateAddressPostcodeJP = async (
  addressLines: string[],
): Promise<Validity> => {
  if (!POSTCODE_JP_API_KEY) {
    throw new Error("PostcodeJP API key is not set");
  }

  const res = await fetch("https://apis.postcode-jp.com/api/v6/parse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: POSTCODE_JP_API_KEY,
    },
    body: JSON.stringify({
      address: convertFullWidthNumbersToHalfWidth(addressLines.join("")),
    }),
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const data = await res.json();

  // Example acceptance logic
  const result = ((): Validity => {
    // If score is greater than 0.7, consider it valid
    const hasAllIndividualPassed = Object.values(data.meta.score_detail).every(
      (score) => Number(score) > 0.7,
    );

    const isTotalScorePassed = data.meta.score > 0.7;

    if (hasAllIndividualPassed && isTotalScorePassed) {
      return "VALID";
    }

    if (isTotalScorePassed) {
      return "CONFIRMATION_REQUIRED";
    }

    return "INVALID";
  })();

  // Individual scores can befound on the data.meta.score_detail object
  return result;
};

export const validateAddressGoogleMaps = async (
  addressLines: string[],
): Promise<Validity> => {
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error("Google Maps API key is not set");
  }

  const res = await fetch(
    `https://addressvalidation.googleapis.com/v1:validateAddress?key=${GOOGLE_MAPS_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: {
          regionCode: "JP",
          addressLines: addressLines.map((line) =>
            convertFullWidthNumbersToHalfWidth(line).replace(/－/g, "-"),
          ),
        },
      }),
    },
  );

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const data = await res.json();

  if (!data?.result?.verdict.possibleNextAction) {
    throw new Error("Invalid response from Google Maps API");
  }

  const result = ((): Validity => {
    switch (data.result.verdict.possibleNextAction) {
      case "ACCEPT":
        return "VALID";
      case "CONFIRM":
        return "CONFIRMATION_REQUIRED";
      default:
        return "INVALID";
    }
  })();

  return result;
};
