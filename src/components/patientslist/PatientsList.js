import React, { useState, useEffect } from 'react';
import './PatientsList.css';

function PatientsList() {
  // Sample data
  const [data] = useState([
    { id: 1, name: 'John Doe', condition: 'Healthy' },
    { id: 2, name: 'Jane Smith', condition: 'Diabetes' },
    { id: 3, name: 'Robert Johnson', condition: 'Hypertension' },
    { id: 4, name: 'Emily Davis', condition: 'Asthma' },
    { id: 5, name: 'Michael Brown', condition: 'Healthy' },
    { id: 6, name: 'Sarah Wilson', condition: 'Allergies' },
    { id: 7, name: 'David Taylor', condition: 'Arthritis' },
    { id: 8, name: 'Jessica Anderson', condition: 'Healthy' },
    { id: 9, name: 'Thomas Martinez', condition: 'Migraine' },
    { id: 10, name: 'Lisa Robinson', condition: 'Healthy' },
  ]);

  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Filter data based on search term
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className='list-patient'>
      <div className="patients-list-container">
        {/* Search bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Table */}
        <table className="patients-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.condition}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="no-results">No patients found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination-container">
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientsList;