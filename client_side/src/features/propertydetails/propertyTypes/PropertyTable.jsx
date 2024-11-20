import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';

const PropertyTable = ({ propertyTypes, confirmDelete }) => {
    return (
        <div className="w-full max-w-xl p-4">
            <table className="w-full rounded-lg table-auto bg-white shadow-md overflow-hidden">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="p-1 text-xs font-semibold text-left">ID</th>
                        <th className="p-1 text-xs font-semibold text-left">Property Type</th>
                        <th className="p-1 text-xs font-semibold text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {propertyTypes.length > 0 ? (
                        propertyTypes.map((propertyType, index) => (
                            <tr key={propertyType.id} className="border-b hover:bg-gray-100">
                                <td className="p-1 text-xs">{index + 1}</td>
                                <td className="p-1 text-xs">{propertyType.name}</td>
                                <td className="p-1 text-xs">
                                    <button
                                        className="bg-red-500 text-white rounded px-4 py-2 mr-2 flex items-center"
                                        onClick={() => confirmDelete(propertyType.id)}
                                    >
                                        <TrashIcon className="h-5 w-5 mr-1" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="p-4 text-center text-sm text-gray-500">
                                No property types available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PropertyTable;
