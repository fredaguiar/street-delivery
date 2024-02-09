import { Text, SafeAreaView } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn';
import GlobalStyles from './utils/GlobalStyles';

const OrdersView = () => {
  const tw = useTailwind();
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <Text style={tw('text-blue-600')}>OrdersView</Text>
    </SafeAreaView>
  );
};

export default OrdersView;
