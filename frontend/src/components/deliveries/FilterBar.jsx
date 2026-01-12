import React from 'react';
import SelectInput from '../common/SelectInput';
import Button from '../common/Button';

const FilterBar = ({ filters, setFilters, onApplyFilters }) => {
  const STATUS_OPTIONS = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const PRODUCT_TYPE_OPTIONS = [
    { value: '', label: 'All Types' },
    { value: 'food', label: 'Food & Groceries' },
    { value: 'documents', label: 'Documents & Packages' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'medical', label: 'Medical Supplies' },
    { value: 'other', label: 'Other' },
  ];

  const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'distance', label: 'Distance' },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      status: '',
      productType: '',
      sortBy: 'newest',
    });
    // Apply the reset filters
    onApplyFilters();
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SelectInput
          label="Status"
          id="status"
          name="status"
          value={filters.status || ''}
          onChange={handleFilterChange}
          options={STATUS_OPTIONS}
        />

        <SelectInput
          label="Product Type"
          id="productType"
          name="productType"
          value={filters.productType || ''}
          onChange={handleFilterChange}
          options={PRODUCT_TYPE_OPTIONS}
        />

        <SelectInput
          label="Sort By"
          id="sortBy"
          name="sortBy"
          value={filters.sortBy || 'newest'}
          onChange={handleFilterChange}
          options={SORT_OPTIONS}
        />

        <div className="flex items-end space-x-2">
          <Button
            onClick={onApplyFilters}
            className="flex-grow"
          >
            Apply Filters
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;