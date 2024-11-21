import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../src/config/baseURL";
import { toast } from "react-hot-toast";

const SavePropertyDetailsFrom = ({ propertyTypeId }) => {
  const [formData, setFormData] = useState({
    property_name: "",
    property_type_id: propertyTypeId,
    property_description: "",
    property_address: "",
    property_sq_feets_or_length: "",
    property_price: "",
    is_available: false,
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      property_type_id: propertyTypeId,
    }));
  }, [propertyTypeId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(`Changing ${name} to ${type === "checkbox" ? checked : value}`);
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    try {
      await axios.post(`${baseURL}/api/propertyDetails/properties`, {
        propertydetailsdata: formData,
      });
      toast.success("Property details saved successfully!");
    } catch (error) {
      console.error("Error saving property details:", error);
      toast.error("Failed to save property details. Please try again.");
    }
  };

  return (
    <form
      className="bg-white shadow-md mx-auto p-6 rounded-lg max-w-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-4 font-semibold text-xl">Add Property Details</h2>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">
          Property Name
        </label>
        <input
          type="text"
          name="property_name"
          value={formData.property_name}
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">
          Property Description
        </label>
        <textarea
          name="property_description"
          value={formData.property_description}
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="8"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="property_address"
          value={formData.property_address}
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">
          Square Feet or Length
        </label>
        <input
          type="number"
          name="property_sq_feets_or_length"
          value={formData.property_sq_feets_or_length}
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="property_price"
          value={formData.property_price}
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          name="is_available"
          checked={formData.is_available}
          onChange={handleChange}
          className="border-gray-300 rounded focus:ring-blue-400 w-4 h-4 text-blue-400"
        />
        <label className="ml-2 font-medium text-gray-700">Available</label>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 w-full text-white focus:outline-none"
      >
        Save Property
      </button>
    </form>
  );
};

export default SavePropertyDetailsFrom;
