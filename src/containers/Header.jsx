import { ChatGpt } from '../components/Header/ChatGpt'
import { WeatherApp } from '../components/Header/WeatherApp'
import './Header.css'

export function Header() {
    return (
        <div className='container'>
            <ChatGpt />
            <WeatherApp />
        </div>
    )
};