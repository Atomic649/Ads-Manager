import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import AntDesign from '@expo/vector-icons/AntDesign';

export type DropDownOption = {
  label: string;
  value: string;
};

type ThemeDropDownProps = {
  value: string | null;
  onChange: (val: string) => void;
  options: DropDownOption[];
  placeholder?: string;
};

export default function ThemeDropDown({ value, onChange, options, placeholder }: ThemeDropDownProps) {
  const [open, setOpen] = React.useState(false);
  const bg = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');

  const selected = options.find(o => o.value === (value ?? ''));

  return (
    <View>
      <TouchableOpacity style={[styles.input, { backgroundColor: bg, borderColor: '#E5E7EB', marginTop: 10 }]} onPress={() => setOpen(true)}>
        <Text style={{ color: text }}>
          {selected ? selected.label : (placeholder || 'เลือกหมวดหมู่')}
        </Text>
       <AntDesign name="caret-down" size={24} color={text} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    padding: 20,
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    maxHeight: '60%',
    overflow: 'hidden',
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  optionText: {
    fontSize: 16,
  },
});
