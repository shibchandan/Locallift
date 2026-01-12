import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryRequestForm from '../components/deliveries/DeliveryRequestForm';
import { MOCK_DELIVERIES } from '../utils/mockData';
import Card from '../components/common/Card';

const CreateDeliveryPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setError('');

      // In a real app, we'd submit to an API endpoint
      // await fetch('/api/deliveries', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // For now, simulate a network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update local mock data (in a real app this would be handled by the backend)
      const newDelivery = {
        id: Math.floor(Math.random() * 10000).toString(),
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        offers: []
      };
      
      MOCK_DELIVERIES.unshift(newDelivery);
      
      // Navigate to the deliveries page after successful submission
      navigate('/deliveries');
      
    } catch (err) {
      console.error('Failed to create delivery:', err);
      setError('Failed to create delivery request. Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create a Delivery Request</h1>
      
      <div className="max-w-2xl mx-auto">
        <Card>
          <div className="p-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <DeliveryRequestForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />

            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Our AI-powered system will help match your delivery request with the most suitable drivers in your area. For better results, please provide accurate and detailed information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateDeliveryPage;