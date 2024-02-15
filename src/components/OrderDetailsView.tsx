import { Text, SafeAreaView, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabStackParams } from '../nav/TabNavigator';
import { RootStackParams } from '../nav/RootNavigator';
import DeliveryCard from './DeliveryCard';

export type OrderDetailsNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParams, 'Orders'>,
  NativeStackNavigationProp<RootStackParams>
>;

export type OrderDetailsRouteProp = RouteProp<RootStackParams, 'Order'>;

const OrderDetailsView = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderDetailsNavProp>();
  const {
    params: { order },
  } = useRoute<OrderDetailsRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTitleAlign: 'center',
      headerBackTitle: 'Deliveries',
    });
  }, []);

  return (
    <View style={tw('')}>
      <DeliveryCard order={order} fullWidth />
    </View>
  );
};

export default OrderDetailsView;
