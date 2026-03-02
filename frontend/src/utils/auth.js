//funciones simples para manejar autenticación con localstorage

export const saveUser = (user) =>
  localStorage.setItem('user', JSON.stringify(user));

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
export const clearUser = () => localStorage.removeItem('user');
export const isAuthenticated = () => {
  return !!localStorage.getItem('user');
};
