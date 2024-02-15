import { Badge, Card, Icon, Text } from '@rneui/themed';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTailwind } from 'tailwind-rn';
import { CustomerViewNavProp } from './CustomerView';

const CustomerCard = ({
  email,
  name,
  userId,
  orders,
}: {
  email: string;
  name: string;
  userId: string;
  orders: Order[];
}) => {
  const tw = useTailwind();
  const nav = useNavigation<CustomerViewNavProp>();
  return (
    <TouchableOpacity onPress={() => nav.navigate('MyModal', { name, userId, orders })}>
      <Card containerStyle={tw('p-2 rounded-lg')}>
        <View style={tw('flex-row justify-between')}>
          <View>
            <Text style={tw('text-2xl font-bold')}>{name}</Text>
            <Text style={tw('text-xs font-light')}>ID: {userId}</Text>
          </View>
          {orders.length > 0 && (
            <View style={tw('flex-row relative')}>
              <Badge containerStyle={tw('absolute right-5 top-0 z-10')} value={orders.length} />
              <Icon style={tw('mb-1 ml-auto')} name="box" type="entypo" color="gray" size={30} />
            </View>
          )}
        </View>
        <Card.Divider style={tw('my-2')} />
        <Text style={tw('text-lg')}>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;
