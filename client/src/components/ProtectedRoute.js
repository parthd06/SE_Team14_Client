import { message } from "antd";
import React, { useState, useEffect } from "react"; // Import useEffect
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";

function ProtectedRoute({ children }) {
  const {user} = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      dispatch(HideLoading());
      if (response.success) {
        
        dispatch(SetUser(response.data));
      } else {
        dispatch(SetUser(null));
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      dispatch(SetUser(null));
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
