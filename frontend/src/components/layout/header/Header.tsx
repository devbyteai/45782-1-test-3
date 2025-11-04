import './Header.css';

export default function Header() {
    return (
        <div className='Header'>
            <div className="header-content">
                <div className="header-icon">📅</div>
                <div className="header-text">
                    <h1>Meetings Management</h1>
                    <span className="header-subtitle">Organize and track your team meetings</span>
                </div>
            </div>
        </div>
    );
}