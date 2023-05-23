module.exports = {
    
    getToken: function () {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken === "undefined" || storedToken === null) {
          return null;
        } else {
          return storedToken;
        }
      },
      getEmail: function () {
        const storedToken = sessionStorage.getItem("email");
        if (storedToken === "undefined" || storedToken === null) {
          return null;
        } else {
          return storedToken;
        }
      },
      getUserInfo: function () {
        const storedUser = sessionStorage.getItem("userInfo");
      
        if (storedUser === "undefined" || storedUser === null) {
          return null;
        } else {
          try {
            const user = JSON.parse(storedUser);
            return user;
          } catch (error) {
            console.error("JSON parsing error:", error);
            return null;
          }
        }
      },
      
      
      
    setUserSession: function (token,email) {
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("token", token);
    },
    setUserDetail: function (userInfo) {
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
     
    },
    resetUserSession: function () {
     //sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("userInfo");
    }
  };
  