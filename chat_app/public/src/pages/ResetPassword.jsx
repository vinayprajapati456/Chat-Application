//below all the libraries are used before itself....
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
//below all the libraries are used before...
import { useNavigate} from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetpasswordRoute } from "../utils/APIRoutes";


export default function ResetPassword(props) {
  const navigate = useNavigate();
  //entered input data by user in this page..
  const [values, setValues] = useState({
    username: "",
    email: "",
    otp:"",
    password: "",
    confirmPassword: "",
  });

  //toasterror styling..
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  //if already user is in localstrfe..redirect to chat page..
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  //live input changer...
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

//validating the input formm...
  const validateForm = () => {

    const { username, email,otp,password,confirmPassword } = values;
    if (username === "") {
      toast.error("Username is required.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false; 
    }else if(otp === ""){
      toast.error("Otp is required", toastOptions);
      return false; 
    }else if(password === "" || confirmPassword === "")
    {  
      toast.error("Password and ConfirmPassword is required. ", toastOptions);
      return false; 
    }else if(password!==confirmPassword){
        toast.error("Password is not matching with confirmPassword ", toastOptions);
        return false;
    }
    return true;
  }

//this func executes when we press submti button..
const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
        const { username,password,otp } = values;

        //storing the info in the backend....
        const { data } = await axios.post(resetpasswordRoute, {
          username,
          otp,
          password,
        });

        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
        //   localStorage.setItem(
        //     process.env.REACT_APP_LOCALHOST_KEY,
        //     JSON.stringify(data.user)
        //   );
        //go to login page!
          navigate("/login");
        }
      }
};

//normal form..
  return (
    <>
      {/* console.log({location.state.name}); */}
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>

          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>ChatVerse</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />

           <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />

        <input
            type="text"
            placeholder="OTP"
            name="otp"
            onChange={(e) => handleChange(e)}
          />

         <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Submit</button>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

//styled component for the pge...
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
