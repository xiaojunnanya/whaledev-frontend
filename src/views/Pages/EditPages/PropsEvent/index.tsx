import { memo, useState } from 'react'
import Props from '../Side/ComponentLibrary/Setting/props'
import Event from '../Side/ComponentLibrary/Setting/event'
import { PropsEventStyled } from './style'
import { Segmented } from 'antd'

const options = [
    {
        label: '属性',
        value: 'props'
    },
    {
        label: '事件',
        value: 'event'
    },
]

export default memo(() => {

    const [ value, setValue ] = useState<string>('props')

    const showCom = () =>{
        let com = null

        switch (value) {
            case 'props': com = <Props />; break;
            case 'event': com = <Event />; break;
            default: break;
        }

        return com
    }

    return (
        <PropsEventStyled>
            <Segmented options={options} value={value} block onChange={(v) => { setValue(v) }}/>
            
            {
                showCom()
            }
            
        </PropsEventStyled>
    )
})