import React from 'react';
import { Link } from 'react-router-dom';
import './style/NotHeader.css'; 

const NotHeader = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default NotHeader;
