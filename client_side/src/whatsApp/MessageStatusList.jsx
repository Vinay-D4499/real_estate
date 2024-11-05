// src/components/MessageStatusList.jsx
import React from 'react';

const MessageStatusList = ({ statuses }) => (
  <div className="mt-2">
    {statuses.map((status) => (
      <div key={status.statusId} className="text-xs text-gray-500">
        <span className="font-semibold">{status.status.charAt(0).toUpperCase() + status.status.slice(1)}:</span> 
        {new Date(status.timestamp).toLocaleTimeString()}
      </div>
    ))}
  </div>
);

export default MessageStatusList;
