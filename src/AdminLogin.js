import { BrowserRouter as Router, Routes, Route, Navigate, Redirect } from 'react-router-dom';
import Adminpanel from './Adminpanel';
import React, { useState } from 'react';

export default function AdminLogin() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToAdminpanel, setRedirectToAdminpanel] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // burada, kullanıcı adı ve şifreyi bir API'ye gönderip doğrulayabilirsiniz
    // bu örnekte, doğrulama her zaman başarılı olur
    setRedirectToAdminpanel(true);
  };

  const handleAdminPanelLoad = () => {
    try {
      // Burada Adminpanel bileşenini yükleyebilirsiniz. Eğer bir hata oluşursa, catch bloğunda işlenecektir.
      return <Adminpanel />
    } catch (error) {
      setIsError(true);
      return null;
    }
  };

  if (redirectToAdminpanel) {
    return <Redirect to="/adminpanel" />;
  }

  return (
    <form className='admisgiris'  onSubmit={handleSubmit}>
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
      {isError && <p>Hata oluştu.</p>}
    </form>
  );
}
