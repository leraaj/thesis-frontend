import React, { useState } from "react";
import useFormData from "../../utils/inputs/useFormData";
import Navbar from "../../components/layout/ExternalLayout/Navbar";
import { useAuth } from "../../hooks/auth/useAuth";
import delay from "../../utils/display/delay";

const Login = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login, isLoading: loginLoading } = useAuth();

  const { formData, handleChange } = useFormData({
    login: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const [result] = await Promise.all([
        login(formData.login, formData.password),
      ]);

      setResponse(result);
    } catch (error) {
      setResponse({
        success: false,
        message: error?.message || "Login failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="vh-100 d-flex justify-content-center align-items-center">
        <form className="col-md-6 col-lg-4 row gap-2" onSubmit={handleSubmit}>
          <div className="col-12">
            <input
              type="text"
              name="login"
              placeholder="Username or Email"
              className="form-control"
              value={formData.login}
              disabled={isLoading}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              value={formData.password}
              disabled={isLoading}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            {response && (
              <span
                className={response.success ? "text-success" : "text-danger"}>
                {response.data?.message || response.message}
              </span>
            )}
          </div>

          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loginLoading}>
              {loginLoading ? (
                <div className="spinner-grow spinner-grow-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
