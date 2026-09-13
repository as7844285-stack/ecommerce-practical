import { useState, memo } from "react";
import { axiosInstance } from "../axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);

    let newError = {};

    if (!email.trim()) {
      newError.email = "Email is required.";
    }

    if (!password.trim()) {
      newError.password = "Password is required.";
    }

    setError(newError);

    if (Object.keys(newError).length > 0) {
      return;
    }

    const obj = {
      email,
      password,
    };

    try {
      setLoading(true);
      const response = await axiosInstance.post("/user/login", obj);
      const token = response.data.token;
      localStorage.setItem("token", token);
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      alert("Login successful!");
      navigate("/");

      // Clear form
      setEmail("");
      setPassword("");
      setError({});
    } catch (err) {
      console.error(err);
      setError({
        server:
          err?.response?.data?.message ||
          "Login failed. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="productForm">
      <form onSubmit={handleSubmit}>
        <h1>Log In</h1>

        {error.server && <ErrorField field={error.server} />}

        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);

            if (submitted) {
              setError((prev) => ({
                ...prev,
                email: "",
                server: "",
              }));
            }
          }}
        />

        {error.email && <ErrorField field={error.email} />}

        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);

            if (submitted) {
              setError((prev) => ({
                ...prev,
                password: "",
                server: "",
              }));
            }
          }}
        />
        {error.password && <ErrorField field={error.password} />}

        <button
          type="submit"
          className="subBtn"
          disabled={loading}
          style={{ backgroundColor: loading ? "#aaa" : "#88bda4", border: "none" }}
        >
          {loading ? "Logging in..." : "Submit"}
        </button>

        <p style={{ textAlign: "center", marginTop: "15px", color: "#333" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#2563eb", fontWeight: "bold" }}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default memo(Login);

function ErrorField({ field }) {
  return (
    <p
      style={{
        color: "red",
        fontSize: "14px",
        marginTop: "5px",
      }}
    >
      {field}
    </p>
  );
}
