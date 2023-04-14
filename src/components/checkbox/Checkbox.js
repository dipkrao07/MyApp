import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { BaseColors } from '../../utils/BaseColors'

function CheckBox({ checked, onPress, style }) {
  return (
    <TouchableOpacity
      hitSlop={{ top: 20, bottom: 20, left: 30, right: 30 }}
      style={styles.mainframe}
      onPress={onPress}>
      <View style={checked ? styles.checkedStyle : styles.unCheckedStyle} />
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  mainframe: {
    height: 20,
    width: 20,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: BaseColors.headerColor,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5
  },
  checkedStyle: {
    backgroundColor: BaseColors.headerColor,
    flex: 1,
    margin: 1,
    borderRadius: 2
  },
  unCheckedStyle: {}
})
export default CheckBox
