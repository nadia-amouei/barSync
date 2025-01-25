import { useState } from "react";
import { useNavigate } from "react-router";
import { setCookie } from 'typescript-cookie';
import { registerUser } from "../../services/userService";

interface RegisterProps {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormProps {
  email: string,
  firstname: string,
  lastname: string,
  password: string
}

function Register ({setShowLogin}: RegisterProps) {
  const navigate = useNavigate();

  const initialFormState = {
    email: "",
    firstname: "",
    lastname: "",
    password: ""
  };
  const [formState, setFormState] = useState<FormProps>(initialFormState);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setFormState(prevState => ({...prevState, [name]: value}));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const data = await registerUser(formState);
      setCookie('token', data.accessToken, {expires: 1, path: "/", sameSite: "Strict"})
      setFormState(initialFormState);
      await navigate("/");
    } catch (e) {
      throw new Error(`API Error: ${e}`);
    }
  }

  return (
    <>
    <div className="login-register">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="register-email">Email</label>
            <input type="email" id="register-email" placeholder="Enter your email" onChange={handleChange} name="email" value={formState.email} required />
          </div>
          <div className="form-group">
            <label htmlFor="register-firstname">First Name</label>
            <input type="text" id="register-firstname" placeholder="Enter your first name" onChange={handleChange} name="firstname" value={formState.firstname} required />
          </div>
          <div className="form-group">
            <label htmlFor="register-lastname">Last Name</label>
            <input type="text" id="register-lastname" placeholder="Enter your last name" onChange={handleChange} name="lastname" value={formState.lastname} required />
          </div>
          <div className="form-group">
            <label htmlFor="register-password">Password</label>
            <input type="password" id="register-password" placeholder="Create a password" onChange={handleChange} name="password" value={formState.password} required />
          </div>
          <button type="submit" className="form-button">Register</button>
        </form>
        <p className="margin-top">Already have an account? Login <button className="switch-to-register" onClick={() => setShowLogin(true)}>here!</button></p>
    </div>
    </>
  );
}

export default Register;