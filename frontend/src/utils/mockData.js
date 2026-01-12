// Mock data for deliveries
export const MOCK_DELIVERIES = [
  {
    id: '1',
    title: 'Urgent Food Delivery from Taj Restaurant',
    description: 'Need someone to pick up my food order from Taj Restaurant and deliver it to my home address. The order is already paid for.',
    pickupLocation: '123 Main St, Taj Restaurant',
    dropoffLocation: '456 Elm St, Apartment 3B',
    price: 150,
    status: 'pending',
    createdAt: '2023-07-28T10:00:00Z',
    distance: 3.2,
    productType: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '2',
    title: 'Document Delivery to Office',
    description: 'Need someone to deliver important signed documents from my home to my office. The documents are ready in an envelope.',
    pickupLocation: '789 Oak Ave, Building 7',
    dropoffLocation: '101 Corporate Blvd, Suite 500',
    price: 200,
    status: 'accepted',
    createdAt: '2023-07-28T09:30:00Z',
    distance: 5.7,
    productType: 'documents',
  },
  {
    id: '3',
    title: 'Grocery Shopping and Delivery',
    description: 'Need help with grocery shopping from the local supermarket. Shopping list will be provided.',
    pickupLocation: 'SuperMart, 555 Market St',
    dropoffLocation: '222 Pine Lane',
    price: 300,
    status: 'in_progress',
    createdAt: '2023-07-27T16:45:00Z',
    distance: 2.1,
    productType: 'food',
  },
  {
    id: '4',
    title: 'Medicine Pickup from Pharmacy',
    description: 'Need someone to pick up prescription medication from the pharmacy. I will provide the prescription details.',
    pickupLocation: 'HealthPlus Pharmacy, 888 Health Ave',
    dropoffLocation: '777 Recovery Rd',
    price: 120,
    status: 'pending',
    createdAt: '2023-07-27T14:20:00Z',
    distance: 1.8,
    productType: 'medical',
    imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '5',
    title: 'Electronics Delivery',
    description: 'Need to deliver a new laptop to my client. The laptop is boxed and ready for delivery.',
    pickupLocation: 'Tech Solutions, 999 Tech Blvd',
    dropoffLocation: '444 Client St, Office 2C',
    price: 350,
    status: 'completed',
    createdAt: '2023-07-26T11:00:00Z',
    distance: 7.4,
    productType: 'electronics',
  },
  {
    id: '6',
    title: 'Gift Delivery to Friend',
    description: 'Need to deliver a birthday gift to my friend. The gift is wrapped and ready for delivery.',
    pickupLocation: '333 Friendship Lane',
    dropoffLocation: '666 Celebration Ave',
    price: 180,
    status: 'cancelled',
    createdAt: '2023-07-26T09:15:00Z',
    distance: 4.3,
    productType: 'other',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
];

// Mock user data
export const MOCK_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    role: 'customer',
    ratings: 4.8,
    completedDeliveries: 0
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+91 9876543211',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    role: 'driver',
    ratings: 4.9,
    completedDeliveries: 124
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '+91 9876543212',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    role: 'driver',
    ratings: 4.7,
    completedDeliveries: 78
  }
];

// Mock delivery offers
export const MOCK_OFFERS = [
  {
    id: '1',
    deliveryId: '1',
    userId: '2',
    price: 150,
    message: 'I can pick this up immediately and deliver within 30 minutes.',
    createdAt: '2023-07-28T10:15:00Z',
    status: 'pending'
  },
  {
    id: '2',
    deliveryId: '1',
    userId: '3',
    price: 140,
    message: 'I can deliver in 45 minutes. I\'m close to the restaurant.',
    createdAt: '2023-07-28T10:20:00Z',
    status: 'pending'
  }
];

// Mock delivery details with additional information
export const getDeliveryDetails = (id) => {
  const delivery = MOCK_DELIVERIES.find(d => d.id === id);
  if (!delivery) return null;

  const offers = MOCK_OFFERS.filter(o => o.deliveryId === id);
  const offersWithUserDetails = offers.map(offer => {
    const user = MOCK_USERS.find(u => u.id === offer.userId);
    return {
      ...offer,
      user: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        ratings: user.ratings,
        completedDeliveries: user.completedDeliveries
      }
    };
  });

  // Find owner details
  const owner = MOCK_USERS.find(u => u.id === '1'); // For mock purposes, user 1 is the owner

  return {
    ...delivery,
    owner: {
      id: owner.id,
      name: owner.name,
      avatar: owner.avatar,
      ratings: owner.ratings
    },
    offers: offersWithUserDetails
  };
};