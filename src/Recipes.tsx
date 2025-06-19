import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

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
    axios.get<RecipeDetail>(`https://dummyjson.com/recipes/${id}`)
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
    return <Text>Error: {error.message}</Text>;
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!recipe) {
    return <Text>No recipe found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <Text style={styles.text}><Text style={styles.bold}>Ingredients :</Text> {recipe.ingredients.join(', ')}</Text>
      <Text style={styles.text}><Text style={styles.bold}>Instructions:</Text> {recipe.instructions}</Text>
      <Text style={styles.text}><Text style={styles.bold}>Rating:</Text> {recipe.rating}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 10 },
  bold: { fontWeight: 'bold' },
});
