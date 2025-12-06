import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  style?: ViewStyle;
};

const COLORS = {
  primary: '#28ddb0',
  secondary: '#e2e2e0',
  accent: '#f65828ee',
  textOnPrimary: '#FFFFFF',
  textOnAccent: '#1F2937',
  textOnSecondary: '#1F2937',
};

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary', style }) => {
  const base = [styles.button, style];
  const colorStyle =
    variant === 'primary'
      ? { backgroundColor: COLORS.primary }
      : variant === 'secondary'
      ? { backgroundColor: COLORS.secondary }
      : variant === 'accent'
      ? { backgroundColor: COLORS.accent }
      : { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#E5E7EB' };
  const textStyle =
    variant === 'primary' ? styles.textPrimary : variant === 'secondary' ? styles.textSecondary : variant === 'accent' ? styles.textAccent : styles.textGhost;
  return (
    <TouchableOpacity style={[...base, colorStyle]} onPress={onPress} activeOpacity={0.85}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPrimary: {
    color: COLORS.textOnPrimary,
    fontWeight: '700',
    fontSize: 16,
  },
  textAccent: {
    color: COLORS.textOnAccent,
    fontWeight: '700',
    fontSize: 16,
  },
  textGhost: {
    color: '#1F2937',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Button;
