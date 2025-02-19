import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  text: string;
}

export function Button({ text, ...rest }: Props) {
  return (
    <TouchableOpacity
      className="bg-[#055C65] p-3 rounded-full w-full h-12 flex justify-center items-center"
      {...rest}
      activeOpacity={0.7}
    >
      <Text className="text-white text-center">{text}</Text>
    </TouchableOpacity>
  );
}
