import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { accessAppointment, deleteAppointment } from '../services/Allapis';

function Home() {
  const [appoint, setAppoint] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // State to manage sort order

  const getData = async () => {
    const result = await accessAppointment();
    if (result.status >= 200 && result.status < 300) {
      setAppoint(result.data);
      console.log(result.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteData = async (id) => {
    const result = await deleteAppointment(id);
    if (result.status >= 200 && result.status < 300) {
      setAppoint((prevAppoint) => prevAppoint.filter(appointment => appointment.id !== id));
    }
  };

  const sortAppointments = () => {
    const sortedAppoint = [...appoint].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setAppoint(sortedAppoint);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
  };

  return (
    <div>
      <h1 className='text-center'>Appointments</h1>
      <Container>
        <button onClick={sortAppointments} className='btn btn-dark mb-3'>
          Sort by Date 
        </button>
        <Table striped>
          <thead>
            <tr>
              <th>id</th>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              appoint.map(data => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.date}</td>
                  <td>{data.reason}</td>
                  <td><i onClick={() => deleteData(data.id)} className="fa-solid fa-trash text-danger"></i></td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Home;
