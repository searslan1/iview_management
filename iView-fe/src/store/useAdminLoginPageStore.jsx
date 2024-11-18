import { create } from 'zustand';
import axios from 'axios';


const apiUrl = process.env.VITE_API_URL;

const useAdminLoginPageStore = create((set) => ({
  username: '',
  password: '',
  setUsername: (username) => set(() => ({ username })),
  setPassword: (password) => set(() => ({ password })),
  
  // Login function with backend integration using axios
  login: async () => {
    const { username, password } = useAdminLoginPageStore.getState();
    try {
      // Dinamik API URL'sini kullanıyoruz
      const response = await axios.post(`${apiUrl}/api/auth/login`, {
        username,
        password,
      });
      
      // Check if login was successful based on backend response
      if (response.status === 200 && response.data.success) {
        alert('Login Successful');
        // Save authentication tokens here if needed, like response.data.token
        return true;
      } else {
        alert(response.data.message || 'Login Failed'); // Display error message from backend
        return false;
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again later.');
      return false;
    }
  },
}));

export default useAdminLoginPageStore;
