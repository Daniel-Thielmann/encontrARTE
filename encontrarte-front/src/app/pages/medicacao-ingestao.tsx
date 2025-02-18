import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MedicamentoItem from '../../components/medicamento-item';

const data = [
  {
    key: '1',
    value: 'Rotina Paracetamol',
    horarios: ['12:00:00'],
    frequencia: '3',
    qtdIngerida: '1',
  },
  {
    key: '2',
    value: 'Rotina AAS',
    horarios: ['12:00:00'],
    frequencia: '3',
    qtdIngerida: '1',
  },
  {
    key: '3',
    value: 'Rotina Dipirona',
    horarios: ['12:00:00'],
    frequencia: '3',
    qtdIngerida: '1',
  },
  {
    key: '4',
    value: 'Rotina Dipirona',
    horarios: ['18:00:00'],
    frequencia: '3',
    qtdIngerida: '1',
  },
];

export default function MedicacaoIngestao() {
  const [isChecked, setChecked] = useState<boolean[][]>(
    data.map(() => Array(data[0].horarios.length).fill(false))
  );

  const toggleChecked = (medicamentoIndex: number, horarioIndex: number) => {
    const newChecked = [...isChecked];
    newChecked[medicamentoIndex][horarioIndex] =
      !newChecked[medicamentoIndex][horarioIndex];
    setChecked(newChecked);
  };

  const handleRemove = (index: number) => {
    console.log(`Remover medicamento ${data[index].value}`);
    // Implementar a lógica para remover o medicamento, se necessário
  };

  return (
    <View className="flex-1 bg-[#D2DFE5]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 80}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex flex-col justify-start align-center w-11/12 h-fit my-3 border-2 border-zinc-400 rounded-xl p-3 mx-auto">
            <Text className="text-4xl mb-5 font-bold">
              Ingestão de Medicamentos
            </Text>
            {data.map((medicamento, medicamentoIndex) => (
              <MedicamentoItem
                key={medicamento.key}
                medicamento={medicamento.value}
                onRemove={() => handleRemove(medicamentoIndex)}
                horarios={medicamento.horarios}
                isChecked={isChecked[medicamentoIndex]}
                toggleChecked={(horarioIndex) =>
                  toggleChecked(medicamentoIndex, horarioIndex)
                }
              />
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
