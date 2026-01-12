import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardBody, CardFooter } from '../common/Card';
import Button from '../common/Button';

const DeliveryCard = ({ delivery }) => {
  const {
    id,
    title,
    pickupLocation,
    dropoffLocation,
    price,
    status,
    createdAt,
    distance,
    productType,
  } = delivery;

  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Status badge colors
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <Card hoverable className="h-full flex flex-col">
      <CardBody className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900 truncate">{title}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
            {status.replace('_', ' ')}
          </span>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-start">
            <svg className="h-5 w-5 text-gray-400 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="text-sm text-gray-600 font-medium">Pickup</p>
              <p className="text-sm text-gray-500 truncate">{pickupLocation}</p>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="h-5 w-5 text-gray-400 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="text-sm text-gray-600 font-medium">Dropoff</p>
              <p className="text-sm text-gray-500 truncate">{dropoffLocation}</p>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="h-5 w-5 text-gray-400 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <p className="text-sm text-gray-500">{productType}</p>
          </div>

          {distance && (
            <div className="flex items-start">
              <svg className="h-5 w-5 text-gray-400 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <p className="text-sm text-gray-500">{distance} km</p>
            </div>
          )}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-blue-600">₹{price}</p>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
        </div>
      </CardBody>

      <CardFooter className="mt-auto">
        <Link to={`/delivery/${id}`}>
          <Button variant="primary" fullWidth>
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DeliveryCard;