import { Text, StyleSheet, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn';
import { CompositeNavigationProp } from '@react-navigation/native';
import GlobalStyles from './utils/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParams } from './nav/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from './nav/RootNavigator';
import { Image, Input } from '@rneui/themed';
import { assets } from './utils/Utils';

type CustomerViewNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParams, 'Customers'>,
  NativeStackNavigationProp<RootStackParams, 'Main'>
>;

const CustomerView = () => {
  const tw = useTailwind();
  const navigation = useNavigation<CustomerViewNavProp>();
  const [input, setInput] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  });

  return (
    <ScrollView style={[GlobalStyles.AndroidSafeArea, GlobalStyles.SkyBackground]}>
      <Image source={{ uri: assets('delivery.png') }} containerStyle={tw('w-full h-64')} />
      <Input
        placeholder="Search customer"
        value={input}
        onChangeText={setInput}
        containerStyle={tw('bg-white ')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
});

export default CustomerView;
