import { Link } from "react-router-dom";
import "../styles/auth.css";

function Navbar() {
    return (
        <nav style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--glass-border)',
            padding: '1rem 0',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 20px'
            }}>
                <Link to="/" style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: 'var(--text-main)',
                    letterSpacing: '-0.5px'
                }}>
                    <span style={{ color: 'var(--accent-primary)' }}>Car</span>Inventory
                </Link>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <Link to="/login" style={{
                        padding: '8px 20px',
                        color: 'var(--text-main)',
                        fontWeight: '500',
                        borderRadius: '8px',
                        transition: 'background 0.2s',
                    }}
                    onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseOut={(e) => e.target.style.background = 'transparent'}
                    >
                        Login
                    </Link>

                    <Link to="/register" style={{
                        padding: '8px 20px',
                        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                        color: 'white',
                        fontWeight: '600',
                        borderRadius: '8px',
                        boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
                        transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;