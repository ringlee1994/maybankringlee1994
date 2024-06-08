import React from 'react';
import { FlatList, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WingBlank } from '@ant-design/react-native'

const SearchHistoryList: React.FC<any> = ({ locations, modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableOpacity
        style={styles.centeredView}
        onPress={() => setModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalView}
          onPress={() => { }}
        >
          <Text style={styles.modalText}>Search History</Text>
          <FlatList
            data={locations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <WingBlank>
                <Text style={styles.locationText}>{item}</Text>
              </WingBlank>
            )}
          />
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: '#2196F3' }}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
    width: '80%',
    maxHeight: '80%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationText: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 12,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SearchHistoryList;