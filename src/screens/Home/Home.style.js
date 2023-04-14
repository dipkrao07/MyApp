import { StyleSheet } from 'react-native'
import { BaseColors } from '../../utils/BaseColors'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  SafeAreaView1: { backgroundColor: BaseColors.headerColor, flex: 0 },
  SafeAreaView2: { flex: 1, backgroundColor: BaseColors.white },
  outerWrapper: {
    flex: 1,
    margin: 20
  },
  text: { fontSize: 18, color: BaseColors.textGrey, fontWeight: 'bold' }
})
