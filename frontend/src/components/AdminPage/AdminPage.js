import React from 'react'
import SchoolForm from './SchoolForm';
import { Link } from 'react-router-dom';
import SchoolsTable from './SchoolsTable';

const AdminPage = () => {
  return (
    <div>
        <h2>Admin Page</h2>
        <Link to="/">Back to home</Link>
        <SchoolForm />
        <SchoolsTable />
    </div>
  )
}

export default AdminPage