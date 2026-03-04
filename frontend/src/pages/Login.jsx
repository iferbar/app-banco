import { useState } from 'react';
import LoginContainer from '../components/LoginContainer';
import Button from '../components/Button';
import InfoUsers from '../components/InfoUsers';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        throw new Error('Credenciales inválidas');
      }
      const data = await response.json();
      console.log('Inicio de sesión exitoso:', data);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };
  return (
    <LoginContainer>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Formulario de registro
        </h2>
        {/* Campo Usuario */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Usuario
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="
                  w-full px-4 py-3 rounded-lg border border-gray-300
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200
                "
            placeholder="juan"
            autoComplete="username"
          />
        </div>

        {/* Campo Contraseña */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="
                  w-full px-4 py-3 rounded-lg border border-gray-300
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200
                "
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" texto="Iniciar Sesión"></Button>
      </form>
      <InfoUsers />
    </LoginContainer>
  );
}

export default Login;
