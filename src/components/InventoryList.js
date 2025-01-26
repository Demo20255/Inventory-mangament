import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const InventoryList = ({ inventory, onDeleteItem, onEditItem }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name'); 
  const [sortOrder, setSortOrder] = useState('asc');

  const categories = ['All', 'Electronics', 'Clothing', 'Groceries', 'Furniture', 'Stationery', 'Other'];

  const filteredItems = inventory
    .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'name') {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return sortOrder === 'asc' 
          ? nameA.localeCompare(nameB) 
          : nameB.localeCompare(nameA);
      } else {
        return sortOrder === 'asc' 
          ? a.quantity - b.quantity 
          : b.quantity - a.quantity;
      }
    });

  return (
    <div className="mt-4">
      <h3>Inventory Items</h3>
      
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Filter by Category:</label>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label>Sort By:</label>
          <div className="input-group">
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="quantity">Quantity</option>
            </select>
            <button 
              className="btn btn-secondary"
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="alert alert-info mt-3">
          No items found in this category
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr 
                  key={item.id}
                  className={item.quantity < 10 ? 'table-warning' : ''}
                >
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>
                    {item.quantity}
                    {item.quantity < 10 && (
                      <span className="ms-2 badge bg-danger">Low Stock</span>
                    )}
                    
                  </td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>₹{(item.quantity * item.price).toFixed(2)}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => onEditItem(item)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => onDeleteItem(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InventoryList;