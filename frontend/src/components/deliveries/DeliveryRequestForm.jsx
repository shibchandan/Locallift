import React, { useState } from 'react';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import SelectInput from '../common/SelectInput';
import Button from '../common/Button';

const DeliveryRequestForm = ({ onSubmit, isLoading, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    pickupLocation: initialData.pickupLocation || '',
    dropoffLocation: initialData.dropoffLocation || '',
    productType: initialData.productType || 'food',
    price: initialData.price || '',
    imageUrl: initialData.imageUrl || '',
    ...initialData
  });

  const PRODUCT_TYPE_OPTIONS = [
    { value: 'food', label: 'Food & Groceries' },
    { value: 'documents', label: 'Documents & Packages' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'medical', label: 'Medical Supplies' },
    { value: 'other', label: 'Other' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Simple AI suggestion for pricing based on product type and inputs
  const suggestPrice = () => {
    const basePrice = 100;
    let suggestedPrice = basePrice;
    
    // Adjust based on product type
    switch(formData.productType) {
      case 'electronics':
        suggestedPrice += 100;
        break;
      case 'medical':
        suggestedPrice += 50;
        break;
      case 'food':
        suggestedPrice += 25;
        break;
      default:
        break;
    }
    
    // Consider description length as a proxy for complexity
    if (formData.description.length > 100) {
      suggestedPrice += 25;
    }
    
    // Set the suggested price
    setFormData(prev => ({
      ...prev,
      price: suggestedPrice
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Input
          label="Delivery Title"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="E.g., Urgent food delivery from Restaurant XYZ"
          required
        />
        
        <TextArea
          label="Description"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Provide details about the items to be delivered, any special handling instructions, etc."
          rows={4}
          required
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Pickup Location"
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            placeholder="Full address where items should be picked up"
            required
          />
          
          <Input
            label="Dropoff Location"
            id="dropoffLocation"
            name="dropoffLocation"
            value={formData.dropoffLocation}
            onChange={handleChange}
            placeholder="Full address where items should be delivered"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectInput
            label="Product Type"
            id="productType"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            options={PRODUCT_TYPE_OPTIONS}
          />
          
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price Offer (₹)
              </label>
              <button 
                type="button" 
                onClick={suggestPrice}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Get AI Suggestion
              </button>
            </div>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="1"
              step="1"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Amount you're willing to pay"
              required
            />
          </div>
        </div>
        
        <Input
          label="Image URL (optional)"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
        
        <div className="pt-4">
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Creating Delivery Request...' : 'Create Delivery Request'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default DeliveryRequestForm;