import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken,resetUserSession,getUserInfo} from "../service/AuthService";
import Adminpanel from './Adminpanel'; 

function AdminpanelWrapper() {
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <Adminpanel />
  );
}

export default AdminpanelWrapper;
