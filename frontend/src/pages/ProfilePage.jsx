import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Card, { CardBody, CardFooter } from '../components/common/Card';
import Button from '../components/common/Button';
import DeliveryList from '../components/deliveries/DeliveryList';

// Mock data
import { MOCK_DELIVERIES, MOCK_USERS } from '../utils/mockData';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('myDeliveries');
  const [isLoading, setIsLoading] = useState(true);
  const [myDeliveries, setMyDeliveries] = useState([]);
  const [myOffers, setMyOffers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        // In production, this would be API calls
        // const deliveriesResponse = await fetch('/api/user/deliveries');
        // const offersResponse = await fetch('/api/user/offers');
        
        // Using mock data for now
        setTimeout(() => {
          // Filter deliveries for current user (owner ID is 1 in mock data)
          const userDeliveries = MOCK_DELIVERIES.filter(d => currentUser.role === 'customer');
          setMyDeliveries(userDeliveries);
          
          // For drivers, show deliveries with their offers
          const userOffers = currentUser.role === 'driver' ? 
            MOCK_DELIVERIES.filter((_, index) => index < 3) : [];
          setMyOffers(userOffers);
          
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <div className="p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Authentication Required</h3>
            <p className="mt-1 text-sm text-gray-500">
              You need to be logged in to view your profile.
            </p>
            <div className="mt-6">
              <Link to="/login" state={{ from: '/profile' }}>
                <Button>
                  Log In
                </Button>
              </Link>
              <Link to="/register" className="ml-3">
                <Button variant="outline">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Get mock user info
  const userInfo = currentUser.id ? 
    MOCK_USERS.find(u => u.id === currentUser.id) || {
      name: currentUser.name || 'User',
      email: currentUser.email || 'user@example.com',
      phone: currentUser.phone || '+91 9876543210',
      avatar: currentUser.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg',
      role: currentUser.role || 'customer',
      ratings: 4.5,
      completedDeliveries: currentUser.role === 'driver' ? 42 : 0
    } : {
      name: currentUser.name || 'User',
      email: currentUser.email || 'user@example.com',
      phone: currentUser.phone || '+91 9876543210',
      avatar: currentUser.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg',
      role: currentUser.role || 'customer',
      ratings: 4.5,
      completedDeliveries: currentUser.role === 'driver' ? 42 : 0
    };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardBody>
              <div className="flex flex-col items-center text-center">
                <img 
                  src={userInfo.avatar}
                  alt={userInfo.name} 
                  className="h-24 w-24 rounded-full object-cover"
                />
                <h2 className="mt-4 text-xl font-semibold text-gray-900">{userInfo.name}</h2>
                <p className="text-gray-500 capitalize">{userInfo.role}</p>
                
                {userInfo.role === 'driver' && (
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <svg className="h-4 w-4 text-yellow-400 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{userInfo.ratings} · {userInfo.completedDeliveries} Deliveries</span>
                  </div>
                )}
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-gray-900">{userInfo.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="mt-1 text-gray-900">{userInfo.phone}</p>
                  </div>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <Link to="/edit-profile">
                <Button variant="outline" fullWidth>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit Profile
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardBody>
              <h3 className="font-medium text-gray-900 mb-3">Account Settings</h3>
              <div className="space-y-3">
                <Link to="/change-password" className="flex items-center text-gray-700 hover:text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Change Password
                </Link>
                <Link to="/notifications" className="flex items-center text-gray-700 hover:text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  Notification Settings
                </Link>
                <Link to="/payment-methods" className="flex items-center text-gray-700 hover:text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Payment Methods
                </Link>
                <button 
                  onClick={logout}
                  className="flex items-center text-red-600 hover:text-red-800 w-full text-left"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 5a1 1 0 01-1 1H4a1 1 0 110-2h5a1 1 0 011 1zm2 4a1 1 0 00-1-1H4a1 1 0 100 2h7a1 1 0 001-1zm0 4a1 1 0 00-1-1H4a1 1 0 100 2h7a1 1 0 001-1z" clipRule="evenodd" />
                  </svg>
                  Logout
                </button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Profile Content */}
        <div className="md:col-span-2">
          <Card>
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('myDeliveries')}
                  className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'myDeliveries'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {currentUser.role === 'customer' ? 'My Requests' : 'Available Jobs'}
                </button>
                
                {currentUser.role === 'driver' && (
                  <button
                    onClick={() => setActiveTab('myOffers')}
                    className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'myOffers'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    My Jobs
                  </button>
                )}
                
                <button
                  onClick={() => setActiveTab('history')}
                  className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'history'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  History
                </button>
              </nav>
            </div>
            
            <div className="p-4">
              {activeTab === 'myDeliveries' && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                      {currentUser.role === 'customer' ? 'My Delivery Requests' : 'Available Delivery Jobs'}
                    </h2>
                    
                    {currentUser.role === 'customer' && (
                      <Link to="/create-delivery">
                        <Button size="sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                          New Request
                        </Button>
                      </Link>
                    )}
                  </div>
                  
                  <DeliveryList 
                    deliveries={myDeliveries}
                    isLoading={isLoading}
                    emptyMessage={
                      currentUser.role === 'customer' 
                        ? "You haven't created any delivery requests yet"
                        : "No available delivery jobs at the moment"
                    }
                  />
                </>
              )}

              {activeTab === 'myOffers' && (
                <>
                  <h2 className="text-lg font-semibold mb-4">My Active Jobs</h2>
                  <DeliveryList 
                    deliveries={myOffers}
                    isLoading={isLoading}
                    emptyMessage="You don't have any active jobs"
                  />
                </>
              )}

              {activeTab === 'history' && (
                <>
                  <h2 className="text-lg font-semibold mb-4">Delivery History</h2>
                  <DeliveryList 
                    deliveries={[]}
                    isLoading={isLoading}
                    emptyMessage="Your delivery history will appear here"
                  />
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;