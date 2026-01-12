import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Card, { CardBody, CardFooter } from '../components/common/Card';
import TextArea from '../components/common/TextArea';

// Mock data
import { getDeliveryDetails } from '../utils/mockData';

const DeliveryDetailsPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [delivery, setDelivery] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [offerPrice, setOfferPrice] = useState('');
  const [offerMessage, setOfferMessage] = useState('');
  const [submittingOffer, setSubmittingOffer] = useState(false);

  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      try {
        setIsLoading(true);
        // In production, this would be an API call
        // const response = await fetch(`/api/deliveries/${id}`);
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          const details = getDeliveryDetails(id);
          if (!details) {
            navigate('/deliveries', { replace: true });
            return;
          }
          setDelivery(details);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching delivery details:', error);
        setIsLoading(false);
      }
    };

    fetchDeliveryDetails();
  }, [id, navigate]);

  const handleCreateOffer = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      navigate('/login', { state: { from: `/delivery/${id}` } });
      return;
    }

    try {
      setSubmittingOffer(true);
      
      // In production, this would be an API call
      // await fetch(`/api/deliveries/${id}/offers`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ price: offerPrice, message: offerMessage })
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setOfferPrice('');
      setOfferMessage('');
      
      // Reload delivery details with new offer
      const updatedDetails = getDeliveryDetails(id);
      setDelivery(updatedDetails);
      
      setSubmittingOffer(false);
      alert('Your offer has been submitted successfully!');
    } catch (error) {
      console.error('Error submitting offer:', error);
      setSubmittingOffer(false);
      alert('Failed to submit offer. Please try again.');
    }
  };

  const isOwner = currentUser && delivery?.owner?.id === currentUser.id;
  const hasAlreadyOffered = delivery?.offers?.some(offer => offer.user.id === currentUser?.id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="h-64 bg-gray-200 rounded mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
            </div>
            
            <div>
              <div className="h-48 bg-gray-200 rounded mb-6"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!delivery) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Delivery Not Found</h2>
        <p className="text-gray-600 mb-6">The delivery request you're looking for doesn't exist or has been removed.</p>
        <Link to="/deliveries">
          <Button>Back to Deliveries</Button>
        </Link>
      </div>
    );
  }

  // Status badge colors
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  // Format date
  const formattedDate = new Date(delivery.createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{delivery.title}</h1>
          <div className="flex items-center mt-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[delivery.status] || 'bg-gray-100 text-gray-800'} mr-3`}>
              {delivery.status.replace('_', ' ')}
            </span>
            <span className="text-gray-500 text-sm">{formattedDate}</span>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Link to="/deliveries">
            <Button variant="outline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Deliveries
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Delivery Details */}
          <Card>
            <CardBody>
              <div className="space-y-6">
                {delivery.imageUrl && (
                  <div className="mb-6">
                    <img 
                      src={delivery.imageUrl} 
                      alt={delivery.title} 
                      className="w-full h-64 object-cover rounded-lg" 
                    />
                  </div>
                )}
                
                <div>
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-gray-700">{delivery.description || 'No description provided.'}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Pickup Location</h3>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-gray-400 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-gray-700">{delivery.pickupLocation}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Dropoff Location</h3>
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-gray-400 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-gray-700">{delivery.dropoffLocation}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Product Type</h3>
                    <p className="text-gray-700 capitalize">{delivery.productType.replace('_', ' ')}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Distance</h3>
                    <p className="text-gray-700">{delivery.distance} km</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Price Offer</h3>
                    <p className="text-lg font-bold text-blue-600">₹{delivery.price}</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Offers Section */}
          {isOwner && delivery.offers && delivery.offers.length > 0 && (
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4">Delivery Offers</h2>
                <div className="space-y-4">
                  {delivery.offers.map(offer => (
                    <div key={offer.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <img 
                            src={offer.user.avatar} 
                            alt={offer.user.name} 
                            className="h-10 w-10 rounded-full mr-3" 
                          />
                          <div>
                            <h3 className="font-medium">{offer.user.name}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <svg className="h-4 w-4 text-yellow-400 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span>{offer.user.ratings} · {offer.user.completedDeliveries} Deliveries</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-blue-600">₹{offer.price}</span>
                      </div>
                      <p className="text-gray-700">{offer.message}</p>
                      <div className="mt-3 flex justify-end">
                        <Button variant="success" size="sm">
                          Accept Offer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Request Owner */}
          <Card>
            <CardBody>
              <h2 className="text-xl font-semibold mb-4">Request by</h2>
              <div className="flex items-center">
                <img 
                  src={delivery.owner.avatar} 
                  alt={delivery.owner.name} 
                  className="h-12 w-12 rounded-full mr-4" 
                />
                <div>
                  <h3 className="font-medium">{delivery.owner.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="h-4 w-4 text-yellow-400 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{delivery.owner.ratings}</span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Make an Offer */}
          {!isOwner && delivery.status === 'pending' && !hasAlreadyOffered && (
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4">Make an Offer</h2>
                <form onSubmit={handleCreateOffer}>
                  <div className="mb-4">
                    <label htmlFor="offerPrice" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Price (₹)
                    </label>
                    <input
                      type="number"
                      id="offerPrice"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your price"
                      required
                      min="1"
                    />
                  </div>
                  
                  <TextArea
                    label="Message (optional)"
                    id="offerMessage"
                    value={offerMessage}
                    onChange={(e) => setOfferMessage(e.target.value)}
                    placeholder="Tell the requester why you're the best person for this delivery"
                    rows={3}
                  />
                  
                  <Button
                    type="submit"
                    fullWidth
                    disabled={submittingOffer || !currentUser}
                  >
                    {submittingOffer ? 'Submitting...' : 'Submit Offer'}
                  </Button>
                  
                  {!currentUser && (
                    <p className="mt-2 text-sm text-gray-500 text-center">
                      <Link to="/login" className="text-blue-600 hover:text-blue-800">
                        Log in
                      </Link> to submit an offer
                    </p>
                  )}
                </form>
              </CardBody>
            </Card>
          )}

          {hasAlreadyOffered && (
            <Card>
              <CardBody>
                <div className="text-center py-2">
                  <svg className="h-12 w-12 text-green-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900">Offer Submitted</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You've already submitted an offer for this delivery. Wait for the requester to respond.
                  </p>
                </div>
              </CardBody>
            </Card>
          )}

          {/* Actions */}
          {isOwner && (
            <Card>
              <CardBody>
                <h2 className="text-xl font-semibold mb-4">Actions</h2>
                <div className="space-y-3">
                  <Button variant="outline" fullWidth>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit Request
                  </Button>
                  
                  <Button variant="danger" fullWidth>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Cancel Request
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetailsPage;