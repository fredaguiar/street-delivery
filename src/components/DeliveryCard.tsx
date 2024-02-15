import { Card, Divider, Icon, Text } from '@rneui/themed';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTailwind } from 'tailwind-rn';
import { CustomerViewNavProp } from './CustomerView';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const DeliveryCard = ({ order }: { order: Order }) => {
  const tw = useTailwind();
  const nav = useNavigation<CustomerViewNavProp>();
  return (
    <Card
      containerStyle={[
        tw('rounded-lg my-2'),
        {
          backgroundColor: 'white',
          padding: 2,
          paddingTop: 16,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 6,
        },
      ]}
    >
      <View>
        <Icon name="box" type="entypo" color="gray" size={30} />
        <View>
          <Text style={tw('text-center text-xs uppercase font-bold')}>
            {order.carrier} - {order.trackingId}
          </Text>
          <Text style={tw('text-center text-lg font-bold')}>
            Expected delivery: {new Date(order.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <Divider color="gray" style={tw('my-2')} />
      <View style={tw('px-5 mb-2')}>
        <View style={tw('flex-row justify-between text-sm')}>
          <Text style={tw('font-bold')}>Item</Text>
          <Text style={tw('font-bold')}>Qty</Text>
        </View>
        {order.trackingItems.items.map((item) => (
          <View style={tw('flex-row justify-between text-sm')} key={item.item_id}>
            <Text>{item.name}</Text>
            <Text>{item.quantity}</Text>
          </View>
        ))}
        <Text style={tw(' italic text-sm mt-2')}>Shipping cost: ${order.shippingCost}</Text>
      </View>
      <Divider color="gray" style={tw('my-2')} />
      <View>
        <View>
          <Text style={tw('text-center text-base font-bold')}>Address</Text>
          <Text style={tw('text-center text-sm ')}>
            {order.address}, {order.city}
          </Text>
        </View>
      </View>
      <MapView
        initialRegion={{
          latitude: order.lat,
          longitude: order.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={[tw('mt-5'), { height: 200 }]}
        provider={PROVIDER_GOOGLE}
      >
        {order.lat && order.lng && (
          <Marker
            coordinate={{ latitude: order.lat, longitude: order.lng }}
            title="Delivery location"
            description={order.address}
            identifier="destination"
          />
        )}
      </MapView>
    </Card>
  );
};

export default DeliveryCard;
