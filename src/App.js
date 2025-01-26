import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import InventoryForm from './components/InventoryForm';
import InventoryList from './components/InventoryList';

function App() {
  const [inventory, setInventory] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const handleAddItem = (newItem) => {
    if (editingItem) {
      setInventory(inventory.map(item => 
        item.id === editingItem.id ? { ...newItem, id: item.id } : item
      ));
      setEditingItem(null);
    } else {
      setInventory([...inventory, { ...newItem, id: uuidv4() }]);
    }
  };

  const handleDeleteItem = (itemId) => {
    setInventory(inventory.filter(item => item.id !== itemId));
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Inventory Manager</h1>
      <InventoryForm 
        onAddItem={handleAddItem} 
        editingItem={editingItem} 
      />
      <InventoryList 
        inventory={inventory} 
        onDeleteItem={handleDeleteItem} 
        onEditItem={handleEditItem} 
      />
    </div>
  );
}

export default App;