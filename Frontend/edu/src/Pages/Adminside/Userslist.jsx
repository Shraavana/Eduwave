// src/Pages/Adminside/UsersList.js
import React, { useState, useEffect } from 'react';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Simulating API call to fetch users
    const fetchUsers = async () => {
      const fakeUsers = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
      }));
      setUsers(fakeUsers);
    };

    fetchUsers();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const displayedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Users List</h1>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-4">ID</th>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Email</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-4">{user.id}</td>
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`px-4 py-2 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
