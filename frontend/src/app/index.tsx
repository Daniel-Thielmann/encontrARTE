import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import {
  TimelineList,
  ExpandableCalendar,
  CalendarProvider,
  DateData,
  LocaleConfig,
} from 'react-native-calendars';

import { Navbar } from '../components/navbar';
import { ptBR } from '@/src/utils/localeCalendarConfig';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import LembreteMedicacao from '../components/medicacao-lembrete';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface TimelineEvent {
  id: string;
  start: string;
  end: string;
  title: string;
  color: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    start: '2024-12-18 09:00:00',
    end: '2024-12-18 10:00:00',
    title: 'Paracetamol',
    color: '#D2DFE5',
  },
  {
    id: '2',
    start: '2024-12-18 12:00:00',
    end: '2024-12-18 13:00:00',
    title: 'AAS',
    color: '#D2DFE5',
  },
  {
    id: '3',
    start: '2024-12-18 14:00:00',
    end: '2024-12-18 15:00:00',
    title: 'Dipirona',
    color: '#D2DFE5',
  },
];

export default function Index() {
  const [day, setDay] = useState<DateData>();
  const [dynamicEvents, setDynamicEvents] = useState<TimelineEvent[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSaveEvent = (start: string, end: string, title: string) => {
    const newEvent: TimelineEvent = {
      id: (dynamicEvents.length + 1).toString(),
      start,
      end,
      title,
      color: '#D2DFE5',
    };

    setDynamicEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <View className="flex-1">
      <View className="bg-[#D2DFE5] flex-1">
        <CalendarProvider
          date={day?.dateString ?? new Date().toISOString().split('T')[0]}
          onDateChanged={(date: string) =>
            setDay({ dateString: date } as DateData)
          }
          showTodayButton
          disabledOpacity={0.6}
        >
          <ExpandableCalendar
            firstDay={0}
            renderArrow={(direction: 'left' | 'right') => (
              <Feather
                name={`chevron-${direction}`}
                size={24}
                color="#055C65"
              />
            )}
            markedDates={{
              [day?.dateString ?? '']: {
                selected: true,
                marked: true,
                selectedColor: '#055C65',
              },
            }}
            theme={{
              textSectionTitleColor: '#000',
              selectedDayBackgroundColor: '#055C65',
              selectedDayTextColor: '#D2DFE5',
              todayTextColor: '#055C65',
              monthTextColor: '#055C65',
              calendarBackground: '#D2DFE5',
              textDayFontWeight: 'bold',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: 'bold',
            }}
          />

          <TimelineList
            events={{
              [day?.dateString ?? '2024-10-14']: [
                ...timelineEvents,
                ...dynamicEvents,
              ],
            }}
            scrollToNow
            showNowIndicator
          />
        </CalendarProvider>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: '#055C65',
            borderRadius: 50,
            padding: 15,
          }}
        >
          {' '}
          <Feather name="plus" size={24} color="#FFF" />{' '}
        </TouchableOpacity>

        <LembreteMedicacao
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleSaveEvent}
        />

        <StatusBar barStyle="light-content" />
      </View>
      <Navbar
        buttons={[
          { href: '/login/login', icon: 'user', text: 'Login' },
          {
            href: '/pages/medicacao-estoque',
            icon: 'activity',
            text: 'Medicação',
          },
        ]}
      />
    </View>
  );
}
