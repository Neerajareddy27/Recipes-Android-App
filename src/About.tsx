import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';

export default function About() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>About This App</Title>
          <Paragraph style={styles.description}>
            This is a Recipe App built with React Native that allows you to browse and view delicious recipes from around the world. 
            The app fetches data from a recipe API and displays it in a beautiful, user-friendly interface.
          </Paragraph>
          <Paragraph style={styles.description}>
            Features include:
          </Paragraph>
          <Text style={styles.featureItem}>• Browse recipe collections</Text>
          <Text style={styles.featureItem}>• View detailed recipe information</Text>
          <Text style={styles.featureItem}>• See ingredients and instructions</Text>
          <Text style={styles.featureItem}>• Check recipe ratings</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 24,
  },
  featureItem: {
    fontSize: 16,
    marginBottom: 8,
    paddingLeft: 16,
  },
});