import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import PropertyTable from './PropertyTable';
import AddPropertyModal from './AddPropertyModal';
import ConfirmAddModal from './ConfirmAddModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import LoadingSpinner from './LoadingSpinner';
import { baseURL } from '../../../config/baseURL';
import SavePropertyDetails from '../SavePropertyDetails';

const AddProperty = () => {
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [propertyType, setPropertyType] = useState('');
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showAddConfirm, setShowAddConfirm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPropertyTypes();
    }, []);

    const fetchPropertyTypes = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseURL}/api/properties/getAllPropertyTypes`);
            setPropertyTypes(response.data.properties);
        } catch (error) {
            console.error('Error fetching property types:', error);
            toast.error('Error fetching property types.');
        } finally {
            setLoading(false);
        }
    };

    const confirmAddProperty = async () => {
        if (!propertyType.trim()) return;

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            await axios.post(`${baseURL}/api/properties/addPropertyType`, { propertyType }, config);
            toast.success('Property type added successfully!');
            setPropertyType('');
            fetchPropertyTypes();
        } catch (error) {
            console.error('Error adding property type:', error);
            toast.error('Error adding property type.');
        } finally {
            setLoading(false);
            setShowAddConfirm(false);
            setShowModal(false);
        }
    };

    const deleteProperty = async () => {
        if (propertyToDelete === null) return;

        setLoading(true);
        try {
            await axios.delete(`${baseURL}/api/properties/deletePropertyType/${propertyToDelete}`);
            toast.success('Successfully deleted the property type.');
            fetchPropertyTypes();
        } catch (error) {
            console.error('Error deleting property type:', error);
            toast.error('Error deleting property type.');
        } finally {
            setLoading(false);
            setPropertyToDelete(null);
            setShowConfirmDelete(false);
        }
    };

    return (
        <>
        <div className="flex flex-col items-center bg-gray-100 p-4 relative ">
            {(showModal || showConfirmDelete || showAddConfirm) && (
                <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
            )}

            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-500 text-white rounded px-4 py-2 mb-4 hover:bg-blue-600 transition duration-200"
            >
                Add Property Type
            </button>

            <h2 className="text-2xl font-semibold text-center mb-4">Property Types</h2>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <PropertyTable
                    propertyTypes={propertyTypes}
                    confirmDelete={(id) => {
                        setPropertyToDelete(id);
                        setShowConfirmDelete(true);
                    }}
                />
            )}

            {showModal && (
                <AddPropertyModal
                    propertyType={propertyType}
                    setPropertyType={setPropertyType}
                    onSubmit={() => {
                        setShowModal(false);
                        setShowAddConfirm(true);
                    }}
                    onCancel={() => setShowModal(false)}
                />
            )}

            {showAddConfirm && (
                <ConfirmAddModal
                    onConfirm={confirmAddProperty}
                    onCancel={() => setShowAddConfirm(false)}
                />
            )}

            {showConfirmDelete && (
                <ConfirmDeleteModal
                    onConfirm={deleteProperty}
                    onCancel={() => setShowConfirmDelete(false)}
                />
            )}
        </div>
        <SavePropertyDetails />
        </>
    );
};

export default AddProperty;
