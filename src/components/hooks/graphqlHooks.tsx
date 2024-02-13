import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../../stepzen/queries';

const useGetOrders = (customerId: string) => {
  const { loading, error, data } = useQuery<{ getOrders: [] }>(GET_ORDERS);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!data) return;

    let orders: Order[] = data.getOrders.map((order: any) => ({
      address: order.address,
      city: order.City,
      lat: order.lat,
      lng: order.lng,
      carrier: order.carrier,
      createdAt: order.createdAt,
      shippingCost: order.shippingCost,
      trackingId: order.trackingId,
      trackingItems: order.trackingItems,
    }));

    if (customerId) {
      orders = orders.filter((order: Order) => order.trackingItems.customer_id === customerId);
    }

    setOrders(orders);
  }, [data]);

  return { loading, error, orders };
};

export { useGetOrders };
