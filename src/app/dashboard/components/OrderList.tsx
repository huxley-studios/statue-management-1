import StatusUpdate from './StatusUpdate';
import QCChecklist from './QCChecklist';

export default function OrderList() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  
  const refreshOrders = () => {
    fetch('/api/orders').then(res => res.json()).then(setOrders);
  };

  React.useEffect(() => {
    refreshOrders();
  }, []);

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div key={order._id} className="border p-4 rounded">
          <h3>Order #{order._id.slice(-4)}</h3>
          <StatusUpdate orderId={order._id} currentStatus={order.status} onUpdate={refreshOrders} />
          {order.status === 'qc' && <QCChecklist orderId={order._id} />}
        </div>
      ))}
    </div>
  );
}
