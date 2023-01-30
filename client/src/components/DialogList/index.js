import React,{useEffect, useState} from 'react';
import styles from './DialogList.module.css'
import {getAllUsersChats} from '../../api/index'

const DailogList = () => {
    const [list, setList] = useState(null)

    useEffect (() => {
        getAllUsersChats().
        then(({data:{data}}) => setList(data))
    }, []);


    const mapList = (chat) => {
        return <li>{chat.name}</li>
    }
    return (
        <div className={styles.dialog}>
        <ul>
            {list && list.map(mapList)}
        </ul>

        </div>
    );
}

export default DailogList;
