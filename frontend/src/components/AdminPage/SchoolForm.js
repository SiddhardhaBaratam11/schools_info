import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SchoolForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    name: '',
    fees: '',
    picture: null,
    details: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      picture: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('fees', formData.fees);
      formDataToSend.append('picture', formData.picture);
      formDataToSend.append('details', formData.details);

      await axios.post('http://localhost:5000/api/schools', formDataToSend);
      // Optionally, reset form after successful submission
      setFormData({
        name: '',
        fees: '',
        picture: null,
        details: '',
      });
      navigate('/admin'); // Redirect to /admin after successful form submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h3>Add/Edit School</h3>
      <Form onSubmit={handleSubmit} className='mb-3'>
        <Form.Group controlId="formName">
          <Form.Label>School Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter school name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formFees">
          <Form.Label>School Fees</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter school fees"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formPicture">
          <Form.Label>School Picture</Form.Label>
          <Form.Control
            type="file"
            name="picture"
            onChange={handleFileChange}
          />
        </Form.Group>
        <Form.Group controlId="formDetails">
          <Form.Label>Other Basic Details</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="details"
            value={formData.details}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SchoolForm;
