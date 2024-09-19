'use client';

import { useEffect, useState } from 'react';

interface Order {
  name: string;
  email: string;
  paymentStatus: boolean;
}

const OrderPage = ({ params }: { params: { slug: string } }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const { slug } = params;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`https://iloveyou-backend.fly.dev/api/order/${slug}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      }
    };
    fetchOrder();
  }, [slug]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-xl font-bold">Pedido Concluído</h1>
        {order ? (
          <>
            <p><strong>Nome:</strong> {order.name}</p>
            <p><strong>Email:</strong> {order.email}</p>
            {/* <p><strong>Status do Pagamento:</strong> {order.paymentStatus ? "Pago" : "Pendente"}</p> */}
          </>
        ) : (
          <p>Pedido não encontrado</p>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
