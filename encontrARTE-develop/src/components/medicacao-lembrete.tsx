import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  Platform,
  Alert,
  TextInput,
  Pressable,
  Modal,
} from 'react-native';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Button } from './button';
import CustomSelectList from './custom-select-list';
import { api } from '@/src/server/api';
import { Feather } from '@expo/vector-icons';

interface MedicacaoLembreteProps {
  visible: boolean;
  onClose: () => void;
  onSave: (start: string, end: string, title: string) => void;
}

interface Routine {
  id: string;
  name: string;
  medication_id: string;
  numberOfPillsIngested: number;
  timeOfPillIngestion: string;
  user_id: string;
}

export default function LembreteMedicacao({
  visible,
  onClose,
  onSave,
}: MedicacaoLembreteProps) {
  const [selected, setSelected] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [selectedWeekDay, setSelectedWeekDay] = useState('');
  const [routine, setRoutine] = useState<Routine[]>([]);
  const [endDate, setEndDate] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return 'Selecione uma data';
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const fetchRoutine = useCallback(async () => {
    try {
      const response = await api.get('/routine');
      setRoutine(response.data);
    } catch (error) {
      console.error('Erro na requisição:', error);
      Alert.alert('Erro', 'Não foi possível carregar as rotinas.');
    }
  }, []);

  useEffect(() => {
    fetchRoutine();
  }, [visible]);

  const frequency = [
    { key: '1', value: 'A cada 4 horas' },
    { key: '2', value: 'A cada 6 horas' },
    { key: '3', value: 'A cada 8 horas' },
    { key: '4', value: 'A cada 12 horas' },
    { key: '5', value: 'A cada dia' },
    { key: '6', value: 'A cada semana' },
  ];

  const weekDay = [
    { key: '1', value: 'Segunda' },
    { key: '2', value: 'Terça' },
    { key: '3', value: 'Quarta' },
    { key: '4', value: 'Quinta' },
    { key: '5', value: 'Sexta' },
    { key: '6', value: 'Sábado' },
    { key: '7', value: 'Domingo' },
  ];

  const handleCreateReminder = () => {
    if (!isValidReminder()) return;

    const selectedRoutine = routine.find((item) => item.id === selected);

    if (selectedRoutine) {
      const start = new Date(selectedRoutine.timeOfPillIngestion).toISOString();
      const end = new Date(
        new Date(selectedRoutine.timeOfPillIngestion).getTime() + 30 * 60 * 1000
      ).toISOString();
      const title = selectedRoutine.name;

      onSave(start, end, title);

      Alert.alert('Sucesso', 'Lembrete criado com sucesso!');
      onClose();
    } else {
      Alert.alert('Erro', 'Houve um problema ao criar o lembrete.');
    }
  };

  const isValidReminder = (): boolean => {
    if (!selected) {
      Alert.alert(
        'Seleção obrigatória',
        'Por favor, selecione uma rotina antes de criar um lembrete.'
      );
      return false;
    }
    // if (!selectedFrequency) {
    //   Alert.alert(
    //     'Seleção obrigatória',
    //     'Por favor, selecione uma frequência antes de criar um lembrete.'
    //   );
    //   return false;
    // }
    // if (selectedFrequency === '6' && !selectedWeekDay) {
    //   Alert.alert(
    //     'Seleção obrigatória',
    //     'Por favor, selecione o dia da semana.'
    //   );
    //   return false;
    // }
    return true;
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onChange = ({ type }: DateTimePickerEvent, selectedDate?: Date) => {
    if (type === 'set') {
      const currentDate = selectedDate ?? new Date();
      setDate(currentDate); // Atualiza o estado de `date`

      if (Platform.OS === 'android') {
        toggleDatePicker();
        setEndDate(formatDate(currentDate)); // Atualiza `endDate` para a data selecionada
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    setEndDate(formatDate(date)); // Confirma e atualiza `endDate` com a data selecionada
    toggleDatePicker();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent
    >
      <View className="flex-1 w-full justify-center items-center h-fit">
        <View className="flex flex-col justify-center align-center gap-4 w-11/12 h-fit my-3 border-2 border-zinc-400 rounded-xl p-3 bg-[#fff]">
          <View className="flex flex-row justify-between items-center w-[95%] h-fit my-4">
            <Text className="text-4xl font-bold">Criar Lembrete</Text>
            <Feather name="x" size={24} color="#055C65" onPress={onClose} />
          </View>

          <CustomSelectList
            setSelected={setSelected}
            data={routine.map((item) => ({
              key: item.id,
              value: item.name,
            }))}
            placeholder="Selecione uma rotina de medicamento"
          />

          {/* <CustomSelectList
            setSelected={setSelectedFrequency}
            data={frequency}
            placeholder="Selecione a frequência"
          />

          {selectedFrequency === '6' && (
            <CustomSelectList
              setSelected={setSelectedWeekDay}
              data={weekDay}
              placeholder="Selecione o dia da semana"
            />
          )}

          <View className="flex flex-row justify-start items-center gap-2 w-full p-3">
            <Text className="text-xl text-[#055C65] font-bold">
              Escolher data
            </Text>
            <Feather name="calendar" size={24} color="#055C65" />
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={onChange}
              className="h-full mt-0"
              themeVariant="light"
            />
          )}

          {!showDatePicker && (
            <Pressable onPress={toggleDatePicker} className="mb-4">
              <TextInput
                className="border border-zinc-700 rounded-xl p-2 pb-3 placeholder:text-slate-400 w-full text-lg"
                placeholder="dd/mm/aaaa"
                editable={false}
                value={endDate}
                onPressIn={toggleDatePicker}
              />
            </Pressable>
          )} */}

          <Button text="Criar Lembrete" onPress={handleCreateReminder} />
        </View>
      </View>
    </Modal>
  );
}

// Para desenvolver:
// 1. A hora de inicio vem da rotina.
// 2. A hora de fim por default deve ser 30 minutos após a hora de início.
// 3. a data selecionada pelo usuario no date picker deve ser a data que vai aparecer no calendario.
// 4. o nome do lembrete deve ser inputado pelo usuário.

// Se possivel:
// 1. Alterar o date picker para que o usuário possa escolher a data de início e a data final (criar varios lembretes, usando o "range picker").
// 2. Remover o botão "Criar Lembrete" e substituí-lo por um botão "Salvar".
// 3. Adicionar um botão "Cancelar" para fechar o modal.
// 4. Rever p backend.
