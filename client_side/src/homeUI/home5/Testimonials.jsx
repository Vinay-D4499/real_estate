import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Testimonials = () => {
    const testimonials = [
        {
            name: "Rohit Sharma",
            location: "Mumbai, India",
            review: "Lara Properties made the process of buying my dream home smooth and hassle-free. Highly recommend their services for first-time buyers!",
            rating: 5
        },
        {
            name: "Ananya Verma",
            location: "Delhi, India",
            review: "The team at Lara Properties understood my needs perfectly and helped me find the perfect rental property in Delhi.",
            rating: 4
        },
        {
            name: "Aarav Patel",
            location: "Bangalore, India",
            review: "I was impressed by the transparency and professionalism. They made the property selling process straightforward and worry-free.",
            rating: 5
        },
    ];

    return (
        <section className="bg-gray-50">
            <div className="mx-auto max-w-[1340px] px-4 py-12 sm:px-6 lg:py-16">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Our Clients Love Us
                    </h2>
                    <p className="mt-4 text-gray-700">
                        See what our satisfied clients have to say about their experiences with us.
                    </p>
                </div>

                <div className="mt-10">
                    <Carousel 
                        showThumbs={false} 
                        showStatus={false} 
                        infiniteLoop 
                        autoPlay 
                        interval={5000} 
                        transitionTime={800} 
                        className="max-w-2xl mx-auto"
                    >
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="p-6 border rounded-lg bg-white shadow-md">
                                <p className="text-gray-800 text-lg italic">"{testimonial.review}"</p>
                                <div className="mt-4 text-right">
                                    <h3 className="text-rose-600 font-semibold">{testimonial.name}</h3>
                                    <p className="text-gray-600">{testimonial.location}</p>
                                    <div className="mt-2 text-yellow-400">
                                        {Array(testimonial.rating).fill('⭐').join('')}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
