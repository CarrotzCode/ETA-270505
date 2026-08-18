import setting from '../assets/setting.png'
import './Footer.css'
import { ThemeMode } from '../components/ThemeMode'
import { useNavigate } from "react-router-dom";

export function Footer() {
    const navigate = useNavigate();

    return (
        <div className='footer'>
            <button
                className="settingicon button "
                onClick={() => navigate('/setting')}
            >
                <img src={setting} />
            </button>
            <p className='versioninfo'>v1.0.0-alpha</p>
            <ThemeMode />
        </div>
    )
}