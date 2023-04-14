import React, { useEffect, useState } from 'react'
import { Image, View, Text, Modal } from 'react-native'

import Feather from 'react-native-vector-icons/Feather'
import cardStyles from './cardStyles'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { debounce } from '../../utils/misc'
import CloseIcon from 'react-native-vector-icons/AntDesign'
import { Searchbar } from 'react-native-paper'
import { BaseColors } from '../../utils/BaseColors'
import { filterOption } from '../../assets/data/FilterOption'
import CheckBox from '../checkbox/Checkbox'
import moment from 'moment'
import Popup from '../modal/Popup'

function CardItem(props) {
  const [dataList, setDataList] = useState([])
  const [selectedFilter, setSelectedFilter] = useState()
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [activeItem, setActiveItem] = useState(null)
  const toggleMenuSwitch = () => {
    setIsMenuVisible(!isMenuVisible)
  }
  useEffect(() => {
    setDataList(props?.data)
  }, [props.data])

  const onChange = debounce(async val => {
    searchDetails(val)
  })

  const searchDetails = async (val = '') => {
    const text = val.toLowerCase()
    const data = props?.data.filter(data => {
      return data['im:artist'].label.toLowerCase().match(text)
    })
    setDataList(data)
  }

  const sortAbumList = () => {
    const temp = [...dataList]
    if (selectedFilter === 0) {
      let sortedByPrice = temp.sort((a, b) =>
        Number(a['im:price'].attributes.amount) >
        Number(b['im:price'].attributes.amount)
          ? 1
          : -1
      )
      setDataList(sortedByPrice)
    } else if (selectedFilter == 1) {
      const sortedByArtist = temp.sort((a, b) => {
        return a['im:artist'].label.localeCompare(b['im:artist'].label)
      })
      setDataList(sortedByArtist)
    } else if (selectedFilter == 2) {
      const sortedByReleaseDate = temp.sort((a, b) => {
        return a['im:releaseDate'].label.localeCompare(
          b['im:releaseDate'].label
        )
      })
      setDataList(sortedByReleaseDate)
    }
    setIsMenuVisible(false)
  }

  const onPress = item => {
    setActiveItem(item)
    setModalVisible(!modalVisible)
  }

  function renderItem(item) {
    return (
      <>
        <TouchableOpacity onPress={() => onPress(item)}>
          <View style={cardStyles.mainFrame}>
            <View style={cardStyles.col1}>
              <Image
                source={{ uri: item?.item['im:image'][0].label }}
                style={cardStyles.imgStyle}
              />
            </View>
            <View style={cardStyles.col2}>
              <View style={cardStyles.detail}>
                <Text style={cardStyles.title}>Song: </Text>
                <Text numberOfLines={1} style={cardStyles.subtitle}>
                  {item?.item?.['im:name']?.label}
                </Text>
              </View>
              <View style={cardStyles.detail}>
                <Text style={cardStyles.title}>Artist: </Text>
                <Text numberOfLines={1} style={cardStyles.subtitle}>
                  {item?.item?.['im:artist']?.label}
                </Text>
              </View>
              <View style={cardStyles.detail}>
                <Text style={cardStyles.title}>Price: </Text>
                <Text numberOfLines={1} style={cardStyles.subtitle}>
                  {item?.item?.['im:price'].label}
                </Text>
              </View>
              <View style={cardStyles.detail}>
                <Text style={cardStyles.title}>Release Date: </Text>
                <Text numberOfLines={1} style={cardStyles.subtitle}>
                  {moment(item?.item?.['im:releaseDate'].label).format(
                    'DD-MMM-yyyy'
                  )}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <>
      <View style={cardStyles.direction}>
        <Searchbar
          placeholder={'search here...'}
          autoFocus
          clearIcon
          style={cardStyles.placeSerachBar}
          onChangeText={onChange}
        />
        <Feather
          style={cardStyles.filterIcon}
          name="filter"
          size={30}
          onPress={toggleMenuSwitch}
          color={BaseColors.darkGrey}
        />
      </View>
      <FlatList
        data={dataList}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        extraData={dataList}
        scrollsToTop
      />
      <Popup
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        activeItem={activeItem}
      />

      {isMenuVisible ? (
        <>
          <View style={cardStyles.modalContainer}>
            <View style={cardStyles.modalBody}>
              <CloseIcon
                name={'close'}
                size={28}
                style={cardStyles.closeIconStyle}
                color="grey"
                onPress={() => setIsMenuVisible(false)}
              />
              <View>
                <Text style={cardStyles.filterTitle}>Sort by:</Text>
                <View>
                  {filterOption.map(checkbox => (
                    <View style={cardStyles.listStyle}>
                      <CheckBox
                        style={cardStyles.checkBoxStyle}
                        checked={selectedFilter === checkbox.value}
                        onPress={() => {
                          setSelectedFilter(prev =>
                            prev === checkbox.value ? undefined : checkbox.value
                          )
                        }}
                      />
                      <Text style={cardStyles.bodyTitle}>
                        {checkbox?.title}
                      </Text>
                    </View>
                  ))}
                </View>
                <TouchableOpacity onPress={sortAbumList}>
                  <Text style={cardStyles.buttonstyle}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      ) : null}
    </>
  )
}

export default CardItem
