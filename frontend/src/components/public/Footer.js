import React from 'react';
import { Link } from 'react-router-dom'

import './footer.css'

const Footer = () => {
    return (
        <footer>
            <a href='mailto:cboboy@free.fr'>Cboboy</a>
            <Link to="/contact">Contact</Link>
        </footer>
    );
};

export default Footer;