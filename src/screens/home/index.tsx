import React, { useEffect, useState, useCallback } from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Card, Button } from '@ant-design/react-native';
import MapView, { Marker } from 'react-native-maps';
import Autocomplete from 'react-native-autocomplete-input';
import Geolocation from '@react-native-community/geolocation';
import _debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';


import constants from '../../constants';
import { saveSearchResult } from '../../redux/actions/savesearchresult';
import SearchHistoryList from '../../components/searchhistorylist';


const Home: React.FC<any> = () => {
  const dispatch = useDispatch();
  const locations = useSelector((state: any) => state.saveSearchResultReducer.locations);
  const [latitude, setLatitude] = useState<any>(null);
  const [longitude, setLongitude] = useState<any>(null);
  const [locationAddress, setLocationAddress] = useState([]);
  const [queryLocationAddress, setQueryLocationAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);




  useEffect(() => {
    handleCurrentLocation();
  }, [])




  const handleCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
    );
  }




  const handleOnChangeLocation = async (input: string) => {
    try {
      const result = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${constants.GOOGLE_API_KEY}&input=${input}&components=${constants.MALAYSIA}`,
      );
      const data = await result.json();
      setLocationAddress(data.predictions);
    } catch (err) {
      // console.log(err)
    }
  }




  const changeTextDebouncer = useCallback(_debounce(handleOnChangeLocation, 200), []);




  return (
    <SafeAreaView style={styles.m20}>
      <SearchHistoryList locations={locations} modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <View style={styles.mainContainer}>
        <Autocomplete
          data={locationAddress}
          value={queryLocationAddress}
          onChangeText={(text) => {
            setQueryLocationAddress(text)
            changeTextDebouncer(text);
          }}
          flatListProps={{
            keyExtractor: (item: any) => item.place_id,
            renderItem: ({ item }) => (
              <TouchableOpacity
                onPress={async () => {

                  setQueryLocationAddress(item.description);
                  setLocationAddress([]);

                  try {
                    const result = await fetch(
                      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${item.place_id}&key=${constants.GOOGLE_API_KEY}`,
                    );
                    const data = await result.json();
                    let coordinate = data.result.geometry.location;
                    let location_description = item.description;
                    let location_lat = coordinate.lat.toString();
                    let location_lng = coordinate.lng.toString();


                    dispatch(saveSearchResult(location_description));
                    setSelectedLocation(location_description);
                    setLatitude(Number(location_lat));
                    setLongitude(Number(location_lng));
                    setQueryLocationAddress('');


                  } catch (err) {
                    // console.log(err)
                  }
                }}>
                <View style={[styles.row, styles.searchTextContainer]}>
                  <Text style={styles.searchText}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
          hideResults={false}
          autoCapitalize={"none"}
          autoCorrect={false}
          placeholderTextColor={'grey'}
          placeholder={'Search Location'}
        />

        <View style={styles.mv5} />
        <Button type="ghost" size="small" onPress={() => setModalVisible(!modalVisible)}>
          show search history
        </Button>
        <View style={styles.mv5} />

        <Card>
          <View style={styles.p5}>
            <MapView
              showsUserLocation={true}
              style={styles.mapContainer}
              region={{
                latitude,
                longitude,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }}>
              <Marker coordinate={{ latitude, longitude }} pinColor={"red"} />
            </MapView>
          </View>
          <Card.Body>
            <View style={styles.flex}>
              <Text style={styles.selectedLocationText}>{selectedLocation == "" ? null : selectedLocation}</Text>
            </View>
          </Card.Body>
        </Card>
      </View>
    </SafeAreaView>
  );
}




export default Home;




const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  m20: {
    margin: 20
  },
  mv5: {
    marginVertical: 5
  },
  fs12: {
    fontSize: 12,
  },
  p5: {
    padding: 5,
  },
  mainContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  mapContainer: {
    paddingTop: 80,
    justifyContent: 'center',
    alignSelf: 'center',
    height: constants.HEIGHT / 1.50,
    width: constants.WIDTH / 1.25,
  },
  row: {
    flexDirection: 'row',
  },
  searchText: {
    color: 'grey',
  },
  searchTextContainer: {
    marginHorizontal: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
  },
  selectedLocationText: {
    marginLeft: 16,
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
})
