import React from 'react';

const properties = [
  {
    id: 1,
    title: 'Luxury House in Malibu',
    image: 'https://pics.craiyon.com/2023-06-08/fc3eda7b7bb8419bb9e1a1b532b8239c.webp',
    type: 'House',
  },
  {
    id: 2,
    title: 'Modern City Apartment',
    image: 'https://wallpapercave.com/wp/wp2449413.jpg',
    type: 'Apartment',
  },
  {
    id: 3,
    title: 'Stunning Villa in Goa',
    image: 'https://wallpaperaccess.com/full/3158925.jpg',
    type: 'Farm Land',
  },
  {
    id: 4,
    title: 'Gated Community Flat',
    image: 'https://images6.alphacoders.com/343/thumb-1920-343179.jpg',
    type: 'Flat',
  },
  {
    id: 5,
    title: 'Beachfront Villa',
    image: 'https://pics.craiyon.com/2023-06-08/fc3eda7b7bb8419bb9e1a1b532b8239c.webp',
    type: 'Villa',
  },
  {
    id: 6,
    title: 'Spacious Apartment in Bangalore',
    image: 'https://wallpapercave.com/wp/wp2449413.jpg',
    type: 'Apartment',
  },
  {
    id: 7,
    title: 'Luxury Gated Community Home',
    image: 'https://wallpaperaccess.com/full/3158925.jpg',
    type: 'Farm Land',
  },
  {
    id: 8,
    title: 'Modern House in Delhi',
    image: 'https://images6.alphacoders.com/343/thumb-1920-343179.jpg',
    type: 'House',
  },
];

const getRandomHeight = () => {
  const minHeight = 250;
  const maxHeight = 500;
  return `${Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight}px`;
};

const PropertiesGallery = () => {
  return (
    <div className="bg-gradient-to-r from-[#A1C4FD] via-[#C2E9FB] to-[#E8F9FD] py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-4 flex items-center justify-between gap-8 sm:mb-8 md:mb-12">
          <div className="flex items-center gap-12">
            <h2 className="text-2xl font-bold text-gray-800 lg:text-">Gallery</h2>
            <p className="hidden max-w-screen-sm text-black md:block">
              Gallery of our properties
            </p>
          </div>
          <a
            href="#"
            className="inline-block rounded-lg border bg-white dark:bg-gray-700 dark:border-none px-4 py-2 text-center text-sm font-semibold text-gray-500 dark:text-gray-200 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base"
          >
            More
          </a>
        </div>

        <div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8"
          style={{
            gridAutoRows: 'minmax(200px, auto)',
          }}
        >
          {properties.map((property) => (
            <a
              key={property.id}
              href="#"
              className="group relative flex items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg"
              style={{ height: getRandomHeight() }}
            >
              <img
                src={property.image}
                loading="lazy"
                alt={property.title}
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <span className="relative ml-4 mb-3 inline-block text-sm text-white md:ml-5 md:text-lg">
                {property.type}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertiesGallery;
