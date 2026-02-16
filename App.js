import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cats, dogs } from './breeds';

const allBreeds = [...cats, ...dogs].map((breed, index) => ({
  id: `${breed.breed}-${index}`,
  ...breed,
}));

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>By Breed</Text>
        <Text style={styles.subtitle}>Cats: {cats.length} • Dogs: {dogs.length}</Text>
      </View>

      <FlatList
        data={allBreeds}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.breedName}>{item.breed}</Text>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  list: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
    color: '#444',
  },
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  breedName: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
  },
});