import pnu from '../../assets/appsiconspng/pnu.png'
import sm from '../../assets/appsiconspng/sm.png'
import tb from '../../assets/appsiconspng/toolbox.png'
import './AppAccessButtons.css'

import { useNavigate } from "react-router-dom";


const apps = [
    {
        id: 1,
        name: 'PN University',
        link: '/pnu',
        icon: pnu
    },
    {
        id: 2,
        name: 'Social Media',
        link: '/social-media',
        icon: sm
    },
    {
        id: 3,
        name: 'Tool Box',
        link: '/toolbox',
        icon: tb
    }
]

export function MenuButtons() {
    const navigate = useNavigate();

    return (
        <div className="menucontainer">
            {apps.map(
                (app) => {
                    return (
                        <button
                            key={app.id}
                            className="button menubutton"
                            onClick={() => navigate(app.link)}
                        >
                            <img src={app.icon} />
                            <p>{app.name}</p>
                        </button>
                    )
                }
            )}
        </div>
    )
}