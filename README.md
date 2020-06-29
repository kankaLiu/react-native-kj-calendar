## react-native-kj-calendar
react-native日历组件

#### Installation
npm install react-native-kj-calendar --save
 or 
 yarn add react-native-kj-calendar --save

#### Usage
```
import { KJCalendar } from 'react-native-kj-calendar'

const App = () => {
  return (
    <View>
        <KJCalendar
            onDayPress={(dayModel) => { console.log('click day:', dayModel) }}
            onConfirm={(dayModel) => { console.log('click confirm:', dayModel) }}
            onCancel={() => { console.log('click cancel') }}
        />
    </View>
  );
};
```