import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native'
const PREICON = require('./assets/pre_icon.png')
const NEXTICON = require('./assets/next_icon.png')

import { styles, getMonthDays } from './config'

const weekArr = ['日', '一', '二', '三', '四', '五', '六']

interface DayModel {
    year: number
    month: number
    day: number
    week: number
    dateString: string // yyyy-MM-dd
}


interface Props {
    onDayPress?: (dayModel: DayModel) => void
    onConfirm?: (dayModel: DayModel) => void
    onCancel?: () => void
}

export const KJCalendar = (props: Props) => {

    const { onDayPress, onConfirm, onCancel } = props

    // 当前时间的年月日
    const now = new Date();                    //当前日期
    const nowMonth = now.getMonth();           //当前月
    const nowYear = now.getFullYear();         //当前年
    const nowDay = now.getDate()               //当前日
    const nowWeek = now.getDay()

    // 当前选中的日期
    const selectedDayRef = useRef<DayModel>({
        year: nowYear,
        month: nowMonth,
        day: nowDay,
        week: nowWeek,
        dateString: `${nowYear}-${nowMonth}-${nowDay}`
    })
    // 日期组件数组
    const [dayTextArr, setDayTextArr] = useState<any[]>([])
    const [year, setYear] = useState(nowYear)
    const [month, setMonth] = useState(nowMonth)

    useEffect(() => {
        const days = getMonthDays(year, month)
        const oneWeekIndex = new Date(year, month, 1).getDay()
        setDayTextArr(initTextArr(days, oneWeekIndex))
    }, [year, month])

    // 下一个月
    const nextMonth = useCallback(() => {
        let nextMonth = month + 1
        let pickYear = year
        if (nextMonth > 11) {
            pickYear += 1
            setYear(pickYear)
            nextMonth = 0
        }
        setMonth(nextMonth)
    }, [year, month])
    // 上一个月
    const preMonth = useCallback(() => {
        let preMonth = month - 1
        let pickYear = year
        if (preMonth < 0) {
            pickYear -= 1
            setYear(pickYear)
            preMonth = 11
        }
        setMonth(preMonth)
    }, [year, month])

    // 组织时间字符串
    const resetDateString = (dayModel: DayModel) => {
        // 不满10补0
        let dateString = `${dayModel.year}-`
        dateString += (dayModel.month < 9) ? `0${dayModel.month + 1}-` : `${dayModel.month + 1}-`
        dateString += (dayModel.day < 10) ? `0${dayModel.day}-` : `${dayModel.day}`
        dayModel.dateString = dateString
        return dayModel
    }

    const initTextArr = useCallback((days: number, weekIndex: number): JSX.Element[] => {
        // 组织Text数组
        let textArr = []

        // 获取上个月的天数
        let preYear = year
        let preMonthNum = month - 1
        if (preMonthNum < 0) {
            preYear -= 1
            preMonthNum = 11
        }
        const preDays = getMonthDays(preYear, preMonthNum)

        for (let index = 0; index < weekIndex; index++) {
            const pickDay = preDays - weekIndex + index + 1
            textArr.push(
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        preMonth()
                        const dayModel: DayModel = {
                            year: preYear,
                            month: preMonthNum,
                            day: pickDay,
                            dateString: `${preYear}-${preMonthNum + 1}-${pickDay}`,
                            week: index
                        }

                        selectedDayRef.current = resetDateString(dayModel)
                        setDayTextArr(initTextArr(preDays, index))
                        onDayPress && onDayPress(dayModel)
                    }}>
                    <View style={styles.textView}>
                        <Text style={styles.grayText}>{pickDay}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        const textArrIndex = textArr.length
        for (let index = 0; index < days; index++) {
            const seletedDay = selectedDayRef.current
            const isSelected = seletedDay?.year === year && seletedDay?.month === month && seletedDay?.day === index + 1
            const isNow = nowYear === year && nowMonth === month && nowDay === index + 1
            textArr.push(
                <TouchableOpacity
                    key={textArrIndex + index}
                    onPress={() => {
                        const dayModel: DayModel = {
                            year: year,
                            month: month,
                            day: index + 1,
                            dateString: `${year}-${month + 1}-${index + 1}`,
                            week: (index + weekIndex) % 7
                        }
                        selectedDayRef.current = resetDateString(dayModel)
                        setDayTextArr(initTextArr(days, weekIndex))
                        onDayPress && onDayPress(dayModel)
                    }}>
                    {
                        isSelected ?
                            <View style={styles.textView}>
                                <View style={styles.seletedDay}>
                                    <Text style={[styles.blackText, { color: '#FFF' }]}>
                                        {index + 1}
                                    </Text>
                                </View>
                            </View>
                            :
                            <View style={styles.textView}>
                                <Text style={[styles.blackText, isNow && { color: '#3C98DC' }]}>
                                    {index + 1}
                                </Text>
                            </View>
                    }

                </TouchableOpacity>
            )
        }
        const nextNum = 42 - textArr.length// 7 - (textArr.length % 7)
        let nextYear = year
        let nextMonthNum = month + 1
        if (nextMonthNum > 11) {
            nextYear += 1
            nextMonthNum = 0
        }
        const nextDays = getMonthDays(nextYear, nextMonthNum)

        const beginWeekIndex = textArr.length % 7

        const textArrIndex_1 = textArr.length
        for (let index = 0; index < nextNum; index++) {
            const pickDay = index + 1
            textArr.push(
                <TouchableOpacity
                    key={textArrIndex_1 + index}
                    onPress={() => {
                        nextMonth()
                        const dayModel: DayModel = {
                            year: nextYear,
                            month: nextMonthNum,
                            day: pickDay,
                            dateString: `${nextYear}-${nextMonthNum + 1}-${pickDay}`,
                            week: (beginWeekIndex + index) % 7
                        }
                        selectedDayRef.current = resetDateString(dayModel)
                        setDayTextArr(initTextArr(nextDays, (beginWeekIndex + index) % 7))
                        onDayPress && onDayPress(dayModel)
                    }}>
                    <View style={styles.textView}>
                        <Text style={styles.grayText}>{pickDay}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        return textArr
    }, [year, month])


    const confirm = () => {
        onConfirm && onConfirm(selectedDayRef.current!)
    }

    const cancel = () => {
        onCancel && onCancel()
    }

    return (
        <View style={styles.container}>
            <View style={styles.toolBar}>
                <TouchableOpacity onPress={cancel}>
                    <Text style={styles.cancelText}>取消</Text>
                </TouchableOpacity>
                <Text style={styles.toolBarTitle}>选择时间</Text>
                <TouchableOpacity onPress={confirm}>
                    <Text style={styles.confirmText}>确定</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <TouchableOpacity style={styles.touch} onPress={preMonth}>
                    <Image source={PREICON} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{`${year}年${month + 1}月`}</Text>
                <TouchableOpacity style={[styles.touch, { alignItems: 'flex-end' }]} onPress={nextMonth}>
                    <Image source={NEXTICON} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                {
                    weekArr.map((item, index) => (
                        <View key={index} style={styles.textView}>
                            <Text style={styles.weekText}>{item}</Text>
                        </View>
                    ))
                }
            </View>
            <View style={styles.dayView}>
                {dayTextArr}
            </View>
        </View>
    )
}
