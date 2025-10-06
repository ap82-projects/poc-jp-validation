The purpose of this app is to demonstrate a few methods of doing the following

- Deriving a Japanese address from the postal code
  - One method uses a locally installed package while the other uses a third-party API
- Validating a Japanese phone number
  - Two methods use locally installed packages while the third uses a regex
- Validating a Japanese address
  - Only one method using a third party API

## Getting Started

First, copy the `env.template` file in the root of the repo to `.env` and insert your API key for PostcodeJP. You will need to first create an account at (https://postcode-jp.com)[https://postcode-jp.com].

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the page.

From there you can navigate to either the phone number validation, address from postal code, or address validation demo pages. Note that on the postal code and phone number demo pages, the input boxes will only allow numeric values to be input in either half or full width characters. Attempts to input any other characters will not show up in the input. This is intentional

## Learn More

### The following services and packages were used

#### [Poscode-JP - https://postcode-jp.com](https://postcode-jp.com)

A well established and popular service for converting postal codes to addresses via an API. There is also an address analysis API for validating addresses, though it is currently in a preview stage. They have both free and paid plans.

- Free
  - 384 requests per day and a request rate of 1 request per second
- 1,980 JPY per month
  - Unlimited requests per day and a request rate of 3 requests per second
- 3,400 JPY per month
  - Unlimeted requests per day and an ulimited request rate

#### [Google Maps Platform - https://developers.google.com/maps](https://developers.google.com/maps)

This seems like it would be a more mature and feature rich address validator that would also be able to display a map based on the inputted address as well as offering an autocomplete feature. Currently have tested using it to validate addresses, though it works best when the numbers and hyphens in the address (chome-ban-go section) are in half-width characters.

#### [jposta - https://github.com/nickichi/jposta](https://github.com/nickichi/jposta)

A seemingly popular pagage for converting postal codes to addresses. It contains up to data from the Japan Post and seems to be actively maintained. Since all of the postal data is in the package, it could add quite a bit of size to a client side application, so it might be better to implement in the backend. However, there is no telling how long it will be maintained or how reliable the package will be in the longterm.

#### [libphonenumber-js - https://github.com/catamphetamine/libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js)

A very popular library for validating phone numbers

#### [awesome-phonenumber - https://github.com/grantila/awesome-phonenumber](https://github.com/grantila/awesome-phonenumber)

Another popular package for validating phone number, though not as widely used as `libphonenumber-js`

#### [a-better-phone-regex - https://github.com/sakatam/a-better-jp-phone-regex](https://github.com/sakatam/a-better-jp-phone-regex)

A regex for validating Japanese phone numbers. It's difficult to say how widely used it is, but there does seem to be quite a few recommendations for it on Japanese sites. Seems to be less prone to false positive validations than `libphonenumber-js` and `awesome-phonenumber`, but more testing would be necessary to validate that.

### Services and packages that were not used

#### [Japan Post API - https://lp-api.da.pf.japanpost.jp/](https://lp-api.da.pf.japanpost.jp/)

A seemingly free to use API run by the Japan post that can be used to derive addresses from postal codes. However, there do seem to be rate limits and access to it is part of registering for a larger business service. May be useful if the other services offered are needed.

#### [libphonenumber - https://github.com/google/libphonenumber](https://github.com/google/libphonenumber)

A package maintained by Google for validating phone numbers. While it has many more features than the above used packages, those features come at a cost of size and is not written natively in Javascript.
