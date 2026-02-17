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


                // const value = Number(item[featureKey]) || 0;
                // const barWidth = `${(value / 5) * 100}%`;

                // return (
                //   <View key={featureKey} style={styles.featureRow}>
                //     <Text style={styles.featureLabel}>
                //       {featureKey} {value}
                //     </Text>
                //     <View style={styles.barTrack}>
                //       <View style={[styles.barFill, { width: barWidth }]} />
                //     </View>
                //   </View>
                // );

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
  barTrack: {
    width: 150,
    height: 14,
    backgroundColor: '#cfcfcf',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#666',
  },
  starsText: {
    width: 150,
    textAlign:'right',
    fontSize: 22,
    lineHeight: 26,
  },
});