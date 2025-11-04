import axios from "axios";
import { DevelopmentTeam } from "../models/DevelopmentTeam";

class DevelopmentTeamsService {
    private baseURL = `${import.meta.env.VITE_REST_SERVER_URL}/api/development-teams`;

    async getAll(): Promise<DevelopmentTeam[]> {
        const { data } = await axios.get<DevelopmentTeam[]>(this.baseURL);
        return data;
    }
}

export default new DevelopmentTeamsService();
