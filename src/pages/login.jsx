import { useState, memo } from "react";
import { axiosInstance } from "../axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);

    let newError = {};

    if (!email.trim()) {
      newError.email = "Email is required.";
    }

    if (!password.trim()) {
      newError.password = "Password  is required.";
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

    console.log( " submitted data " , obj);

    const responese=await axiosInstance.post("/user/login", obj);
    console.log(responese.data);
       navigate("/");
       

    const token = responese.data.token;
    localStorage.setItem("token", token);

    console.log("Token saved",token);
    

    // Clear form
    setEmail("");
    setPassword("");
    setError({});
  };

  return (
    <div className="productForm">
      <form onSubmit={handleSubmit}>
        <h1>Log in </h1>

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
              }));
            }
          }}
        />
        {error.password && <ErrorField field={error.password} />}

        <button type="submit" className="subBtn" style={{backgroundColor:"gray"}}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default memo(Signup);

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
