import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import Adminpanel from './Adminpanel';
import React, { useState } from 'react';

export default function AdminLogin() {


   

    
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [redirectToAdmin, setRedirectToAdmin] = useState(false);
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        // burada, kullanıcı adı ve şifreyi bir API'ye gönderip doğrulayabilirsiniz
        // bu örnekte, doğrulama her zaman başarılı olur
        setRedirectToAdmin(true);
      };
      if (redirectToAdmin) {
        return <Redirect to="/Adminpanel" />;
      }
    
      return (
        <form onSubmit={handleSubmit}>
          <label>
            Kullanıcı Adı:
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <label>
            Şifre:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button type="submit">Giriş Yap</button>
        </form>
      );
    };
    
    

    

