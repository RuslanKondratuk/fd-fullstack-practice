import React from 'react';
import Chat from '../../components/Chat';
import DailogList from '../../components/DialogList';
import MessageArea from '../../components/MessageArea';
import styles from './Dashboard.module.css';


const Dashboard = () => {
    return (
        <main className={styles.main}>
            <DailogList />
            <section className={styles.container}>
                <Chat/>
                <MessageArea/>
            </section>
        </main>
    );
}

export default Dashboard;
