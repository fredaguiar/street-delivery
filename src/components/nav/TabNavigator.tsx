import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useLayoutEffect } from 'react';
import CustomerView from '../CustomerView';
import OrdersView from '../OrdersView';
import { Icon } from '@rneui/themed';

export type TabStackParams = {
  Customers: undefined;
  Orders: { userId: string; name: string };
};

const Tab = createBottomTabNavigator<TabStackParams>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'lightgray',
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Customers')
            return <Icon name="users" type="entypo" color={focused ? 'black' : 'lightgray'} />;
          if (route.name === 'Orders')
            return <Icon name="box" type="entypo" color={focused ? 'black' : 'lightgray'} />;
        },
      })}
    >
      <Tab.Screen name="Customers" component={CustomerView} />
      <Tab.Screen name="Orders" component={OrdersView} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
