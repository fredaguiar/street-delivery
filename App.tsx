import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/components/nav/RootNavigator';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { STEPZEN_URI } from './src/utils/Const';

const client = new ApolloClient({
  uri: STEPZEN_URI,
  headers: {
    Authorization:
      'apikey westfield::stepzen.io+1000::cf32a8dae21b58675509d95ed7ed293e6945a1cd4ef8ed2d40d7bb6a15c4b004',
  },
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    // @ts-ignore: taiwind has not updated type definition yet
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}
