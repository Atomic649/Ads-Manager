import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';

type CardProps = {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  right?: React.ReactNode;
  children?: React.ReactNode;
  style?: ViewStyle;
};

export const Card: React.FC<CardProps> = ({ title, subtitle, imageUrl, right, children, style }) => {
  return (
    <View style={[styles.card, style]}> 
      {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} /> : null}
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {right}
      </View>
      {children}
    </View>
  );
};

const COLORS = {
  primary: '#1ABCAC',
  accent: '#F6C445',
  text: '#1F2937',
  subtext: '#6B7280',
  border: '#E5E7EB',
  bg: '#FFFFFF',
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bg,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerText: { flex: 1, paddingRight: 8 },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 14,
    color: COLORS.subtext,
  },
});

export default Card;
