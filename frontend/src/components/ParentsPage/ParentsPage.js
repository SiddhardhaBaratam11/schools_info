import React from 'react'
import { Link } from 'react-router-dom';
import SchoolsTable from './SchoolsTable';

const ParentsPage = () => {
  return (
    <div>
        <h2>Parents Page</h2>
        <Link to="/">Back to home</Link>
        <SchoolsTable />
    </div>
  )
}

export default ParentsPage