import { Text, SafeAreaView, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn';
import GlobalStyles from '../utils/GlobalStyles';
import { CompositeNavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { TabStackParams } from '../nav/TabNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../nav/RootNavigator';
import { useGetOrders } from '../hooks/graphqlHooks';
import { Button, Image } from '@rneui/themed';
import { assets } from '../utils/Utils';
import OrdersCard from './OrderCard';

export type OrderViewNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParams, 'Orders'>,
  NativeStackNavigationProp<RootStackParams>
>;

const OrdersView = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderViewNavProp>();
  const [ascending, setAscending] = useState(false);
  const { loading, error, orders } = useGetOrders();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => {
        return <Text style={{ color: focused ? 'black' : color, fontSize: 10 }}>Orders</Text>;
      },
    });
  }, []);

  return (
    <SafeAreaView style={[GlobalStyles.AndroidSafeArea, GlobalStyles.SkyBackground]}>
      <Image source={{ uri: assets('delivery.png') }} containerStyle={tw('w-full h-64')} />

      <View>
        <Button
          style={tw('text-center text-xl font-bold py-2 px-5')}
          onPress={() => setAscending(!ascending)}
        >
          {ascending ? 'Display oldest first' : 'Display most recent first'}
        </Button>
      </View>
      {orders
        .sort((a, b) => {
          if (ascending) return new Date(a.createdAt) >= new Date(b.createdAt) ? 1 : -1;
          return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
        })
        .map((item) => (
          <OrdersCard key={item.trackingId} order={item} />
        ))}
    </SafeAreaView>
  );
};

export default OrdersView;
