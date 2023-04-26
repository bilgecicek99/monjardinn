import Adminpanel from './Adminpanel';
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [redirectToAdminpanel, setRedirectToAdminpanel] = useState(false);
  const [isError, setIsError] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // burada, kullanıcı adı ve şifreyi bir API'ye gönderip doğrulayabilirsiniz
    // bu örnekte, doğrulama her zaman başarılı olur
    setRedirectToAdminpanel(true);
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    // burada, kullanıcının şifresini sıfırlama isteği bir API'ye gönderilebilir
    // bu örnekte, sıfırlama işlemi her zaman başarılı olur
    alert('Şifreniz sıfırlandı!');
    setPassword(newPassword);
    setForgotPassword(false);
  }

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
    navigate('/Adminpanel');
  }

  if (forgotPassword) {
    return (
      <form className='admisgiris' onSubmit={handleForgotPassword}>
        <label>
          Yeni Şifre:
          <input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </label>
        <button type="submit">Şifremi Sıfırla</button>
        <button type="button" onClick={() => setForgotPassword(false)}>İptal</button>
      </form>
    );
  }

  return (
    <div  style={{ margin: "100px" }}>
      <h1 className='hosgeldiniz'>Hoşgeldiniz</h1>
      <form className='admisgiris' onSubmit={handleSubmit}>
        <label>
          
          <input placeholder='E-posta adresiniz' 
            type="textarea"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          
          <input placeholder='Parolanız' 
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button  type="submit">Gönder</button>
        <button type="button" onClick={() => setForgotPassword(true)}>Şifremi Unuttum</button>
        {isError && <p>Hata oluştu.</p>}
      </form>
    </div>
  );
}
