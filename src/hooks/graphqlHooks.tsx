import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../../stepzen/queries';

const useGetOrders = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!data) return;

    let orders: Order[] = data.getOrders.map((order: any) => ({
      address: order.value.Address,
      city: order.value.City,
      lat: order.value.Lat,
      lng: order.value.Lng,
      carrier: order.value.carrier,
      createdAt: order.value.createdAt,
      shippingCost: order.value.shippingCost,
      trackingId: order.value.trackingId,
      key: order.value.trackingId,
      trackingItems: order.value.trackingItems,
    }));

    setOrders(orders);
  }, [data]);

  return { loading, error, orders };
};

export { useGetOrders };
