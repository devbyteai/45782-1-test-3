import { Meeting } from '../../models/Meeting';

interface MeetingsListProps {
    meetings: Meeting[];
    teamName: string;
}

function MeetingsList({ meetings, teamName }: MeetingsListProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const calculateDuration = (startDateString: string, endDateString: string) => {
        const start = new Date(startDateString);
        const end = new Date(endDateString);
        const durationMs = end.getTime() - start.getTime();

        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 0 && minutes > 0) {
            return `${hours}h ${minutes}m`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else {
            return `${minutes}m`;
        }
    };

    if (meetings.length === 0) {
        return (
            <div className="no-meetings">
                <p>No meetings scheduled for {teamName}</p>
            </div>
        );
    }

    return (
        <div className="meetings-list">
            <h2>Meetings for {teamName}</h2>
            <div className="meetings-count">
                {meetings.length} {meetings.length === 1 ? 'meeting' : 'meetings'} scheduled
            </div>

            <div className="meetings-cards">
                {meetings.map(meeting => (
                    <div key={meeting.id} className="meeting-card">
                        <div className="meeting-card-header">
                            <h3>{meeting.room}</h3>
                            <span className="meeting-id">#{meeting.id}</span>
                        </div>

                        <div className="meeting-card-body">
                            <div className="meeting-detail">
                                <span className="detail-label">Date:</span>
                                <span className="detail-value">{formatDate(meeting.start_datetime)}</span>
                            </div>

                            <div className="meeting-detail">
                                <span className="detail-label">Time:</span>
                                <span className="detail-value">
                                    {formatTime(meeting.start_datetime)} - {formatTime(meeting.end_datetime)}
                                </span>
                            </div>

                            <div className="meeting-detail">
                                <span className="detail-label">Duration:</span>
                                <span className="detail-value duration-badge">
                                    {calculateDuration(meeting.start_datetime, meeting.end_datetime)}
                                </span>
                            </div>

                            <div className="meeting-detail">
                                <span className="detail-label">Description:</span>
                                <p className="meeting-description">{meeting.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MeetingsList;
