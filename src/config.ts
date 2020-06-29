import {
    StyleSheet,
    Dimensions,
} from 'react-native'
const { width } = Dimensions.get('screen')
const textW = width / 7.0

// 获取某月天数
export const getMonthDays = (year: number, month: number): number => {
    var monthStartDate = new Date(year, month, 1);
    var monthEndDate = new Date(year, month + 1, 1);
    var days = (monthEndDate.getTime() - monthStartDate.getTime()) / (1000 * 60 * 60 * 24);
    return days;
}


export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#F3F6F9',
        height: 36,
        alignItems: 'center',
        marginBottom: 15
    },
    touch: {
        width: 20,
        height: 20,
        justifyContent: 'center'
    },
    dayView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 15
    },
    toolBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 56,
        alignItems: 'center',
    },
    toolBarTitle: {
        fontSize: 17,
        color: '#1F2329',
        fontWeight: 'bold',
    },
    cancelText: {
        color: '#94989C',
        fontSize: 15,
    },
    confirmText: {
        color: '#3C98DC',
        fontSize: 15,
    },
    headerTitle: {
        color: '#1F2329',
        fontSize: 16
    },
    weekText: {
        color: '#505355',
        fontSize: 14
    },
    textView: {
        width: textW,
        height: textW * 0.7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    grayText: {
        color: '#C7C8CA',
        fontSize: 20,
        fontWeight: '500'
    },
    blackText: {
        color: '#1F2329',
        fontSize: 20,
        fontWeight: '500'
    },
    timeView: {
        height: 66,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    timeTitle: {
        color: '#505355',
        fontSize: 18
    },
    timeText: {
        color: '#3C98DC',
        fontSize: 24,
        fontWeight: '500',
    },
    flatListStyle: {
        width: 60,
        height: 40,
    },
    flatListCotentStyle: {
        alignItems: 'center',
    },
    seletedDay: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#3C98DC',
        justifyContent: 'center',
        alignItems: 'center'
    }
})