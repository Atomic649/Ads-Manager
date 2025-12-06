import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

type Props = {
  visible: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

// Cross-platform lightweight alert modal
export default function CustomAlert({
  visible,
  title,
  message,
  confirmText = Platform.OS === 'ios' ? 'ตกลง' : 'ยืนยัน',
  cancelText = 'ยกเลิก',
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onCancel}>
              <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.confirm]} onPress={onConfirm}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  card: { width: '88%', maxWidth: 440, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8, color: '#111827' },
  message: { fontSize: 14, color: '#374151' },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 14, gap: 10 },
  button: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  cancel: { backgroundColor: '#FFFFFF' },
  confirm: { backgroundColor: '#1ABCAC', borderColor: '#1ABCAC' },
  buttonText: { fontSize: 14, color: '#111827', fontWeight: '600' },
});
