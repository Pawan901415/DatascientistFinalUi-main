import React from 'react';
import './FeatureHome.css';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';

const GridBox = ({ data }) => {
  const [countdown, setCountdown] = useState(data.countdown);

  useEffect(() => {
    // Update countdown every second
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid-box">
      <h3>{data.title}</h3>
      <p>{data.content}</p>
      <div className="countdown">Countdown: {countdown} seconds</div>
      <a href={data.moreLink} target="_blank" rel="noopener noreferrer">
        Read More
      </a>
    </div>
  );
};
const FeatureHome = () => {

  const gridData = [
    {
      title: 'Feature 1',
      content: 'Lorem ipsum dolor sit amet.',
      countdown: 60,
      moreLink: 'https://example.com/feature1',
    },
    {
      title: 'Feature 2',
      content: 'Consectetur adipiscing elit.',
      countdown: 120,
      moreLink: 'https://example.com/feature2',
    },
    {
      title: 'Feature 3',
      content: 'Sed do eiusmod tempor incididunt.',
      countdown: 180,
      moreLink: 'https://example.com/feature3',
    },
    {
      title: 'Feature 4',
      content: 'Ut labore et dolore magna aliqua.',
      countdown: 240,
      moreLink: 'https://example.com/feature4',
    },
    {
      title: 'Feature 5',
      content: 'Ut enim ad minim veniam.',
      countdown: 300,
      moreLink: 'https://example.com/feature5',
    },
    {
      title: 'Feature 6',
      content: 'Quis nostrud exercitation ullamco laboris.',
      countdown: 360,
      moreLink: 'https://example.com/feature6',
    },
    // Add more grid box data as needed
  ];
  return (
  <>
    <div className="landing-page">
      
      <div className="grid-container">
        {/* Left Side - Grids */}
        <div className="grids">
          <h2>Popular Entities</h2>
          <div className="grid-group">
            {gridData.map((data, index) => (
              <GridBox key={index} data={data}/>
              
            ))}
            
          </div>
        </div>
      </div>

      
    

      <div className="table-container">
        {/* Right Side - Table */}
        <table className="data-table">
          <thead>
            <tr>
              <th>Entity Name</th>
              <th>Feature Name</th>
              <th>Feature Value</th>
              <th>Feature Type</th>
              <th>Timestamp</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {/* Sample data */}
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>25</td>
              <td>John Doe</td>
              <td>25</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Doe</td>
              <td>30</td>
              <td>John Doe</td>
              <td>25</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Doe</td>
              <td>30</td>
              <td>John Doe</td>
              <td>25</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Doe</td>
              <td>30</td>
              <td>John Doe</td>
              <td>25</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Doe</td>
              <td>30</td>
              <td>John Doe</td>
              <td>25</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Doe</td>
              <td>30</td>
              <td>John Doe</td>
              <td>25</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Doe</td>
              <td>30</td>
              <td>John Doe</td>
              <td>25</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Doe</td>
              <td>30</td>
              <td>John Doe</td>
              <td>25</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Doe</td>
              <td>30</td>
              <td>John Doe</td>
              <td>25</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Doe</td>
              <td>30</td>
              <td>John Doe</td>
              <td>25</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Doe</td>
              <td>30</td>
              <td>John Doe</td>
              <td>25</td>
            </tr>
            {/* Add more table rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
    <br></br>
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@example.com</p>
          <p>Phone: +123 456 789</p>
        </div>
        <div className="footer-section">
          <h3>Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Team1 Website. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
};

export default FeatureHome;
