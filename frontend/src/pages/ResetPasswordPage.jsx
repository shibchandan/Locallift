import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post(`/api/users/reset-password/${token}`, { password });
      setMessage(res.data.message || 'Password reset successful');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Reset link invalid or expired');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-4 border shadow">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2">Reset Password</button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default ResetPasswordPage;
