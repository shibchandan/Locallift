import { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/forgot-password', { email });
      setMessage(res.data.message || 'Reset link sent to your email.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error sending reset link');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-4 border shadow">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2">Send Reset Link</button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
