import { useState, memo } from "react";
import { axiosInstance } from "../axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);

    let newError = {};

    if (!name.trim()) {
      newError.name = "Name field is required.";
    }

    if (!email.trim()) {
      newError.email = "Email field is required.";
    }

    if (!password.trim()) {
      newError.password = "Password field is required.";
    }

    setError(newError);

    if (Object.keys(newError).length > 0) {
      return;
    }

    const obj = {
      name,
      email,
      password,
    };

    try {
      setLoading(true);
      const response = await axiosInstance.post("/user/signup", obj);
      console.log(response.data);
      alert("Account created successfully! Please log in.");
      navigate("/login");

      setName("");
      setEmail("");
      setPassword("");
      setError({});
    } catch (err) {
      console.error(err);
      setError({
        server:
          err?.response?.data?.message || "Signup failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="productForm">
      <form onSubmit={handleSubmit}>
        <h1>Sign-Up</h1>

        {error.server && <ErrorField field={error.server} />}

        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (submitted) {
              setError((prev) => ({
                ...prev,
                name: "",
                server: "",
              }));
            }
          }}
        />
        {error.name && <ErrorField field={error.name} />}

        <input
          type="email"
          placeholder="Enter Your E-mail"
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
          placeholder="Password"
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
          {loading ? "Submitting..." : "Submit"}
        </button>

        <p style={{ textAlign: "center", marginTop: "15px", color: "#333" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#2563eb", fontWeight: "bold" }}>
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default memo(Signup);


 function ErrorField ({field}){
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
 };