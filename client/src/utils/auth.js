import decode from 'jwt-decode';

class AuthService {
  getUserId() {
    const profile = this.getProfile();
    return profile ? profile._id : null;
  }

  getProfile() {
    const token = this.getToken();
    if (token) {
      const decodedToken = decode(token);
      console.log('Decoded Token:', decodedToken);
      return decodedToken;
    } else {
      return null;
    }
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    const decodedToken = decode(idToken);
    console.log('Decoded Token:', decodedToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

const auth = new AuthService();
export default auth;

