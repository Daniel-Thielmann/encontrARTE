import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { Button } from '../../components/button';
import { useEffect, useState } from 'react';
import CustomSelectList from '../../components/custom-select-list';
import { api } from '@/src/server/api';

interface Rotina {
  name: string;
  medication_id: string;
  qtdIngerida: string;
  horario: string;
}

interface MedicationStock {
  id: string;
  name: string;
  dose: number;
  numberOfPills: number;
  numberOfPackages: number;
  user_id: string;
}

export default function RotinaMedicacao() {
  const [selected, setSelected] = useState('');
  const [rotina, setRotina] = useState<Rotina>({
    name: '',
    medication_id: '',
    qtdIngerida: '',
    horario: '',
  });
  const [stock, setStock] = useState<MedicationStock[]>([]);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await api.get('/medication-stock');
        setStock(response.data);
      } catch (error) {
        console.error('Erro na requisição:', error);
        Alert.alert('Erro', 'Não foi possível carregar o estoque.');
      }
    };

    fetchStock();
  }, []);

  const handleSelect = (val: string) => {
    setSelected(val);
    const selectedItem = stock.find((item) => item.id === val);
    if (selectedItem) {
      setRotina((prev) => ({
        ...prev,
        medication_id: selectedItem.id,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!rotina.medication_id || !rotina.qtdIngerida || !rotina.horario) {
      Alert.alert(
        'Campos obrigatórios',
        'Por favor, preencha todos os campos antes de continuar.'
      );
      return;
    }
    const userId = 'cf48b6ca-e84e-4dff-8dc6-124211fe9f5e'; //Mac

    // const userId = '61556d71-b817-4ff2-b252-413f80d9a35e';

    const today = new Date(); // Data atual
    const [hours, minutes] = rotina.horario.split(':').map(Number); // Extrai horas e minutos do horário
    let formattedTime = '';
    if (!isNaN(hours) && !isNaN(minutes)) {
      formattedTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes
      ).toISOString();
      console.log(formattedTime);

      const payload = {
        name: rotina.name,
        medication_id: rotina.medication_id,
        numberOfPillsIngested: Number(rotina.qtdIngerida),
        timeOfPillIngestion: formattedTime, // Aqui usamos o `formattedTime` já formatado
        user_id: userId,
      };

      try {
        const response = await api.post('/routine', payload);
        console.log('Resposta do servidor:', response.data);
        Alert.alert('Sucesso', 'Rotina salva com sucesso!');
        setRotina({
          name: '',
          medication_id: '',
          qtdIngerida: '',
          horario: '',
        });
        setSelected('');
      } catch (error) {
        console.error('Erro ao salvar a rotina:', error);
        Alert.alert('Erro', 'Não foi possível salvar a rotina.');
      }
    } else {
      console.error('Horário inválido!');
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="bg-[#D2DFE5] flex-1 w-full justify-between items-center">
          <View className="flex flex-col justify-start align-center gap-2 w-11/12 h-fit my-3 border-2 border-zinc-400 rounded-xl p-3">
            <Text className="text-4xl mb-5 font-bold">Rotina de Medicação</Text>
            <Text className="text-xl my-2 font-semibold">Medicamento</Text>
            <View className="flex flex-col justify-start align-center w-full my-2">
              <CustomSelectList
                setSelected={handleSelect}
                data={stock.map((item) => ({
                  key: item.id,
                  value: item.name,
                }))}
                placeholder="Selecione um medicamento"
              />
            </View>
            <Text className="text-xl my-2 font-semibold">
              Quantidade de comprimidos ingerida:
            </Text>
            <TextInput
              placeholder="2"
              className="border border-zinc-700 rounded-md h-10 m-0.5 p-2 placeholder:text-slate-400"
              keyboardType="numeric"
              onChangeText={(text) =>
                setRotina((prev) => ({ ...prev, qtdIngerida: text }))
              }
              value={rotina.qtdIngerida}
            />
            <Text className="text-xl my-2 font-semibold">
              Horário da Ingestão:
            </Text>
            <TextInput
              placeholder="09:00"
              className="border border-zinc-700 rounded-md h-10 m-0.5 p-2 placeholder:text-slate-400"
              onChangeText={(text) =>
                setRotina((prev) => ({ ...prev, horario: text }))
              }
              value={rotina.horario}
            />
            <Text className="text-xl my-2 font-semibold">Nome da Rotina:</Text>
            <TextInput
              placeholder="Rotina 1"
              className="border border-zinc-700 rounded-md h-10 m-0.5 p-2 placeholder:text-slate-400"
              onChangeText={(text) =>
                setRotina((prev) => ({ ...prev, name: text }))
              }
              value={rotina.name}
            />
            <View className="flex flex-col justify-start align-center w-full my-2">
              <Button text="Adicionar Rotina" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
