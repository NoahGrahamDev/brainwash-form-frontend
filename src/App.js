import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './AnimationStyles.css';


function App() {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.style.width = '100%';

    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.width = '';
    };
  }, []);
  
  
  
  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: '',
    websiteObjective: '',
    employeeID: '',     
    employeeIDConfirm: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.employeeID !== formData.employeeIDConfirm) {
      setError('Employee IDs do not match.');
      return;
    }
    try {
      const formResponse = await axios.post('http://localhost:5000/api/forms', formData);
      console.log('Form submission response:', formResponse.data);
      navigate('/submitted');
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('An error occurred during form submission. Check the console for more details.');
    }
  };
  

  return (
    <div className="animated-background" style={styles.container}>
      <h1 style={styles.heading}>Completed Sale Form</h1>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="employeeID"
          placeholder="Employee ID"
          value={formData.employeeID}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="employeeIDConfirm"
          placeholder="Confirm Employee ID"
          value={formData.employeeIDConfirm}
          onChange={handleChange}
          style={styles.input}
        />
         <input
          type="text"
          name="businessName"
          placeholder="Business Name"
          value={formData.businessName}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="businessDescription"
          placeholder="Business Description"
          value={formData.businessDescription}
          onChange={handleChange}
          style={styles.textarea}
        />
        <textarea
          name="websiteObjective"
          placeholder='What plan does this website need (e.g. "This website needs to have a map, Google ads, and e-commerce.")?'
          value={formData.websiteObjective}
          onChange={handleChange}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
}


const styles = {
  container: {
    fontFamily: 'Roboto, sans-serif',
    color: '#fff', 
    height: '100vh', 
    width: '100vw', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    overflow: 'hidden' 
  },
  heading: {
    marginBottom: '20px'
  },
  error: {
    marginBottom: '20px',
    color: 'red',
    fontSize: 30
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Roboto, sans-serif',
  },
  input: {
    padding: '15px',
    fontFamily: 'Roboto, sans-serif',
    margin: '10px 0',
    borderRadius: '20px', 
    border: '1px solid #b19cd9', 
    width: '300px',
    boxSizing: 'border-box',
    backgroundColor: '#f3e5f5', 
    color: '#4a148c'
  },
  textarea: {
    fontFamily: 'Roboto, sans-serif',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '20px',
    border: '1px solid #b19cd9',
    width: '300px',
    minHeight: '100px',
    resize: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#f3e5f5',
    color: '#4a148c'
  },
  button: {
    fontFamily: 'Roboto, sans-serif',
    padding: '10px 20px',
    margin: '10px 0',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#7e57c2',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};



export default App;
