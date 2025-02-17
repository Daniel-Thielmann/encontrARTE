import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { Feather } from '@expo/vector-icons';

interface CustomSelectListProps {
  setSelected: (value: string) => void;
  data: { key: string; value: string }[];
  placeholder: string;
}

const CustomSelectList: React.FC<CustomSelectListProps> = ({
  setSelected,
  data,
  placeholder,
}) => (
  <SelectList
    setSelected={setSelected}
    data={data}
    save="key"
    placeholder={placeholder}
    disabledTextStyles={{ color: 'red', fontWeight: 'bold' }}
    disabledItemStyles={{ backgroundColor: '#D2DFE5' }}
    dropdownTextStyles={{ color: '#055C65', fontWeight: 'bold' }}
    inputStyles={{ color: '#055C65', fontWeight: 'bold' }}
    searchPlaceholder="Pesquisar"
    searchicon={
      <Feather
        name="search"
        size={24}
        color="#055C65"
        style={{ marginRight: 10 }}
      />
    }
    closeicon={
      <Feather name="x" size={24} color="#055C65" style={{ marginRight: 10 }} />
    }
  />
);

export default CustomSelectList;
