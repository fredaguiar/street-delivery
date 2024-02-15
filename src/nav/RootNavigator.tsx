import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TabNavigator from './TabNavigator';
import ModalView from '../components/ModalView';
import OrderDetailsView from '../components/OrderDetailsView';

export type RootStackParams = {
  Main: undefined;
  MyModal: { userId: string; name: string; orders: Order[] };
  Order: { order: Order };
};

const RootStack = createNativeStackNavigator<RootStackParams>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Main" component={TabNavigator} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
        <RootStack.Screen name="MyModal" component={ModalView} />
      </RootStack.Group>
      <RootStack.Group>
        <RootStack.Screen name="Order" component={OrderDetailsView} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
