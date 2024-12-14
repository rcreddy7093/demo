"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../contribution/contribution.module.css';
import ContributionPieChart from '../contribution/ContributionPieChart';
import ContributionLineChart from '../contribution/ContributionLineChart';
import MyContributionTable from './myContributionTable'
export default function MyContributions() {
    const [data, setData] = useState([]); // Table data
    const searchParams = useSearchParams(); // Hook to access query parameters

    const userId = searchParams.get('userId');

    useEffect(() => {
        if (userId) {
            fetchData();
        }
    }, [userId]); // Trigger fetchData when userId changes

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/contribution/getByUserId?id=${userId}`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div>
            <h2 className="alignCenter">My Contributions</h2>
            <div className={styles.chartsContainer}>
                <div className={styles.chart}>
                    <ContributionPieChart data={data} />
                </div>
                <div className={styles.chart}>
                    <ContributionLineChart data={data} />
                </div>
            </div>
            <h4 className="alignCenter">history</h4>
            <div>
                <MyContributionTable data={data}/>
            </div>

        </div>
    );
}
