import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import React from 'react'
import cardStyles from '../card/cardStyles'
import moment from 'moment'

export default function Popup({ modalVisible, setModalVisible, activeItem }) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={cardStyles.mainFrame}>
              <View style={cardStyles.col1}>
                <Image
                  source={{ uri: activeItem?.item['im:image'][0].label }}
                  style={cardStyles.imgStyle}
                />
              </View>
              <View style={cardStyles.col2}>
                <View style={cardStyles.detail}>
                  <Text style={cardStyles.title}>Song: </Text>
                  <Text numberOfLines={1} style={cardStyles.subtitle}>
                    {activeItem?.item?.['im:name']?.label}
                  </Text>
                </View>
                <View style={cardStyles.detail}>
                  <Text style={cardStyles.title}>Artist: </Text>
                  <Text numberOfLines={1} style={cardStyles.subtitle}>
                    {activeItem?.item?.['im:artist']?.label}
                  </Text>
                </View>
                <View style={cardStyles.detail}>
                  <Text style={cardStyles.title}>Title: </Text>
                  <Text numberOfLines={1} style={cardStyles.subtitle}>
                    {activeItem?.item?.title?.label}
                  </Text>
                </View>
                <View style={cardStyles.detail}>
                  <Text style={cardStyles.title}>Price: </Text>
                  <Text numberOfLines={1} style={cardStyles.subtitle}>
                    {activeItem?.item?.['im:price'].label}
                  </Text>
                </View>
                <View style={cardStyles.detail}>
                  <Text style={cardStyles.title}>Release Date: </Text>
                  <Text numberOfLines={1} style={cardStyles.subtitle}>
                    {moment(activeItem?.item?.['im:releaseDate'].label).format(
                      'DD-MMM-yyyy'
                    )}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(!modalVisible)
              }}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})
