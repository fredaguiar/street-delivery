import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Icon, Text } from '@rneui/themed';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { TabStackParams } from '../nav/TabNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../nav/RootNavigator';
import DeliveryCard from './DeliveryCard';

export type ModalViewNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParams, 'Customers'>,
  NativeStackNavigationProp<RootStackParams, 'MyModal'>
>;

export type ModelViewRouteProp = RouteProp<RootStackParams, 'MyModal'>;

const ModalView = ({}: {}) => {
  const tw = useTailwind();
  const nav = useNavigation<ModalViewNavProp>();
  const {
    params: { name, userId, orders },
  } = useRoute<ModelViewRouteProp>();
  // ml-2 mr-2 p-2 pb-10 top-20
  return (
    <View style={tw('ml-2 mr-2 p-2 pb-20 top-10 bg-slate-300 rounded-lg')}>
      <TouchableOpacity style={tw('absolute right-2 top-2 z-10')} onPress={nav.goBack}>
        <Icon name="closecircle" type="antdesign" size={40} />
      </TouchableOpacity>
      <View style={tw(' border-b')}>
        <Text style={tw('text-center text-xl font-bold')}>{name}</Text>
        <Text style={tw('text-center text-sm italic')}>Deliveries</Text>
      </View>
      <FlatList
        data={orders}
        renderItem={({ item }) => <DeliveryCard order={item} />}
        contentContainerStyle={[tw('mb-5'), { flexGrow: 1 }]}
        ListFooterComponent={<View style={tw('h-10')} />}
      />
    </View>
  );
};

export default ModalView;
