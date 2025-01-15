//below 3 libraries are same in other pages...
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { updateusername } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function Contacts({ contacts, changeChat }) {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  //here storing info about current user only..because while extracting contatcs 
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [isEditing,setIsEditing] = useState(false);
  
  //extracting info about the currrent user from the local storage...
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    
    //after extracting current user...setting the username and image!
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);

  //when ever we select any contact...this is handler..
  const changeCurrentChat = (index, contact) => {
    //setting the currentSelected value...
    setCurrentSelected(index);
    //
    changeChat(contact);
  };

 const handleSave = async () => {
    setIsEditing(false);
    const local_storage_data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const _id = local_storage_data._id;
    const {data} = await axios.post(updateusername, {
      _id,username:currentUserName
    });
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      // console.log("hey, just checking whether it worked or not...");
      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY,
        JSON.stringify(data.user)
      );
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleTextChange = (e) => {
    setCurrentUserName(e.target.value);
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          {/* here we are displaying the contacts on the page as a component... */}
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>ChatVerse</h3>
          </div>
          <div className="contacts">
            {/* showing the user chatcontainer based on clicking event... */}
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
            {isEditing ? (
              <h2>
                   <textarea value={currentUserName} onChange={handleTextChange} rows={1} />
                    <button onClick={handleSave}>Save</button>
              </h2>
            ):(<h2>
                  <div>{currentUserName}</div>
                  <button onClick={handleEditToggle}>Edit</button>
            </h2>
            )}
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

//styling the component here....!
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
        display:flex;
        button{
        height:3rem;
        }
        textarea{
          text-align:center;
        }
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
