import { Navigate, Route, Routes } from "react-router-dom";
import MeetingsManagement from "../../meetings/MeetingsManagement";
import NotFound from "../not-found/NotFound";

export default function Main() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/meetings" />} />
            <Route path="/meetings" element={<MeetingsManagement />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
