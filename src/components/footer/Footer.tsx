import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className='footer'>
            <p>Пиццы испекли мы, а сайт испек-
                <a
                    href='https://www.instagram.com/toshmatoww/'
                    target='_blank'
                >
                    Toshmatov Humoyun
                </a>
            </p>
        </footer>
    );
};

export default Footer;