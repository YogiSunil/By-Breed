import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { cats, dogs } from './breeds';


export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedBreeds = selectedIndex === 0 ? cats : dogs;
  const [searchText, setSearchText] = useState('');

  const breedsData = useMemo(
    () =>
      selectedBreeds.map((breed, index) => ({
        id: `${breed.breed}-${index}`,
        ...breed,
      })),
    [selectedBreeds]
  );

  const filteredBreeds = useMemo(() => {
    const term = searchText.trim().toLowerCase();
    if (!term) return breedsData;

    return breedsData.filter((breed) => 
    breed.breed.toLowerCase().includes(term));

  }, [breedsData, searchText]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>By Breed</Text>
        <Text style={styles.subtitle}>Cats: {cats.length} • Dogs: {dogs.length}</Text>
        <SegmentedControl
          values={['Cats', 'Dogs']}
          selectedIndex={selectedIndex}
          onChange={(event) => setSelectedIndex(event.nativeEvent.selectedSegmentIndex)}
          style={styles.segmentedControl}
        />
        <TextInput 
          value={searchText}
          onChangeText={setSearchText}
          placeholder='Search by breed name...'
          style={styles.searchInput}

        />
      </View>

      <FlatList
        data={filteredBreeds}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const featureKey = Object.keys(item).filter(
            (key) => key !== 'id' && key !== 'breed'
          );

          return (
            <View style={styles.row}>
              <Text style={styles.breedName}>{item.breed}</Text>

              {featureKey.map((featureKey) => {
                const value = Math.max(0, Math.min(5, Number(item[featureKey]) || 0));
                const stars = '⭐️'.repeat(value);

                return(
                  <View key={featureKey} style={styles.featureRow}>
                    <Text style={styles.featureLabel}>
                      {featureKey} {value}
                    </Text>
                    <Text style={styles.starsText}>{stars}</Text>
                  </View>
                )
              })}
            </View>
          );
        }}
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
    paddingTop: 50,
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
  segmentedControl: {
    marginTop: 12,
  },
  searchInput: {
    margin:10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',

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
    fontWeight: '700',
    marginBottom: 6,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 3,
  },
  featureLabel: {
    fontSize: 16,
    color: '#222',
    flex: 1,
    marginRight: 12,
  },
  starsText: {
    width: 150,
    textAlign:'right',
    fontSize: 22,
    lineHeight: 26,
  },
  
});