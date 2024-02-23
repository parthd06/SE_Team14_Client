import { message } from "antd";
import React, { useState, useEffect } from "react"; // Import useEffect
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        setUser(response.data);
      } else {
        setUser(null);
        message.error(response.message);
      }
    } catch (error) {
      setUser(null);
      message.error(error.message);
    }
  };

  useEffect(() => {
    if(localStorage.getItem('token')) {
        getCurrentUser();
    } else {
        navigate('/login');
    }
    
  }, []);

  return (
    user && (
      <div>
        {user.name}
        {children}
      </div>
    )
  );
}

export default ProtectedRoute;
