export const saveToken = (access, refresh) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  };
  
  export const logoutUser = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };
  
  export const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
  };