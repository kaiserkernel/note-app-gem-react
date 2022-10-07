import React, { useContext, useEffect, useState } from 'react'
import './Sidenav.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import GlobalContext from '../../context/GlobalContext';

const Sidenav = ({ notesList, setNotesList, getAllNotes }) => {
    const [searchText, setSearchText] = useState("");

    const { theme ,setTheme } = useContext(GlobalContext)
    const navigate = useNavigate();
 
    const logout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('auth-token');
        navigate('/login');
    }

    const toggleSideNav = () => {
        const body = document.querySelector('body'),
        sidebar = body.querySelector('nav');
        
        sidebar.classList.toggle("close");

        // searchBtn.addEventListener("click" , () =>{
        //     sidebar.classList.remove("close");
        // })
    }

    
    const searchbarClick = () => {
        const body = document.querySelector('body'),
            sidebar = body.querySelector('nav');

        sidebar.classList.remove("close");
    }


    const searchNotesFromDB = async () => {
        const authtoken = sessionStorage.getItem('auth-token');
        const response = await fetch(`http://localhost:8181/api/notes/search/${searchText}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authtoken
            }
        });
        const json = await response.json();
        setNotesList(json);
    }


    useEffect(() => {
        // console.log(searchText);
        if (searchText !== "") {
            searchNotesFromDB();
        }
        else {
            getAllNotes();
        }
    }, [searchText]);

    useEffect(() => {
        console.log(notesList);
    }, [notesList]);

    useEffect(() => {
        console.log(notesList);
    }, [])
    
    



  return (
    <nav className="sidebar close" id ={theme}>
      <header>
          <div className="image-text">
              <span className="image">
                  <img src={logo} alt=""/>
              </span>

              <div className="text logo-text">
                  <span className="name">Noteslify</span>
                  <span className="profession">By DVS Tech Labs</span>
              </div>
          </div>

          <i onClick={toggleSideNav} className="fa-solid fa-circle-chevron-right toggle"></i>
      </header>

      <div className="menu-bar">
          <div className="menu">

              <li onClick={searchbarClick} className="search-box">
                  <i className="fa-solid fa-magnifying-glass icon"></i>
                  <input value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search..."/>
              </li>

              <ul className="menu-links">
                  <li className="nav-link">
                        <Link to={'/notes'}>
                          <i className="fa-solid fa-house icon"></i>
                          <span className="text nav-text">Dashboard</span>
                        </Link>
                  </li>

                  <li className="nav-link">
                        <Link to={'/myaccount'}>
                          <i className="fa-solid fa-circle-user icon"></i>
                          <span className="text nav-text">My Account</span>
                        </Link>
                  </li>

                  <li className="nav-link">
                      <a href="/">
                          <i className="fa-regular fa-bell icon"></i>
                          <span className="text nav-text">Soon..</span>
                      </a>
                  </li>

                  <li className="nav-link">
                      <Link to={'/bin'}>
                          <i className="fa-solid fa-trash icon"></i>
                          <span className="text nav-text">Bin</span>
                      </Link>
                  </li>

                  <li className="nav-link">
                      <a href="/">
                          <i className="fa-regular fa-heart icon"></i>
                          <span className="text nav-text">Soon..</span>
                      </a>
                  </li>

                  <li className="nav-link">
                      <a href="/">
                          <i class="fa-solid fa-wallet icon"></i>
                          <span className="text nav-text">Soon..</span>
                      </a>
                  </li>

              </ul>
          </div>

          <div className="bottom-content">
              <li>
                  <a onClick={logout} href="/" id="logout-button">
                      <i className="fa-solid fa-arrow-right-from-bracket icon"></i>
                      <span className="logout">Logout</span>
                  </a>
              </li>
              
          </div>
      </div>
  </nav>
  )
}

export default Sidenav