import React from 'react';
import DisplayProfilePicture from './DisplayProfilePicture';
import { Link } from 'react-router-dom';
import DeactivateUser from './DeactivateUser';
import ActivateUser from './ActivateUser';

const CustomerTable = ({ customers, refreshCustomerData, isCustomersActive }) => {
    return (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="p-2 text-sm font-semibold text-left">ID</th>
                        <th className="p-2 text-sm font-semibold text-left">Profile</th>
                        <th className="p-2 text-sm font-semibold text-left">Name</th>
                        <th className="p-2 text-sm font-semibold text-left">Phone</th>
                        <th className="p-2 text-sm font-semibold text-left">Location</th>
                        <th className="p-2 text-sm font-semibold text-left">Budget</th>
                        <th className="p-2 text-sm font-semibold text-left">Email</th>
                        <th className="p-2 text-sm font-semibold text-left">Address</th>
                        <th className="p-2 text-sm font-semibold text-left">Referred By</th>
                        <th className="p-2 text-sm font-semibold text-left">Assigning Properties</th>
                        <th className="p-2 text-sm font-semibold text-left">Update Details</th>
                        <th className="p-2 text-sm font-semibold text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length > 0 ? (
                       customers.map((customer, index) => (
                        <tr key={customer.id} className="border-b hover:bg-gray-100">
                            <td className="p-2 text-sm">{index + 1}</td> 
                            <td className="p-2 text-sm">
                                <DisplayProfilePicture id={customer.id} isEditable={true} />
                            </td>
                            <td className="p-2 text-sm">{customer.name}</td>
                            <td className="p-2 text-sm">{customer.phone}</td>
                            <td className="p-2 text-sm">{customer.location || 'N/A'}</td>
                            <td className="p-2 text-sm">
                                {customer.budget_min && customer.budget_max
                                    ? `₨ ${customer.budget_min} - ₨ ${customer.budget_max}`
                                    : 'N/A'}
                            </td>
                            <td className="p-2 text-sm">{customer.email || 'N/A'}</td>
                            <td className="p-2 text-sm">{customer.address || 'N/A'}</td>
                            <td className="p-2 text-sm">{customer.referred_by || 'N/A'}</td>
                            <td className="p-2 text-sm"><Link to={`/assign-properties/${customer.id}`} className="hover:text-indigo-400">
                                    Assigning propertytypes
                                </Link></td>

                            <td className="p-2 text-sm">
                                <Link to={`/update-user/${customer.id}`} className="hover:text-indigo-400">
                                    Update Details
                                </Link>
                            </td>
                            <td className="p-2 text-sm">
                                {isCustomersActive ? (
                                    <DeactivateUser id={customer.id} refreshCustomerData={refreshCustomerData} />
                                ) : (
                                    <ActivateUser id={customer.id} refreshCustomerData={refreshCustomerData} />
                                )}
                            </td>
                        </tr>
                    ))
                    ) : (
                        <tr>
                            <td colSpan="11" className="p-4 text-center text-sm text-gray-500">
                                No customer data available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerTable;
