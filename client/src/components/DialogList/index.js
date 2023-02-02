import React,{useEffect, useState} from 'react';
import styles from './DialogList.module.css'
import {getAllUsersChats} from '../../api/index';
import {useNavigate} from 'react-router-dom'

const DailogList = () => {
    const [list, setList] = useState(null)
    const navigate = useNavigate();
    useEffect (() => {
        getAllUsersChats().
        then(({data:{data}}) => setList(data)).catch(err => {
            navigate('/')
        })
    }, []);


    const mapList = (chat) => {
        return <li key={chat._id}>{chat.name}</li>
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
