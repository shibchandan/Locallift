import React from 'react';
import DeliveryCard from './DeliveryCard';

const DeliveryList = ({ deliveries, isLoading, emptyMessage = "No deliveries found" }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-4 mt-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-4 mt-4"></div>
              <div className="h-20 bg-gray-200 rounded mx-4 mt-4"></div>
              <div className="h-8 bg-gray-200 rounded mx-4 my-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!deliveries || deliveries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg text-center">
        <svg className="h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 className="mt-2 text-xl font-medium text-gray-900">{emptyMessage}</h3>
        <p className="mt-1 text-gray-500">Check back later for new delivery opportunities.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {deliveries.map((delivery) => (
        <DeliveryCard key={delivery.id} delivery={delivery} />
      ))}
    </div>
  );
};

export default DeliveryList;