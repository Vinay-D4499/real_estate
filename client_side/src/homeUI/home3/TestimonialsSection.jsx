import React from 'react';

const testimonials = [
  {
    name: 'Anil Sharma',
    review: 'The team helped me find the perfect home! Their service was excellent and the process was so smooth.',
    location: 'Bangalore',
    photo: 'https://lara.blr1.cdn.digitaloceanspaces.com/real_estate/profile_pictures/default.png'
  },
  {
    name: 'Priya Mehta',
    review: 'Great experience! I got an apartment that matched all my needs. Highly recommended.',
    location: 'Bangalore',
    photo: 'https://lara.blr1.cdn.digitaloceanspaces.com/real_estate/profile_pictures/default.png'
  },
  {
    name: 'Rakesh Patel',
    review: 'Fantastic service and friendly staff. They made the entire process easy and enjoyable.',
    location: 'Bangalore',
    photo: 'https://lara.blr1.cdn.digitaloceanspaces.com/real_estate/profile_pictures/default.png'
  },
  {
    name: 'Aditi Rao',
    review: 'They helped me find the ideal place for my family. Couldn’t be happier with my experience!',
    location: 'Bangalore',
    photo: 'https://lara.blr1.cdn.digitaloceanspaces.com/real_estate/profile_pictures/default.png'
  },
  {
    name: 'Kavita Rao',
    review: 'They helped me find the ideal place for my family. Couldn’t be happier with my experience!',
    location: 'Bangalore',
    photo: 'https://lara.blr1.cdn.digitaloceanspaces.com/real_estate/profile_pictures/default.png'
  },
  {
    name: 'Supriya Sahoo',
    review: 'They helped me find the ideal place for my family. Couldn’t be happier with my experience!',
    location: 'Bangalore',
    photo: 'https://lara.blr1.cdn.digitaloceanspaces.com/real_estate/profile_pictures/default.png'
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-gradient-to-r from-green-100 to-blue-100 py-12 px-6 md:px-12 lg:px-24">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Listen from our Happy Clients
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200"
          >
            <img
              src={testimonial.photo}
              alt={testimonial.name}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{testimonial.location}</p>
            <p className="text-gray-600 text-center">"{testimonial.review}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
