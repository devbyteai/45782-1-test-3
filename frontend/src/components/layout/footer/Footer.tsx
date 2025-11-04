import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div className='Footer'>
            <div className="footer-content">
                <div className="footer-left">
                    <span className="footer-logo">📅 Meetings Management</span>
                    <span className="footer-tagline">Streamline your team collaboration</span>
                </div>
                <div className="footer-right">
                    <span className="footer-copyright">© {currentYear} All rights reserved</span>
                </div>
            </div>
        </div>
    );
}