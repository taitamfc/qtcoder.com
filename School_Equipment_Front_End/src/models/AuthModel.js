import axiosClient from './axiosClient';

class AuthModel {
  constructor() {
    this.api_url = "/api/auth/";
  }
  async login(credentials) {
    // //console.log(credentials);
    const res = await axiosClient.post(this.api_url + "login", credentials);
    return res;
  }

  async fogotpassword(email) {
    // //console.log(credentials);
    const res = await axiosClient.post(this.api_url + "forgot_password", email );
    return res;
  }

  async logout() {
    try {
      let token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axiosClient.post(this.api_url + "logout", null, config);
      return true;
    } catch (err) {
      return false;
    }
  }

  getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  setCookie(cname, cvalue, minutes) {
    const d = new Date();
    d.setTime(d.getTime() + minutes * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  deleteCookie(name) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
}

export default new AuthModel();