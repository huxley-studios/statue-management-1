import React from 'react';

interface Order {
  _id: string;
  type: 'direct' | 'gift_card';
  status: string;
  size: string;
  numberOfPeople: number;
}

export default function OrderList() {
  const [orders, setOrders] = React.useState<Order[]>([]);

  React.useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div key={order._id} className="border p-4 rounded">
          <h3>Order #{order._id.slice(-4)}</h3>
          <p>Type: {order.type}</p>
          <p>Status: {order.status}</p>
          <p>Size: {order.size}</p>
          <p>People: {order.numberOfPeople}</p>
        </div>
      ))}
    </div>
  );
}
