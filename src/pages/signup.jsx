
import { useState, memo } from "react";
import { axiosInstance } from "../axios";
import { useNavigate } from "react-router-dom";
//  const Signup = () => {
  const Signup = ()=>{
    const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [submitted, setSubmitted] = useState(false);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);

    let newError = {};

    if (!name.trim()) {
      newError.name = " name field is required";
    }

    if (!email.trim()) {
      newError.email = "email field is required.";
    }

    if (!password.trim()) {
      newError.passwor = "password field is required.";
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

    console.log("submittd data :", obj);

    const response= await axiosInstance.post("/user/signup", obj);
         console.log(response.data);
         navigate("/login");
    alert("detailed filled successfully");

    setName("");
    setEmail("");
    setPassword("");
    setError({});
  };

  return (
    <div className="productForm">
      <form onSubmit={handleSubmit}>
        <h1>Sign-Up</h1>
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
              }));
            }
          }}
        />
        {error.email && <ErrorField field={error.email} />}
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (submitted) {
              setError((prev) => ({
                ...prev,
                email: "",
              }));
            }
          }}
        />
        {error.password && <ErrorField field={error.password} />}
        <button className="subBtn" style={{background:"gray"}}>Submit</button>
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