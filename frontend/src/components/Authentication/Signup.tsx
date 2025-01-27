import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../helpers/registerUtils";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const result = await registerUser(formData);

    setMessage(result.message);

    if (result.success) {
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row w-50">
        <div className="col-md-10">
          <main className="form-signin mt-5">
            <form onSubmit={handleSubmit}>
              <h1 className="h3 mb-3 fw-normal text-center">Register</h1>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingName"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="floatingName">Full Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingEmail"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="floatingEmail">Email address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <button className="btn btn-primary w-100 py-2" type="submit">
                Register
              </button>

            </form>
            {message && <p className="text-danger text-center mt-3">{message}</p>}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Register;
