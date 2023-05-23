module.exports = {
    getUser: function () {
      const user = sessionStorage.getItem("user");
      if (user === "undefined" || !user) {
       // console.log("user unddefined", user);
        return null;
      } else {
       // console.log("user geldi", user);
        return JSON.parse(user);
      }
    },
    getToken: function () {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken === "undefined" || storedToken === null) {
          return null;
        } else {
          return storedToken;
        }
      },
      
      
    setUserSession: function (token) {
      //sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token", token);
    
    },
    resetUserSession: function () {
     //sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    }
  };
  