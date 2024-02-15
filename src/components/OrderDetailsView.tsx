import { Text, SafeAreaView, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn';

const OrderDetailsView = () => {
  const tw = useTailwind();

  return (
    <View style={tw('')}>
      <Text style={tw('text-sm')}>dffads</Text>
    </View>
  );
};

export default OrderDetailsView;
