import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link, type Href } from 'expo-router';

type FeatherIconName = React.ComponentProps<typeof Feather>['name'];
interface NavbarProps {
  buttons: {
    href: Href<string | object>;
    icon: FeatherIconName;
    text: string;
  }[];
}

export function Navbar({ buttons }: NavbarProps) {
  return (
    <View className="bg-[#055C65] py-4 flex-row justify-around items-start w-full h-[12%]">
      {buttons.map((button, index) => (
        <Link key={index} href={button.href} asChild>
          <TouchableOpacity className="flex flex-col justify-center items-center gap-2">
            <Feather name={button.icon} size={24} color="white" />
            <Text className="text-white">{button.text}</Text>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
}
