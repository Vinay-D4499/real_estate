import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay, Pagination } from 'swiper/modules'; 


const testimonials = [
    {
      id: 1,
      name: "Amit Kumar",
      title: "Software Engineer",
      image: "https://lara.blr1.cdn.digitaloceanspaces.com/real_estate/profile_pictures/default.png",
      text: "I recently bought a house in Bangalore through this real estate platform. The entire process was smooth, and the team guided me at every step. Highly recommend for anyone looking to buy their dream home!",
      propertyType: "House",
      location: "Bangalore",
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: "Doctor",
      image: "https://lara.blr1.cdn.digitaloceanspaces.com/real_estate/profile_pictures/default.png",
      text: "I purchased a 2BHK apartment in Pune. The platform made the search easy, and they even helped me negotiate the price. The team was extremely helpful and transparent throughout the process.",
      propertyType: "Apartment",
      location: "Pune",
    },
    {
      id: 3,
      name: "Rajesh Verma",
      title: "Business Owner",
      image: "https://lara.blr1.cdn.digitaloceanspaces.com/real_estate/profile_pictures/default.png",
      text: "We bought a luxury villa in Goa for our family. The experience was nothing short of fantastic. The team understood our requirements and showed us properties that matched our preferences. The villa was perfect for our needs!",
      propertyType: "Villa",
      location: "Goa",
    },
    {
      id: 4,
      name: "Sanya Patel",
      title: "Teacher",
      image: "https://lara.blr1.cdn.digitaloceanspaces.com/real_estate/profile_pictures/default.png",
      text: "My family and I were looking for a spacious apartment in Ahmedabad, and the team helped us find just the right one. They handled all the paperwork and made sure we got the best deal. Very professional service!",
      propertyType: "Apartment",
      location: "Ahmedabad",
    },
    {
      id: 5,
      name: "Ravi Reddy",
      title: "Engineer",
      image: "https://lara.blr1.cdn.digitaloceanspaces.com/real_estate/profile_pictures/default.png",
      text: "I bought a new house in Hyderabad for my parents, and the entire process was easy and stress-free. The team was always available to answer any questions and provided helpful advice throughout the buying process.",
      propertyType: "House",
      location: "Hyderabad",
    },
    {
      id: 6,
      name: "Neha Gupta",
      title: "Architect",
      image: "https://lara.blr1.cdn.digitaloceanspaces.com/real_estate/profile_pictures/default.png",
      text: "After months of searching, I finally found the perfect villa in Kerala. The team’s understanding of my preferences and their attention to detail were impressive. It was an absolute pleasure to work with them.",
      propertyType: "Villa",
      location: "Kerala",
    },
    {
      id: 7,
      name: "Vikram Singh",
      title: "Marketing Executive",
      image: "https://lara.blr1.cdn.digitaloceanspaces.com/real_estate/profile_pictures/default.png",
      text: "I recently sold my apartment in Delhi and the team made the entire process seamless. Their expertise in the market and their attention to detail helped me get the best price. I couldn't be happier with the outcome!",
      propertyType: "Apartment",
      location: "Delhi",
    },
    {
      id: 8,
      name: "Tanvi Desai",
      title: "HR Manager",
      image: "https://lara.blr1.cdn.digitaloceanspaces.com/real_estate/profile_pictures/default.png",
      text: "I was searching for a new house in Mumbai, and the real estate team helped me find the perfect one. The entire buying process was smooth, and they provided great customer service. Highly recommend their services!",
      propertyType: "House",
      location: "Mumbai",
    },
  ];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="bg-gradient-to-r from-[#A1C4FD] via-[#C2E9FB] to-[#E8F9FD] py-16">
      <h2 className="mb-12 font-extrabold text-4xl text-center text-gray-800">What Our Clients Say</h2>
      <div className="mx-auto container">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide
              key={testimonial.id}
              className="relative flex flex-col items-center bg-white shadow-lg hover:shadow-xl p-6 rounded-xl text-center transform transition-all duration-500 overflow-hidden group hover:scale-105"
            >
              <div className="mb-4 rounded-full w-24 h-24 overflow-hidden">
                <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold text-gray-800 text-xl">{testimonial.name}</h3>
              <p className="font-medium text-gray-500 text-lg">{testimonial.title}</p>
              <p className="mt-4 text-gray-700 text-md">{testimonial.text}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
