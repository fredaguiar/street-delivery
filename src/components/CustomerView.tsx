import { ScrollView } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn';
import { CompositeNavigationProp } from '@react-navigation/native';
import GlobalStyles from '../utils/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParams } from '../nav/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../nav/RootNavigator';
import { Image, Input, Text, Icon } from '@rneui/themed';
import { assets } from '../utils/Utils';
import { GET_CUSTOMERS } from '../../stepzen/queries';
import { useQuery } from '@apollo/client';
import CustomerCard from './CustomerCard';
import { useGetOrders } from '../hooks/graphqlHooks';

export type CustomerViewNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParams, 'Customers'>,
  NativeStackNavigationProp<RootStackParams, 'Main'>
>;

const CustomerView = () => {
  const tw = useTailwind();
  const navigation = useNavigation<CustomerViewNavProp>();
  const [searchCustomer, setSearchCustomer] = useState('');
  const { loading, error, data } = useQuery(GET_CUSTOMERS);
  const { loading: loadingOrders, error: errorOrders, orders } = useGetOrders();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <ScrollView style={[GlobalStyles.AndroidSafeArea, GlobalStyles.SkyBackground]}>
      <Image source={{ uri: assets('delivery.png') }} containerStyle={tw('w-full h-64')} />
      <Input
        placeholder="Search customer"
        value={searchCustomer}
        onChangeText={setSearchCustomer}
        containerStyle={tw('bg-white ')}
      />

      {(loading || loadingOrders) && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {errorOrders && <Text>Error: {errorOrders.message}</Text>}

      {data?.getCustomers
        ?.filter(({ value: { name } }: Customers) =>
          name.toLowerCase().includes(searchCustomer?.toLowerCase())
        )
        .map(({ name: ID, value: { name, email } }: Customers) => {
          const customerOrders = orders.filter((order) => {
            return order?.trackingItems?.customer_id === ID;
          });
          return (
            <CustomerCard key={ID} email={email} name={name} userId={ID} orders={customerOrders} />
          );
        })}
    </ScrollView>
  );
};

export default CustomerView;
