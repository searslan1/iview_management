import React from 'react';
import { Link } from 'react-router-dom';

const MainSidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4 text-xl font-semibold">Admin Panel</div>
      <ul className="mt-6">
        <li className="px-4 py-2 hover:bg-gray-700">
          <Link to="/launch-list">Lansmanları Listele</Link>
        </li>
        {/* Add more items as needed */}
      </ul>
    </div>
  );
};

export default MainSidebar;
