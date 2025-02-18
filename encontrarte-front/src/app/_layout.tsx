import '../styles/global.css';
import { Slot, Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#055C65' },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="login/login"
        options={{ title: 'Login', headerShown: false }}
      />
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen
        name="pages/medicacao-estoque"
        options={{ title: 'Estoque' }}
      />
      <Stack.Screen
        name="pages/medicacao-rotina"
        options={{ title: 'Rotina' }}
      />
      <Stack.Screen
        name="pages/medicacao-lembrete"
        options={{ title: 'Lembrete' }}
      />
      <Stack.Screen
        name="pages/medicacao-ingestao"
        options={{ title: 'Ingestão' }}
      />
    </Stack>
  );
}
