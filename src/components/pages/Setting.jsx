import './Setting.css'
import { ReturnButton } from '../ReturnButton';
import { useEffect, useState } from "react";

export function Setting() {

    const [golestanPassword, setGolestanPassword] = useState("");
    const [samanehPassword, setSamanehPassword] = useState("");

    useEffect(() => {
        chrome.storage.local.get(
            ["golestanPassword", "samanehPassword"],
            (result) => {
                setGolestanPassword(result.golestanPassword || "");
                setSamanehPassword(result.samanehPassword || "");
            }
        );
    }, []);

    function saveGolestan() {
        chrome.storage.local.set({
            golestanPassword
        });
    }

    function saveSamaneh() {
        chrome.storage.local.set({
            samanehPassword
        });
    }
    return (
        <>
            <>
                <div>
                    <input
                        placeholder="Golestan Password"
                        value={golestanPassword}
                        onChange={(e) => setGolestanPassword(e.target.value)}
                    />

                    <button
                        className="button submitbutton"
                        onClick={saveGolestan}
                    >
                        Submit
                    </button>
                </div>

                <div>
                    <input
                        placeholder="Samaneh Password"
                        value={samanehPassword}
                        onChange={(e) => setSamanehPassword(e.target.value)}
                    />

                    <button
                        className="button submitbutton"
                        onClick={saveSamaneh}
                    >
                        Submit
                    </button>
                </div>
            </>
            <ReturnButton />

        </>
    )
}