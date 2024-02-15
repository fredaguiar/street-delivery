import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CustomerView from '../components/CustomerView';
import OrdersView from '../components/OrdersView';
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
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Customers')
            return <Icon name="users" type="entypo" color={focused ? 'blue' : 'black'} />;
          if (route.name === 'Orders')
            return <Icon name="box" type="entypo" color={focused ? 'blue' : 'black'} />;
        },
      })}
    >
      <Tab.Screen name="Customers" component={CustomerView} />
      <Tab.Screen name="Orders" component={OrdersView} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
