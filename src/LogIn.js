import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

const LogIn = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleEmailChange = (e) => {
setEmail(e.target.value);
};

const handlePasswordChange = (e) => {
setPassword(e.target.value);
};

const handleSubmit = (e) => {
e.preventDefault();
console.log("Form submitted with email:", email, "and password:", password);
};

const handleLoginFormSubmit = () => {
fetch("https://api.monjardin.online/api/auth/login", {
method: "POST",
headers: {
  "Authorization": "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJlbWFpbCI6ImhpbGFsYmFzdGFuQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJIaWxhbCBCYcWfdGFuIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiYWRtaW4iLCJuYmYiOjE2ODM4OTY2NjMsImV4cCI6MTY4NjA1NjY2MywiaXNzIjoiTW9uSmFyZGluIiwiYXVkIjoiYXBpLm1vbmphcmRpbi5vbmxpbmUifQ.S7mNeJP5KuqRwzPBqCD7N87oZExLjgn0hvgFqWFK-iNCeXlVDcS7uLV1jAxxEcM84i4XcEHBWbAqKBPaG39y1w",
  'Content-Type': 'application/json',
},
body: JSON.stringify({
email: email,
password: password
}),
})
.then((response) => response.json())
.then((data) => {
console.log(data);
// Handle the authentication token or any other response data
})
.catch((error) => {
console.error(error);
// Handle the error
});
};

return (
<div style={{ margin: "100px" }}>
<h1 style={{ textAlign: "center", fontStyle: "italic" }}>Hoşgeldiniz</h1>
<form onSubmit={handleSubmit}>
<div style={{ display: "block", justifyContent: "center", marginTop: "50px", textAlign: "center" }}>
<div>
<input
           type="email"
           placeholder="E-posta"
           value={email}
           onChange={handleEmailChange}
           className="input-action"
         />
</div>
<div style={{ marginTop: "20px", marginBottom: "20px" }}>
<input
           type="password"
           placeholder="Parola"
           value={password}
           onChange={handlePasswordChange}
           className="input-action"
         />
</div>
<div>
<NavLink style={{ color: "#893694", textDecoration: "none", fontStyle: "italic", marginRight: "290px" }} to='/Yeniparola'>Parolamı Unuttum</NavLink>
</div>
<div style={{ position: "relative", left: "130px" }}>
<button type="submit" onClick={handleLoginFormSubmit} className="button-action">Gönder</button>
</div>
</div>
<div style={{ textAlign: "center", display: "flex", justifyContent: "center", marginTop: "50px", marginBottom: "50px" }}>
<hr style={{ width: "20rem" }} />
<div style={{ marginLeft: "10px", marginRight: "10px", fontStyle: "italic", fontWeight: "300" }}>veya</div>
<hr style={{ width: "20rem" }} />
</div>
<p style={{ textAlign: "center", fontStyle: "italic", fontWeight: "300" }}>Hesabın yok mu?
<NavLink style={{ color: "#893694", textDecoration: "none", fontStyle: "italic", marginLeft: "20px" }} to='/Kayitol'>Kayıt Ol</NavLink>
</p>
</form>
</div>
);
};

export default LogIn;