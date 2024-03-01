import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup() {
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
    <div className="col-4 border border-1 border-success rounded p-4 shadow bg-light">
      <h2 className="border border-1 border-success rounded text-center"><i className="bi bi-person-plus-fill"></i> SIGNUP</h2>
      <i className="bi bi-person-fill-add"></i>
      <form onSubmit={handleFormSubmit} className="border border-dark border-1 px-4 rounded">
        <div className="my-3">
          <label htmlFor="firstName" className="col-2">
            <h4><i className="bi bi-person-badge"></i></h4>
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
          <label htmlFor="lastName" className="col-2">
            <h4><i className="bi bi-person-badge-fill"></i></h4>
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
          <label htmlFor="email" className="col-2">
            <h4><i className="bi bi-envelope-fill"></i></h4>
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
          <label htmlFor="pwd" className="col-2">
            <h4><i className="bi bi-lock-fill"></i></h4>
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
        <div className="text-center mb-3 mt-4">
          <button type="submit"><i className="bi bi-box-arrow-in-right text-white"></i> Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;