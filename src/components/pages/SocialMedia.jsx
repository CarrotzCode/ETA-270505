import InstagramIcon from '../../assets/appsiconspng/instagram.png';
import TelegramIcon from '../../assets/appsiconspng/telegram.png';
import WhatsAppIcon from '../../assets/appsiconspng/whatsapp.png';
import BaleIcon from '../../assets/appsiconspng/bale.png';
import { ReturnButton } from '../ReturnButton';
import './SocialMedia.css'
export function SocialMedia() {
    const Apps = [
        {
            name: 'Instagram',
            icon: InstagramIcon,
            src: 'https://www.instagram.com/?hl=en'
        },
        {
            name: 'Telegram',
            icon: TelegramIcon,
            src: 'https://web.telegram.org/'
        },
        {
            name: 'WhatsApp',
            icon: WhatsAppIcon,
            src: 'https://web.whatsapp.com/'
        },
        {
            name: 'Bale',
            icon: BaleIcon,
            src: 'https://web.bale.ai/'
        }
    ];
    return (
        <>
            <div className="apps">
                {Apps.map((app) => {
                    return (
                        <div
                            className="socialMediaApp button"
                            onClick={() => { window.open(app.src) }}>
                            <img src={app.icon} />
                            <p>{app.name}</p>
                        </div>
                    )
                })}
                <ReturnButton/>
            </div>
        </>
    )
}