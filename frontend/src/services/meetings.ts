import axios from "axios";
import { Meeting, CreateMeetingDTO } from "../models/Meeting";

class MeetingsService {
    private baseURL = `${import.meta.env.VITE_REST_SERVER_URL}/api/meetings`;

    async getMeetingsByTeam(teamId: number): Promise<Meeting[]> {
        const { data } = await axios.get<Meeting[]>(`${this.baseURL}/team/${teamId}`);
        return data;
    }

    async createMeeting(meeting: CreateMeetingDTO): Promise<Meeting> {
        const { data } = await axios.post<Meeting>(this.baseURL, meeting);
        return data;
    }
}

export default new MeetingsService();
