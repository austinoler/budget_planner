import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="col-5 border border-1 border-success rounded p-4">
      <h2 className="border border-1 border-success rounded"><i className="bi bi-person-plus-fill"></i> SIGNUP</h2>
      <i className="bi bi-person-fill-add"></i>
      <form onSubmit={handleFormSubmit} className="border border-dark border-1 p-2 rounded">
        <div className="my-3">
          <label htmlFor="firstName" className="col-2 w-10">
            <i className="bi bi-person-badge"></i>
          </label>
          <input
            placeholder="First Name"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
            className="col-10"
          />
        </div>
        <div className="my-3">
          <label htmlFor="lastName" className="col-2 w-10">
            <i className="bi bi-person-badge-fill"></i>
          </label>
          <input
            placeholder="Last Name"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
            className="col-10"
          />
        </div>
        <div className="my-3">
          <label htmlFor="email" className="col-2 w-10">
            <i className="bi bi-envelope-fill"></i>
          </label>
          <input
            placeholder="email@example.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            className="col-10"
          />
        </div>
        <div className="my-3">
          <label htmlFor="pwd" className="col-2 w-10">
            <i className="bi bi-lock-fill"></i>
          </label>
          <input
            placeholder="Create a Password"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
            className="col-10"
          />
        </div>
        <div className="flex flex-end">
          <button type="submit"><i className="bi bi-box-arrow-in-right text-white"></i> Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
