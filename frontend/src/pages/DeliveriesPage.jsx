import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeliveryList from '../components/deliveries/DeliveryList';
import FilterBar from '../components/deliveries/FilterBar';
import Button from '../components/common/Button';

// Mock delivery data - to be replaced with actual API calls
import { MOCK_DELIVERIES } from '../utils/mockData';

const DeliveriesPage = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    productType: '',
    sortBy: 'newest',
  });

  useEffect(() => {
    // Simulate API call
    const fetchDeliveries = async () => {
      try {
        setIsLoading(true);
        // In production, this would be an API call
        // const response = await fetch('/api/deliveries');
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          setDeliveries(MOCK_DELIVERIES);
          setFilteredDeliveries(MOCK_DELIVERIES);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
        setIsLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  const applyFilters = () => {
    let filtered = [...deliveries];

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(delivery => delivery.status === filters.status);
    }

    // Apply product type filter
    if (filters.productType) {
      filtered = filtered.filter(delivery => delivery.productType === filters.productType);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'distance':
        filtered.sort((a, b) => a.distance - b.distance);
        break;
      default:
        break;
    }

    setFilteredDeliveries(filtered);
  };

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveries]); // Only re-apply automatically when deliveries change, not when filters change

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Delivery Requests</h1>
          <p className="text-gray-600 mt-1">
            Browse available delivery requests in your area
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/create-delivery">
            <Button>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create New Request
            </Button>
          </Link>
        </div>
      </div>

      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        onApplyFilters={applyFilters} 
      />

      <DeliveryList 
        deliveries={filteredDeliveries} 
        isLoading={isLoading}
        emptyMessage="No delivery requests match your filters"
      />
    </div>
  );
};

export default DeliveriesPage;