import { Feather } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface MedicamentoItemProps {
  medicamento: string;
  onRemove: () => void;
  horarios: string[];
  isChecked: boolean[];
  toggleChecked: (index: number) => void;
}

const MedicamentoItem: React.FC<MedicamentoItemProps> = ({
  medicamento,
  onRemove,
  horarios,
  isChecked,
  toggleChecked,
}) => (
  <View className="flex flex-col justify-start align-center w-full h-fit my-3 border-2 border-zinc-400 rounded-xl p-3">
    <View className="flex flex-row justify-start align-center w-full h-fit my-1">
      <Text className="text-xl font-semibold flex-1">{medicamento}:</Text>
      <TouchableOpacity onPress={onRemove}>
        <Feather name="trash" size={24} color="black" />
      </TouchableOpacity>
    </View>
    <Text>Hora da Ingestão</Text>
    <View className="flex flex-row justify-start align-center w-11/12 h-fit my-1">
      {horarios.map((horario, index) => (
        <View key={index} className="flex-row items-center">
          <Checkbox
            className="m-2"
            value={isChecked[index]}
            onValueChange={() => toggleChecked(index)}
          />
          <Text className="text-base">{horario}</Text>
        </View>
      ))}
    </View>
  </View>
);

export default MedicamentoItem;
