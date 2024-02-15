import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn';
import { Button, Card, Icon, Image, Text } from '@rneui/themed';
import { assets } from '../utils/Utils';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParams } from '../nav/TabNavigator';
import { RootStackParams } from '../nav/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type OrderCardNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParams, 'Orders'>,
  NativeStackNavigationProp<RootStackParams>
>;

const OrdersCard = ({ order }: { order: Order }) => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderCardNavProp>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Order', { order })}>
      <Card
        containerStyle={[
          tw('px-2 rounded-lg'),
          {
            backgroundColor: 'white',
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 6,
          },
        ]}
      >
        <View style={tw('flex-row justify-between items-center')}>
          <View style={tw('')}>
            <Icon
              style={tw('')}
              name="truck-delivery"
              type="material-community"
              color="gray"
              size={30}
            />
            <Text style={tw('text-sm')}>{new Date(order.createdAt).toDateString()}</Text>
          </View>
          <View>
            <Text style={tw('text-xs')}>
              {order.carrier} - {order.trackingId}
            </Text>
            <Text style={tw('text-sm flex-wrap')}>{order.trackingItems.customer.name}</Text>
          </View>
          <View style={tw('flex-row items-center')}>
            <Text>({order.trackingItems.items.length})</Text>
            <Icon style={tw('ml-1')} name="box" type="feather" color="gray" size={30} />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrdersCard;
