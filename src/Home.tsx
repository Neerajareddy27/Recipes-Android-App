import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type RecipeItem = {
  id: number;
  name: string;
};

type RecipeResponse = {
  recipes: RecipeItem[];
};

export default function Home({ navigation }: Props) {
  const [data, setData] = useState<RecipeResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios.get<RecipeResponse>('https://dummyjson.com/recipes')
      .then((response) => setData(response.data))
      .catch((err) => setError(err));
  }, []);

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!data) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recipes</Text>
      <FlatList
        data={data.recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Recipes', { id: item.id })}
            style={styles.item}
          >
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  item: { padding: 15, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 8 },
  text: { fontSize: 18 },
});