import "./ThemeMode.css"
import { useState } from "react";

export function ThemeMode() {
    const [lightMode, setLightMode] = useState(() => {
        const savedMode = localStorage.getItem("lightMode");
        if (savedMode === "true") {
            document.body.classList.add("light-mode");
            return true;
        }
        return false;
    });


    function toggleTheme() {
        const newMode = !lightMode;

        setLightMode(newMode);

        document.body.classList.toggle("light-mode", newMode);

        localStorage.setItem("lightMode", newMode);
    }


    return (
        <header>
            <label className="switch button">
                <input
                    onChange={toggleTheme}
                    type="checkbox"
                    checked={lightMode}
                />
                <span className="slider"></span>
            </label>
        </header>
    );
}