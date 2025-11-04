import { DevelopmentTeam } from "./DevelopmentTeam";

export interface Meeting {
    id: number;
    development_team_id: number;
    start_datetime: string;
    end_datetime: string;
    description: string;
    room: string;
    createdAt?: string;
    updatedAt?: string;
    developmentTeam?: DevelopmentTeam;
}

export interface CreateMeetingDTO {
    development_team_id: number;
    start_datetime: string;
    end_datetime: string;
    description: string;
    room: string;
}
