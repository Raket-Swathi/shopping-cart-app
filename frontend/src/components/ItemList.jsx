import { useEffect, useState } from 'react';
import api from '../api';

export default function ItemList() {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    try {
      const res = await api.get('/items');
      setItems(res.data);
    } catch (err) {
      console.error('Error loading items');
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleAddToCart = async (itemId) => {
    try {
      await api.post('/carts', { itemId });
      window.alert('Item added to cart');
    } catch (err) {
      window.alert('You must be logged in to add items');
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map(item => (
        <div
          key={item._id}
          className="border rounded p-4 shadow hover:shadow-lg cursor-pointer"
          onClick={() => handleAddToCart(item._id)}
        >
          <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
          <p className="text-gray-700 mb-1">₹{item.price}</p>
          {item.description && (
            <p className="text-gray-500 text-sm">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
