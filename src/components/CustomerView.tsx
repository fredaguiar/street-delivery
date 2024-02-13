import { StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn';
import { CompositeNavigationProp } from '@react-navigation/native';
import GlobalStyles from '../utils/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParams } from './nav/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from './nav/RootNavigator';
import { Image, Input, Text } from '@rneui/themed';
import { assets } from '../utils/Utils';
import { GET_CUSTOMERS } from '../stepzen/queries';
import { useQuery } from '@apollo/client';
import CustomerCard from './CustomerCard';

type CustomerViewNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParams, 'Customers'>,
  NativeStackNavigationProp<RootStackParams, 'Main'>
>;

const CustomerView = () => {
  const tw = useTailwind();
  const navigation = useNavigation<CustomerViewNavProp>();
  const [input, setInput] = useState('');
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <ScrollView style={[GlobalStyles.AndroidSafeArea, GlobalStyles.SkyBackground]}>
      <Image source={{ uri: assets('delivery.png') }} containerStyle={tw('w-full h-64')} />
      <Input
        placeholder="Search customer"
        value={input}
        onChangeText={setInput}
        containerStyle={tw('bg-white ')}
      />

      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}

      {data?.getCustomers.map(({ name: ID, value: { name, email } }: Customers) => (
        <CustomerCard key={ID} email={email} name={name} />
      ))}
    </ScrollView>
  );
};

export default CustomerView;
