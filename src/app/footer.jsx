import React from 'react';
import styles from './footer.module.css';

function Footer() {
    return (
        <div className={styles.body}>
            <div>
                <label className='bold'>Services</label>
                <li>Events</li>
                <li>Contributions</li>
            </div>
            <br />
            <div className='alignCenter'>
                For more live updates, click <a href="https://chat.whatsapp.com/invite-link">here</a> to join our WhatsApp group.
            </div>
        </div>
    );
}

export default Footer;
