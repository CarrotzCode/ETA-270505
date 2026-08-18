import { ReturnButton } from '../ReturnButton';
import { useState, useEffect } from 'react';
import './PNUPage.css';

export function PNUPage() {
    const [log, setLog] = useState('کپی متن سوال')
    const [passwords, setPasswords] = useState({});

    useEffect(() => {
        chrome.storage.local.get("passwords", (result) => {
            setPasswords(result.passwords || {});
        });
    }, []);

    const buttons = [
        {
            name: "Golestan",
            link: "https://reg1.pnu.ac.ir/forms/authenticateuser/main.htm",
            password: passwords.golestan

        },
        {
            name: 'Classes',
            link: 'https://lms.alborz.pnu.ac.ir/Identity/Account/Login?returnUrl=%2F',
            password: passwords.classes
        }
    ];

    async function Copy() {
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        const [{ result: text }] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => document.querySelector("#grid")?.innerText || ""
        });

        await navigator.clipboard.writeText(text);
        setLog("Copied");
    }


    return (
        <div id='button-container'>
            {buttons.map((button) => {
                return (
                    <button
                        key={button.name}
                        className="pnubutton button"
                        onClick={() => {
                            navigator.clipboard.writeText(button.password);

                            window.open(button.link);
                        }}
                    >{button.name}</button>
                )
            })}
            <button
                className='pnubutton button'
                onClick={Copy}>{log}</button>
            <ReturnButton />
        </div>
    )
}

