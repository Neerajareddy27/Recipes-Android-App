import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, StyleSheet } from 'react-native';
import { Text, ActivityIndicator, Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { config } from './config/config';

type Props = NativeStackScreenProps<RootStackParamList, 'Recipes'>;

type RecipeDetail = {
  name: string;
  image: string;
  ingredients: string[];
  instructions: string;
  rating: number;
};

export default function Recipes({ route }: Props) {
  const { id } = route.params;
  const [recipe, setRecipe] = useState<RecipeDetail>();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios.get<RecipeDetail>(`${config.API_URL}/${id}`)
      .then((response) => {
        setRecipe(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.centerContainer}>
        <Text>No recipe found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{recipe.name}</Title>
          <Image source={{ uri: recipe.image }} style={styles.image} />
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients:</Text>
            <Paragraph>{recipe.ingredients.join(', ')}</Paragraph>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions:</Text>
            <Paragraph>{recipe.instructions}</Paragraph>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rating:</Text>
            <Paragraph>{recipe.rating} / 5</Paragraph>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});
