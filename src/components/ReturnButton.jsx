import { useNavigate } from "react-router-dom";
import returnpng from '../assets/return.png'
export function ReturnButton() {
    const navigate = useNavigate();

    return (
        <button
            className="button returnbutton"
            onClick={() => navigate('/')}
        >
            <img
                src={returnpng}
                style={{
                    filter: "var(--image-filter)"
                }}
            />
        </button>
    )
};