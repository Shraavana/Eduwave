// src/Pages/Adminside/TutorsList.js
import React, { useState, useEffect } from 'react';

const TutorsList = () => {
  const [tutors, setTutors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Simulating API call to fetch tutors
    const fetchTutors = async () => {
      const fakeTutors = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Tutor ${i + 1}`,
        email: `tutor${i + 1}@example.com`,
        subject: `Subject ${i % 5 + 1}`,
      }));
      setTutors(fakeTutors);
    };

    fetchTutors();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(tutors.length / itemsPerPage);
  const displayedTutors = tutors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  // Approve and Block actions
  const handleApprove = (id) => {
    console.log(`Approved tutor with ID: ${id}`);
    // Add logic for approving tutor
  };

  const handleBlock = (id) => {
    console.log(`Blocked tutor with ID: ${id}`);
    // Add logic for blocking tutor
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Tutors List</h1>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-4">ID</th>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Email</th>
            <th className="text-left p-4">Subject</th>
            <th className="text-left p-4">Actions</th> {/* Added Actions column */}
          </tr>
        </thead>
        <tbody>
          {displayedTutors.map((tutor) => (
            <tr key={tutor.id} className="border-b">
              <td className="p-4">{tutor.id}</td>
              <td className="p-4">{tutor.name}</td>
              <td className="p-4">{tutor.email}</td>
              <td className="p-4">{tutor.subject}</td>
              <td className="p-4">
                {/* Approve and Block buttons */}
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                  onClick={() => handleApprove(tutor.id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleBlock(tutor.id)}
                >
                  Block
                </button>
              </td>
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

export default TutorsList;
