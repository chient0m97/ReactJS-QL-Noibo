import { DatePicker } from 'antd';
import React from 'react'

const { RangePicker } = DatePicker;

function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
    console.log('onOk: ', value);
}

class DatePickercustom extends React.Component {
    render() {
        var mode = ['month', 'month']
        return (
            <div>
                <DatePicker showTime placeholder="Select Time" onChange={onChange} onOk={onOk} />
                <br />
                <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={['Start Time', 'End Time']}
                    mode = {mode}
                    onChange={onChange}
                    onOk={onOk}
                />
            </div>
        )
    }
}
  export default DatePickercustom