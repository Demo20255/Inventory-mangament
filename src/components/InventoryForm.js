import { useState, useEffect } from 'react';
import { FaPlus, FaSave } from 'react-icons/fa';

const InventoryForm = ({ onAddItem, editingItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '', 
    quantity: '',
    price: ''
  });

  const categories = [
    'Electronics',
    'Clothing',
    'Groceries',
    'Furniture',
    'Stationery',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.quantity || !formData.price) {
      alert('Please fill all fields');
      return;
    }

    onAddItem({
      ...formData,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price)
    });

    setFormData({
      name: '',
      category: '',
      quantity: '',
      price: ''
    });
  };

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        category: editingItem.category, // Added category
        quantity: editingItem.quantity.toString(),
        price: editingItem.price.toString()
      });
    }
  }, [editingItem]);

  return (
    <form onSubmit={handleSubmit} className="mb-4 card p-3">
      <div className="mb-3">
        <label className="form-label">Item Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      { }
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          className="form-control"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          min="0"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Price (₹)</label>
        <input
          type="number"
          className="form-control"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          step="0.01"
          min="0"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {editingItem ? (
          <>
            <FaSave className="me-2" />
            Update Item
          </>
        ) : (
          <>
            <FaPlus className="me-2" />
            Add Item
          </>
        )}
      </button>
    </form>
  );
};

export default InventoryForm;