import { DevelopmentTeam } from '../../models/DevelopmentTeam';

interface TeamSelectProps {
    teams: DevelopmentTeam[];
    selectedTeamId: number | null;
    onTeamChange: (teamId: number | null) => void;
}

function TeamSelect({ teams, selectedTeamId, onTeamChange }: TeamSelectProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        onTeamChange(value ? parseInt(value) : null);
    };

    return (
        <div className="team-select-container">
            <label htmlFor="team-select">Select Development Team:</label>
            <select
                id="team-select"
                className="team-select"
                value={selectedTeamId || ''}
                onChange={handleChange}
            >
                <option value="">-- Select a Team --</option>
                {teams.map(team => (
                    <option key={team.id} value={team.id}>
                        {team.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TeamSelect;
