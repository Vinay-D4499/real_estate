import React, { useState, useEffect } from 'react';
import { createUser } from './userAPI';
import { getAllPropertyTypes } from './propertyAPI';
import toast from 'react-hot-toast';
import AllCustomerDetails from './AllCustomerDetails';
import Form from './Form';
// import Conversation from '../../../whatsApp/Conversation';
// import ConversationLayout from '../../../whatsApp/ConversationLayout';
// import ChatContainer from '../../../whatsApp/ChatContainer';

const AddCustomerForm = () => {
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        budgetRange: {}  // For storing selected budget range with min and max values
    });
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);

    // Common budget ranges with numeric values
    const budgetRanges = [
        { label: '< ₹1 Lakh', min: 0, max: 100000 },
        { label: '₹1-5 Lakhs', min: 100000, max: 500000 },
        { label: '₹5-10 Lakhs', min: 500000, max: 1000000 },
        { label: '₹10-20 Lakhs', min: 1000000, max: 2000000 },
        { label: '₹20-50 Lakhs', min: 2000000, max: 5000000 },
        { label: '₹50 Lakhs - ₹1 Crore', min: 5000000, max: 10000000 },
        { label: '> ₹1 Crore', min: 10000000, max: Infinity }
    ];

    useEffect(() => {
        const fetchPropertyTypes = async () => {
            try {
                const response = await getAllPropertyTypes();
                setPropertyTypes(response.properties);
            } catch (error) {
                console.error('Failed to fetch property types:', error);
                toast.error('Failed to fetch property types');
            }
        };

        fetchPropertyTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleBudgetRangeChange = (range) => {
        setUserData({ ...userData, budgetRange: { min: range.min, max: range.max } });
    };

    const handleCheckboxChange = (e) => { 
        const { value } = e.target;
        if (selectedPropertyTypes.includes(value)) {
            setSelectedPropertyTypes(selectedPropertyTypes.filter(id => id !== value));
        } else {
            setSelectedPropertyTypes([...selectedPropertyTypes, value]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { min: budget_min, max: budget_max } = userData.budgetRange;
        try {
            const response = await createUser({
                ...userData,
                propertyTypeIds: selectedPropertyTypes,
                budget_min,
                budget_max,
            });
            toast.success(response.message);
        } catch (error) {
            console.log(error);
            toast.error(error.message || 'Failed to create user');
        }
    };


    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Customer</h2>

                    {/* Customer Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={userData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Budget Range Selection */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Budget Range</label>
                        <div className="grid grid-cols-2 gap-2">
                            {budgetRanges.map((range, index) => (
                                <label key={index} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="budgetRange"
                                        value={range.label}
                                        checked={userData.budgetRange.min === range.min && userData.budgetRange.max === range.max}
                                        onChange={() => handleBudgetRangeChange(range)}
                                        className="mr-2"
                                    />
                                    {range.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Property Types */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Property Types</label>
                        <div className="grid grid-cols-2 gap-2">
                            {propertyTypes.map(property => (
                                <label key={property.id} className="flex items-center uppercase">
                                    <input
                                        type="checkbox"
                                        value={property.id}
                                        checked={selectedPropertyTypes.includes(property.id.toString())}
                                        onChange={handleCheckboxChange}
                                        className="mr-2"
                                    />
                                    {property.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Create User
                    </button>
                </form>
            </div>
            {/* <Conversation /> */}
            <AllCustomerDetails />
            {/* <ConversationLayout /> */}
            {/* <ChatContainer whatsappUserId={919845964499}/> */}
            <Form />
        </>
    );
};

export default AddCustomerForm;
