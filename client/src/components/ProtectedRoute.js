import { message } from "antd";
import React, { useState, useEffect } from "react"; // Import useEffect
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
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
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      dispatch(HideLoading());
      dispatch(SetUser(null));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <div className="layout p-1">
        <div className="header bg-primary flex justify-between p-2">
          <div className="text-2x1 text-white cursor-pointer" onClick={()=> navigate("/")}>
            <h1>FLICKFIX</h1>
          </div>
          <div className="bg-white p-1 flex gap-1">
            <i className="ri-user-line text-primary"></i>
            <h1 className="text-sm underline"
              onClick={() => {
                if (user.isAdmin) {
                  navigate("/admin");
                } else {
                  navigate("/profile")
                }
              }}

            >{user.name}</h1>

            <i
              className="ri-logout-box-r-fill ml-2"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            />
          </div>
        </div>
        <div className="content mt-1 p-1">{children}</div>
      </div>
    )
  );
}

export default ProtectedRoute;
