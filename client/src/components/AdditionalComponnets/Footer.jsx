import React from 'react';

const Footer = () => {
  return (
    <div className="flex  w-full justify-center bg-gray-100 pb-8">
      <div className="flex w-full max-w-screen-xl flex-col items-center px-6">
        {/* grid for links */}
        <div className="grid  w-full grid-cols-2 gap-10 py-8 text-sm md:grid-cols-2 ">
          <div className="flex flex-col gap-1">
            <strong className="font-medium">Cozy Corner</strong>
            <p>
              <span className="cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pretium diam blandit rutrum fringilla. Mauris ante mauris, convallis ut viverra in, mattis a tortor. Aenean mauris nibh, dictum in convallis in, mattis et nibh. Maecenas ac dolor a erat mattis posuere. Suspendisse et sem nec metus faucibus vehicula. Nam finibus felis augue, sed volutpat neque lobortis quis. Donec vitae sem luctus, porttitor lacus et, consectetur erat. Morbi commodo dui dolor, sit amet efficitur odio elementum eu.
              </span>
            </p>
            <p>
              <span className="cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline">
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <strong className="font-medium">Our Contacts</strong>
            <p>
              <span className="cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline">
                Astana city, Beybitshilik 35
              </span>
            </p>
            <p>
              <span className="cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline">
                8 800 000 00 00
              </span>
            </p>
            <p>
              <span className="cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline">
                cozycorner@gmail.com
              </span>
            </p>
            <p>
              <span className="cursor-pointer font-normal text-gray-700 decoration-1 underline-offset-1 hover:underline">
              </span>
            </p>
          </div>

        </div>

        <div className="my-4 w-full border-[1px] border-gray-200"></div>

        <div className="flex w-full flex-col items-center justify-between gap-4 md:gap-0 lg:flex-row">
          <div className="mt-4 flex w-full justify-between gap-10 md:order-last md:w-auto">
            <div className="flex text-sm font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mr-2 h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              English <span className="mx-4">₸ KZT</span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 px-1 font-normal text-gray-700 md:w-auto md:flex-row md:items-center md:gap-8">
            <p className="text-sm">&copy; 2024 CozyCorner, Inc.</p>
            <div>
              <ul className=" flex gap-6 text-sm text-gray-700">
                <li className="cursor-pointer text-gray-700 decoration-1 underline-offset-1 hover:underline md:list-disc">
                  Privacy
                </li>
                <li className="cursor-pointer list-disc text-gray-700 decoration-1 underline-offset-1 hover:underline">
                  Terms
                </li>
                <li className="cursor-pointer list-disc text-gray-700 decoration-1 underline-offset-1 hover:underline">
                  Sitemap
                </li>
                <li className="cursor-pointer list-disc text-gray-700 decoration-1 underline-offset-1 hover:underline">
                  Company details
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
