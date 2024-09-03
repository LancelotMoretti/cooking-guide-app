import { View, Text, StyleSheet, FlatList } from 'react-native';

const data = [
    { id: '22127121', name: 'Đào Việt Hoàng' },
    { id: '22127320', name: 'Bùi Tá Phát' },
    { id: '22127420', name: 'Nguyễn Hà Nam Trân' },
    { id: '22127433', name: 'Nguyễn Ngọc Anh Tú' },
    { id: '22127476', name: 'Đặng Triệu Kha' }
  ];
  
  const Item = ({ id, name }: { id: string, name: string }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemId}>{id}</Text>
      <Text style={styles.itemName}>{name}</Text>
    </View>
  );
  

export default function foundation() {
    return (
   
      <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item id={item.id} name={item.name} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
   
    )

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      paddingTop: 50,
    },
    list: {
      paddingHorizontal: 20,
    },
    itemContainer: {
      backgroundColor: '#fff',
      padding: 15,
      marginVertical: 8,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    itemId: {
      fontSize: 14,
      color: '#888',
      marginBottom: 5,
    },
    itemName: {
      fontSize: 16,
      color: '#333',
      fontWeight: 'bold',
    },
  });