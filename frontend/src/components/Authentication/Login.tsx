import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../helpers/loginUtils";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    const result = await loginUser(formData);

    setMessage(result.message);

    if (result.success) {
      setTimeout(() => navigate("/"));
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row w-50">
        <div className="col-md-10">
          <main className="form-signin mt-5">
            <form onSubmit={handleSubmit}>
              <h1 className="h2 mb-3 fw-normal text-center">Sign In</h1>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  name="username"
                  placeholder="name@example.com"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>

              <div className="form-floating mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="floatingPassword"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="floatingPassword">Password</label>
                <span
                  className="position-absolute end-0 top-50 translate-middle-y me-3"
                  style={{ cursor: "pointer" }}
                  onClick={togglePasswordVisibility}
                >
                  <i className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`} />
                </span>
              </div>

              <button className="btn btn-primary w-100 py-2" type="submit">
                Sign in
              </button>
            </form>
            {message && <p className="text-danger text-center">{message}</p>}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Login;
