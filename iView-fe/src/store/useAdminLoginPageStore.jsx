import { create } from 'zustand';

const useAdminLoginPageStore = create((set) => ({
  username: '',
  password: '',
  setUsername: (username) => set(() => ({ username })),
  setPassword: (password) => set(() => ({ password })),
  
  // Login function with backend integration
  login: async () => {
    const { username, password } = useAdminLoginPageStore.getState();
    
    try {
      // Make a POST request to your backend API for login
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Send username and password to the backend
      });

      const data = await response.json(); // Parse the response

      // Check if login was successful based on backend response
      if (response.ok && data.success) {
        alert('Login Successful');
        // You can save authentication tokens here if needed, like data.token
      } else {
        alert(data.message || 'Login Failed'); // Display error message from backend
      }

    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again later.');
    }
  },
}));

export default useAdminLoginPageStore;
