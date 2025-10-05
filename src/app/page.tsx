import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl sm:text-5xl font-bold text-center sm:text-left">
          Demos
        </h1>
        <div className="flex flex-col gap-8 sm:gap-12 w-full max-w-3xl">
          <Link href="/address">
            <button
              className="px-6 py-3 bg-black text-white rounded-lg text-lg sm:text-xl font-medium cursor-pointer hover:bg-gray-800 active:bg-gray-900 transition"
              type="button"
            >
              Address from postal code
            </button>
          </Link>
          <Link href="/phone-number">
            <button
              className="px-6 py-3 bg-black text-white rounded-lg text-lg sm:text-xl font-medium cursor-pointer hover:bg-gray-800 active:bg-gray-900 transition text-center"
              type="button"
            >
              Phone number verification
            </button>
          </Link>
          <Link href="/address-validator">
            <button
              className="px-6 py-3 bg-black text-white rounded-lg text-lg sm:text-xl font-medium cursor-pointer hover:bg-gray-800 active:bg-gray-900 transition text-center"
              type="button"
            >
              Address verification
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
