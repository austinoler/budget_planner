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
      console.error(e);
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
    <div className="col-4 border border-1 border-success rounded p-4 shadow bg-light">
      <h2 className="border border-1 border-success rounded text-center"><i className="bi bi-person-check-fill"></i> LOGIN</h2>
      <form onSubmit={handleFormSubmit} className="border border-dark border-1 px-4 rounded">
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
            <p className="error-text">Incorrect Login Information!</p>
          </div>
        ) : null}
        <br/><br/><br/><br/><br/>
        <div className="text-center mb-3">
          <button type="submit"><i className="bi bi-box-arrow-in-right text-white"></i> Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;