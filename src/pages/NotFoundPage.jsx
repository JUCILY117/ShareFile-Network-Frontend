import React, { useEffect, useState } from 'react';
import styles from './css/NotFoundPage.module.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    const [glitchText, setGlitchText] = useState("404 NOT FOUND");

    const glitchTexts = [
        "404が見つかりません",
        "404 NOT FOUND",
        "404 찾을 수 없음",
        "404 未找到",
        "PAGE NOT FOUND",
        "找不到页面",
        "페이지를 찾을 수 없습니다",
        "ページが見つかりません"
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomText = glitchTexts[Math.floor(Math.random() * glitchTexts.length)];
            setGlitchText(randomText);
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.container}>
            <img className={styles.logo} src="/logo.png" alt="logo" />
            <h2 className={styles.text} data-text={glitchText}>
                {glitchText}
            </h2>
            <div className={styles.subtext}>
                <Link to='/' className={styles.link}>
                    <span className={styles.glitch} data-text="Back to Homepage">Back to Homepage</span>
                </Link>
            </div>
            <footer className={styles.footer}>
                <p>© 2024 ShareFile Network. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default NotFoundPage;
