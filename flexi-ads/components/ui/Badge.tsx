import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type BadgeProps = {
  label: string;
  color?: string;
};

export const Badge: React.FC<BadgeProps> = ({ label, color = '#F6C445' }) => {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}> 
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
  },
});

export default Badge;
