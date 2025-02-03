import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const navbarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px 30px',
    background: 'linear-gradient(135deg, #a8c0ff, #3f87f5)',  // Softer gradient background
    color: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
  };

  const h1 = {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const ulStyle = {
    listStyleType: 'none',
    display: 'flex',
    margin: '0',
  };

  const liStyle = {
    margin: '0 20px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontSize: '18px',
    fontWeight: '500',
    transition: 'color 0.3s, transform 0.2s ease',
  };

  const linkHoverStyle = {
    color: '#ffeb3b',  // Soft yellow for hover effect
    transform: 'scale(1.05)', // Slight zoom effect on hover
  };

  return (
    <nav style={navbarStyle}>
      <div className="navbar-logo">
        <Link to="/">
          <h1 style={h1}>FluxBlog</h1>
        </Link>
      </div>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link
            to="/"
            style={linkStyle}
            onMouseOver={(e) => e.target.style.color = linkHoverStyle.color}
            onMouseOut={(e) => e.target.style.color = linkStyle.color}
          >
            Homepage
          </Link>
        </li>
        <li style={liStyle}>
          <Link
            to="/post"
            style={linkStyle}
            onMouseOver={(e) => e.target.style.color = linkHoverStyle.color}
            onMouseOut={(e) => e.target.style.color = linkStyle.color}
          >
            Add Post
          </Link>
        </li>
        <li style={liStyle}>
          <Link
            to="/login"
            style={linkStyle}
            onMouseOver={(e) => e.target.style.color = linkHoverStyle.color}
            onMouseOut={(e) => e.target.style.color = linkStyle.color}
          >
            Login
          </Link>
        </li>
        <li style={liStyle}>
          <Link
            to="/signup"
            style={linkStyle}
            onMouseOver={(e) => e.target.style.color = linkHoverStyle.color}
            onMouseOut={(e) => e.target.style.color = linkStyle.color}
          >
            Signup
          </Link>
        </li>
        <li style={liStyle}>
          <Link
            to="/profile"
            style={linkStyle}
            onMouseOver={(e) => e.target.style.color = linkHoverStyle.color}
            onMouseOut={(e) => e.target.style.color = linkStyle.color}
          >
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
