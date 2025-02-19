import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { useState } from 'react';

import { Button } from '@/src/components/button';
import { Navbar } from '@/src/components/navbar';
import { api } from '@/src/server/api';

interface Medicamento {
  nome: string;
  miligramas: string;
  qtdPorCaixa: string;
  caixas: string;
}

export default function EstoqueMedicacao() {
  const userId = 'cf48b6ca-e84e-4dff-8dc6-124211fe9f5e'; //Mac
  // const userId = '61556d71-b817-4ff2-b252-413f80d9a35e'; //linux

  const [medicamento, setMedicamento] = useState<Medicamento>({
    nome: '',
    miligramas: '',
    qtdPorCaixa: '',
    caixas: '',
  });

  const handleSubmit = async () => {
    const payload = {
      name: medicamento.nome,
      dose: parseInt(medicamento.miligramas, 10),
      numberOfPills: parseInt(medicamento.qtdPorCaixa, 10),
      numberOfPackages: parseInt(medicamento.caixas, 10),
      user_id: userId,
    };

    try {
      const response = await api.post('/medication-stock', payload);

      if (response.data) {
        console.log('Medicação adicionado com sucesso');
        Alert.alert('Medicação adicionado com sucesso');
        setMedicamento({
          nome: '',
          miligramas: '',
          qtdPorCaixa: '',
          caixas: '',
        });
      } else {
        console.log('Erro ao adicionar lembrete');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
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
            <Text className="text-4xl mb-5 font-bold">
              Estoque de Medicação
            </Text>
            <Text className="text-xl my-2 font-semibold">Medicamento</Text>
            <TextInput
              placeholder="Nome da medicação"
              className="border border-zinc-700 rounded-md h-10 m-0.5 p-2 placeholder:text-slate-400"
              onChangeText={(text) =>
                setMedicamento({ ...medicamento, nome: text })
              }
              value={medicamento.nome}
            />
            <Text className="text-xl my-2 font-semibold">Miligramas</Text>
            <TextInput
              placeholder="500"
              className="border border-zinc-700 rounded-md h-10 m-0.5 p-2 placeholder:text-slate-400"
              keyboardType="numeric"
              onChangeText={(text) =>
                setMedicamento({ ...medicamento, miligramas: text })
              }
              value={medicamento.miligramas}
            />
            <Text className="text-xl my-2 font-semibold">
              Quantidade de comprido (cx)
            </Text>
            <TextInput
              placeholder="10"
              className="border border-zinc-700 rounded-md h-10 m-0.5 p-2 placeholder:text-slate-400"
              keyboardType="numeric"
              onChangeText={(text) =>
                setMedicamento({ ...medicamento, qtdPorCaixa: text })
              }
              value={medicamento.qtdPorCaixa}
            />
            <Text className="text-xl my-2 font-semibold">
              Quantidade de caixa (un)
            </Text>
            <TextInput
              placeholder="2"
              className="border border-zinc-700 rounded-md h-10 m-0.5 p-2 placeholder:text-slate-400"
              keyboardType="numeric"
              onChangeText={(text) =>
                setMedicamento({ ...medicamento, caixas: text })
              }
              value={medicamento.caixas}
            />
            <View className="flex flex-col justify-start align-center w-full my-4">
              <Button
                text="Adicionar Medicação"
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
          <Navbar
            buttons={[
              {
                href: '/pages/medicacao-rotina',
                icon: 'calendar',
                text: 'Rotinas',
              },

              {
                href: '/pages/medicacao-ingestao',
                icon: 'archive',
                text: 'Ingestão',
              },
            ]}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
