import React from 'react';

const Features = () => {
    const features = [
        {
            title: "Houses",
            description: "Find beautiful houses in premium locations, perfect for families.",
            icon: "🏡",
        },
        {
            title: "Farm Land",
            description: "Explore vast farmland properties for agriculture and investments.",
            icon: "🌾",
        },
        {
            title: "Apartments",
            description: "Choose from modern apartments in urban areas with top amenities.",
            icon: "🏢",
        },
        {
            title: "Flats",
            description: "Affordable flats ideal for single occupants or small families.",
            icon: "🏠",
        },
        {
            title: "Gated Community",
            description: "Secure and luxurious living with community amenities.",
            icon: "🚪",
        },
        {
            title: "Villas",
            description: "Exclusive villas offering privacy and top-notch facilities.",
            icon: "🏖️",
        },
    ];

    return (
        <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Explore Our Featured Properties
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Discover a range of properties tailored to your preferences, from cozy apartments to sprawling farm lands.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center p-6 bg-white border rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl">
                            <span className="text-5xl mb-4">{feature.icon}</span>
                            <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                            <p className="mt-2 text-gray-600 text-center">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
