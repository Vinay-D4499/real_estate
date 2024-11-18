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

  // Update property_type_id whenever propertyTypeId changes
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      property_type_id: propertyTypeId,
    }));
  }, [propertyTypeId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-4">Add Property Details</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Property Name
        </label>
        <input
          type="text"
          name="property_name"
          value={formData.property_name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Property Description
        </label>
        <textarea
          name="property_description"
          value={formData.property_description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Address</label>
        <input
          type="text"
          name="property_address"
          value={formData.property_address}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Square Feet or Length
        </label>
        <input
          type="number"
          name="property_sq_feets_or_length"
          value={formData.property_sq_feets_or_length}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Price</label>
        <input
          type="number"
          name="property_price"
          value={formData.property_price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          name="is_available"
          checked={formData.is_available}
          onChange={handleChange}
          className="w-4 h-4 text-blue-400 focus:ring-blue-400 border-gray-300 rounded"
        />
        <label className="ml-2 text-gray-700 font-medium">Available</label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Save Property
      </button>
    </form>
  );
};

export default SavePropertyDetailsFrom;
