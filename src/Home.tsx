import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Button, ActivityIndicator, Card, Title } from 'react-native-paper';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { config } from './config/config';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface RecipeItem {
  id: number;
  name: string;
}

interface RecipeResponse {
  recipes: RecipeItem[];
}

export default function Home({ navigation }: Props) {
  const [data, setData] = useState<RecipeResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios.get<RecipeResponse>(config.API_URL)
      .then((response) => setData(response.data))
      .catch((err) => setError(err));
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Recipes</Title>
        {data.recipes.map((item) => (
          <Card key={item.id} style={styles.card}>
            <Card.Content>
              <Button
                mode="outlined"
                onPress={() => navigation.navigate('Recipes', { id: item.id })}
                style={styles.button}
              >
                {item.name}
              </Button>
            </Card.Content>
          </Card>
        ))}
      </View>
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
  content: {
    padding: 16,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  button: {
    marginVertical: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});
