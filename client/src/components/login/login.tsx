import { useState } from "react";
import { useNavigate } from "react-router";
import { setCookie } from 'typescript-cookie';
import { loginUser } from "../../services/userService";

interface LoginProps {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormProps {
  email: string,
  password: string
}

function Login ({setShowLogin}: LoginProps) {
  const navigate = useNavigate();

  const initialFormState = {
    email: "",
    password: ""
  };
  const [formState, setFormState] = useState<FormProps>(initialFormState);
  const [errorState, setErrorState] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setFormState(prevState => ({...prevState, [name]: value}));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const data = await loginUser(formState);
      if (!data.accessToken) setErrorState(true);

      setCookie('token', data.accessToken, {expires: 1, path: "/", sameSite: "Strict"})
      setFormState(initialFormState);
      setErrorState(false);
      await navigate("/");
    } catch (e) {
      setErrorState(true);
      throw new Error(`API Error: ${e}`);
    }
  }

  return (
    <div className="login-register">
        <h1>Login</h1>
        {errorState ? <p className="error-message">Invalid credentials!</p> : ''}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input type="email" id="login-email" placeholder="Enter your email" onChange={handleChange} name="email" value={formState.email} required />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input type="password" id="login-password" placeholder="Enter your password" onChange={handleChange} name="password" value={formState.password} required />
          </div>
          <button type="submit" className="form-button">Login</button>
        </form>
        <p className="margin-top">No account yet? Register <button className="switch-to-register" onClick={() => setShowLogin(false)}>here!</button></p>
    </div>
  );
}

export default Login;