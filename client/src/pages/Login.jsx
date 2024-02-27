import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="col-5 border border-3 border-success rounded container p-4">
      <h2 className="fw-bolder">LOGIN</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="row-flex my-2">
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
        <div className="row-flex my-2">
          <label htmlFor="pwd" className="col-2">
            <i className="bi bi-lock-fill"></i>
          </label>
          <input
            placeholder="Password"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
            className="col-10"
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">Incorrect Login I</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
