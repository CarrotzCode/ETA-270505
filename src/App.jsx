import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/pages/Homepage";
import { PNUPage } from "./components/pages/PNUPage";
import { SocialMedia } from "./components/pages/SocialMedia";
import { ToolBox } from "./components/pages/ToolBox";
import { Setting } from "./components/pages/Setting";
import "./App.css";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pnu" element={<PNUPage />} />
                <Route path="/social-media" element={<SocialMedia />} />
                <Route path="/toolbox" element={<ToolBox />} />
                <Route path="/setting" element={<Setting />} />
            </Routes>
        </HashRouter>
    );
}

export default App;