import React, { useState } from 'react';
import { Button } from '@/src/components/button';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import { Logo } from '@/src/components/logo';

const StatusBarHeight = Constants.statusBarHeight;

interface Login {
  email: string;
  password: string;
}

export default function login() {
  const [login, setLogin] = useState<Login>({} as Login);
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100} // Ajuste conforme necessário
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="bg-[#D2DFE5] flex-1 w-full justify-between items-center">
          <View
            className="bg-[#D2DFE5] flex-1 flex-col w-full items-center gap-6"
            style={{ paddingTop: StatusBarHeight }}
          >
            <Logo />
            <View className="flex flex-col justify-start align-center gap-2 w-11/12 h-fit my-3 p-3">
              <Text className="text-4xl mb-5 font-bold">Entrar</Text>
              <Text className="text-xl my-2 font-semibold">Email:</Text>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="email@email.com"
                className="border border-zinc-700 rounded-md h-10 m-0.5 p-2 placeholder:text-slate-400"
                onChangeText={(text) => setLogin({ ...login, email: text })}
                value={login.email}
              />
              <Text className="text-xl my-2 font-semibold">Senha</Text>
              <TextInput
                autoCapitalize="none"
                placeholder="********"
                className="border border-zinc-700 rounded-md h-10 m-0.5 p-2 placeholder:text-slate-400"
                secureTextEntry={true}
                onChangeText={(text) => setLogin({ ...login, password: text })}
                value={login.password}
              />
              <View className="flex flex-col justify-start align-center w-full my-4">
                <Button
                  text="Login"
                  onPress={() => (
                    console.log(login),
                    setLogin({
                      email: '',
                      password: '',
                    })
                  )}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
