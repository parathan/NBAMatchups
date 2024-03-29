import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './index.module.css';
import Layout from "../../components/Layout/Layout";


function Dashboard() {
    return (
        <Layout>
            <div className={styles.header}>Dashboard</div>
        </Layout>
    )
}

export default Dashboard;