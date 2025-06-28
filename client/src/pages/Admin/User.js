import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import axios from 'axios';

const User = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/all-users');
      setUsers(data?.users);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1  className="text-center" >All Users</h1>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>User ID</th>
                    <th>Mobile No</th> 
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user._id}</td>
                      <td>{user.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;