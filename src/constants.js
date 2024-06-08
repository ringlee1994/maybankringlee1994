import { Dimensions } from 'react-native';


export const SCREEN_INFO = {
  HEIGHT: Dimensions.get('window').height,
  WIDTH: Dimensions.get('window').width,
}


export const THIRD_PARTY_API = {
  GOOGLE_API_KEY: 'AIzaSyCHlaG352uZqs3lVQ_pTCjFYP2I2PEROCA',
};


export const COUNTRY_FORMAT = {
  MALAYSIA: 'country:my',
}


export default Object.assign(
  SCREEN_INFO,
  THIRD_PARTY_API,
  COUNTRY_FORMAT,
);