import React from 'react';
import logoSub from '../../assets/logosubcoffe.png';
import footPageImg from '../../assets/footPageIMG.png';
import SocialIcons from '../atomos/iconFootPge';
import senaLogo from '../../assets/senaLogoPng.png';

function FootPage() {
    const footerStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${footPageImg})`, // Superponemos un gradiente negro semitransparente
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '200px', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px', 
        width: '80%',
    };

    const logoContainerStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const logoStyle = {
        marginLeft: '10px',
    };

    const socialIconsStyle = {
        display: 'flex',
        alignItems: 'center',
        paddingLeft:'330px', 
        justifyContent: 'center' 
    };

    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>
                <div>
                    <div style={socialIconsStyle}>
                        <SocialIcons />
                    </div>
                    <p>Términos y Condiciones</p>
                    <p>Soporte de Usuario</p>
                </div>
                <div style={logoContainerStyle}>
                    <img src={senaLogo} alt="SENA Logo" className="w-16 h-16 mx-2" style={logoStyle} />
                    <img src={logoSub} alt="SubCoffe Logo" className="w-16 h-16 mx-2" style={logoStyle} />
                </div>
            </div>
            <p className="text-sm">© 2024 SubCoffe. Todos los derechos reservados.</p>
        </footer>
    );
}

export default FootPage;
