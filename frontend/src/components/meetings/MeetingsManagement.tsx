import { useState, useEffect } from 'react';
import { DevelopmentTeam } from '../../models/DevelopmentTeam';
import { Meeting, CreateMeetingDTO } from '../../models/Meeting';
import developmentTeamsService from '../../services/developmentTeams';
import meetingsService from '../../services/meetings';
import TeamSelect from './TeamSelect';
import MeetingsList from './MeetingsList';
import AddMeetingForm from './AddMeetingForm';
import './MeetingsManagement.css';

function MeetingsManagement() {
    const [teams, setTeams] = useState<DevelopmentTeam[]>([]);
    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    // Load all teams on mount
    useEffect(() => {
        loadTeams();
    }, []);

    // Load meetings when team is selected
    useEffect(() => {
        if (selectedTeamId) {
            loadMeetings(selectedTeamId);
        } else {
            setMeetings([]);
        }
    }, [selectedTeamId]);

    const loadTeams = async () => {
        try {
            setLoading(true);
            const data = await developmentTeamsService.getAll();
            setTeams(data);
            setError(null);
        } catch (err) {
            setError('Failed to load development teams');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadMeetings = async (teamId: number) => {
        try {
            setLoading(true);
            const data = await meetingsService.getMeetingsByTeam(teamId);
            setMeetings(data);
            setError(null);
        } catch (err) {
            setError('Failed to load meetings');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleTeamChange = (teamId: number | null) => {
        setSelectedTeamId(teamId);
        setShowAddForm(false);
    };

    const handleAddMeeting = async (meeting: CreateMeetingDTO) => {
        try {
            setLoading(true);
            await meetingsService.createMeeting(meeting);
            setError(null);
            setShowAddForm(false);

            // Reload meetings if the new meeting is for the selected team
            if (selectedTeamId === meeting.development_team_id) {
                await loadMeetings(selectedTeamId);
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to create meeting';
            setError(errorMessage);
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="meetings-management">
            <h1>Meetings Management System</h1>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <TeamSelect
                teams={teams}
                selectedTeamId={selectedTeamId}
                onTeamChange={handleTeamChange}
            />

            <div className="actions">
                <button
                    className="btn btn-primary"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? 'Cancel' : 'Add New Meeting'}
                </button>
            </div>

            {showAddForm && (
                <AddMeetingForm
                    teams={teams}
                    defaultTeamId={selectedTeamId}
                    onSubmit={handleAddMeeting}
                    onCancel={() => setShowAddForm(false)}
                />
            )}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                selectedTeamId && (
                    <MeetingsList
                        meetings={meetings}
                        teamName={teams.find(t => t.id === selectedTeamId)?.name || ''}
                    />
                )
            )}
        </div>
    );
}

export default MeetingsManagement;
