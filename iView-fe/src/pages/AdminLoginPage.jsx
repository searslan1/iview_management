import React from 'react';
import { MdEmail, MdLock } from 'react-icons/md'; // Import icons
import InputField from '../components/InputField';
import Button from '../components/Button';
import useLoginStore from '../store/useAdminLoginPageStore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginPage = () => {
  const { email, password, setEmail, setPassword, login } = useLoginStore();
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = () => {
    login();
    navigate('/admin-page'); // Redirect after login
  };

  return (
    <div className="flex h-screen">
      {/* Left side (Form Area) */}
      <div className="w-1/3 p-8 rounded-l-lg" style={{ backgroundColor: '#EEFAF9' }}>
        <h1 className="text-2xl font-bold mb-8 text-gray-600">Admin Log-in Page</h1>
        <form>
          <div className="flex items-center">
            <MdEmail className="mr-2 mt-5 text-gray-600" /> {/* Email icon */}
            <InputField
              label="E-mail"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="Enter your email"
            />
          </div>
          <div className="flex items-center mt-4">
            <MdLock className="mr-2 mt-5 text-gray-600" /> {/* Password icon */}
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Enter your password"
            />
          </div>
          <Button
            label="Log in"
            onClick={handleLogin}
            className="text-gray-700 font-semibold hover:text-[#47A7A2] border border-gray-700 p-2 rounded mt-6"
          />
        </form>
      </div>

      {/* Right side (Image Area) */}
      <div className="w-2/3 bg-gray-50 flex justify-center items-center">
        {/* You can place your image here */}
        <img src="https://remotetech.work/assets/img/logo/logo.svg" alt="Logo" className="w-2/3" />
      </div>
    </div>
  );
};

export default LoginPage;
