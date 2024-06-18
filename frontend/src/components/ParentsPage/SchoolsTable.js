import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";

const SchoolsTable = () => {
  const [schools, setSchools] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [updateInfo, setUpdateInfo] = useState({
    name: "",
    fees: "",
    details: "",
  });

  const fetchSchools = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/schools?page=${page}`
      );
      const { schools: fetchedSchools, totalPages: fetchedTotalPages } =
        response.data;
      setSchools(fetchedSchools);
      setTotalPages(fetchedTotalPages);
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };

  useEffect(() => {
    fetchSchools(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const updateData = async (schoolId) => {
    try {
      const updateResponse = await axios.put(
        `http://localhost:5000/api/schools/${schoolId}`,
        updateInfo
      );
      console.log("Update successful:", updateResponse.data);
      setSelectedSchool(null);
      setUpdateInfo({ name: "", fees: "", details: "" });
      fetchSchools(currentPage);
    } catch (error) {
      console.error("Error updating school:", error);
    }
  };

  const deleteSchool = async (schoolId) => {
    try {
      const deleteResponse = await axios.delete(
        `http://localhost:5000/api/schools/${schoolId}`
      );
      console.log("Delete successful:", deleteResponse.data);
      fetchSchools(currentPage);
    } catch (error) {
      console.error("Error deleting school:", error);
    }
  };

  const handleEditClick = (school) => {
    setSelectedSchool(school);
    setUpdateInfo({
      name: school.name,
      fees: school.fees,
      details: school.details,
    });
  };

  const handleCancelClick = () => {
    setSelectedSchool(null);
    setUpdateInfo({ name: "", fees: "", details: "" });
  };

  return (
    <div>
      <h1>Schools Table</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Fees</th>
            <th>Details</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr key={school._id}>
              <td>{school.name}</td>
              <td>{school.fees}</td>
              <td>{school.details}</td>
              <td>
                {school.picture && (
                  <img
                    src={`${school.picture}`}
                    alt={school.name}
                    style={{ width: "100px", height: "auto" }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
          }
          disabled={currentPage === 1}
        />
        <Pagination.Next
          onClick={() =>
            handlePageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
          disabled={currentPage === totalPages}
        />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
    </div>
  );
};

export default SchoolsTable;
