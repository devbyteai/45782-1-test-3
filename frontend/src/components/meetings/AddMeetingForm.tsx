import { useState } from 'react';
import { DevelopmentTeam } from '../../models/DevelopmentTeam';
import { CreateMeetingDTO } from '../../models/Meeting';

interface AddMeetingFormProps {
    teams: DevelopmentTeam[];
    defaultTeamId: number | null;
    onSubmit: (meeting: CreateMeetingDTO) => Promise<void>;
    onCancel: () => void;
}

function AddMeetingForm({ teams, defaultTeamId, onSubmit, onCancel }: AddMeetingFormProps) {
    const [formData, setFormData] = useState<CreateMeetingDTO>({
        development_team_id: defaultTeamId || 0,
        start_datetime: '',
        end_datetime: '',
        description: '',
        room: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'development_team_id' ? parseInt(value) : value
        }));

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.development_team_id) {
            newErrors.development_team_id = 'Please select a development team';
        }

        if (!formData.start_datetime) {
            newErrors.start_datetime = 'Start date and time is required';
        }

        if (!formData.end_datetime) {
            newErrors.end_datetime = 'End date and time is required';
        }

        if (formData.start_datetime && formData.end_datetime) {
            const start = new Date(formData.start_datetime);
            const end = new Date(formData.end_datetime);
            if (end <= start) {
                newErrors.end_datetime = 'End time must be after start time';
            }
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.length < 3) {
            newErrors.description = 'Description must be at least 3 characters';
        }

        if (!formData.room.trim()) {
            newErrors.room = 'Room is required';
        } else if (formData.room.length < 2) {
            newErrors.room = 'Room must be at least 2 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);
        try {
            await onSubmit(formData);
            // Reset form
            setFormData({
                development_team_id: defaultTeamId || 0,
                start_datetime: '',
                end_datetime: '',
                description: '',
                room: ''
            });
        } catch (err) {
            console.error('Failed to submit form:', err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="add-meeting-form">
            <h2>Add New Meeting</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="development_team_id">
                        Development Team <span className="required">*</span>
                    </label>
                    <select
                        id="development_team_id"
                        name="development_team_id"
                        value={formData.development_team_id}
                        onChange={handleChange}
                        className={errors.development_team_id ? 'error' : ''}
                        required
                    >
                        <option value="">-- Select a Team --</option>
                        {teams.map(team => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                    {errors.development_team_id && (
                        <span className="error-text">{errors.development_team_id}</span>
                    )}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="start_datetime">
                            Start Date & Time <span className="required">*</span>
                        </label>
                        <input
                            type="datetime-local"
                            id="start_datetime"
                            name="start_datetime"
                            value={formData.start_datetime}
                            onChange={handleChange}
                            className={errors.start_datetime ? 'error' : ''}
                            required
                        />
                        {errors.start_datetime && (
                            <span className="error-text">{errors.start_datetime}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="end_datetime">
                            End Date & Time <span className="required">*</span>
                        </label>
                        <input
                            type="datetime-local"
                            id="end_datetime"
                            name="end_datetime"
                            value={formData.end_datetime}
                            onChange={handleChange}
                            className={errors.end_datetime ? 'error' : ''}
                            required
                        />
                        {errors.end_datetime && (
                            <span className="error-text">{errors.end_datetime}</span>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="room">
                        Meeting Room <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="room"
                        name="room"
                        value={formData.room}
                        onChange={handleChange}
                        placeholder="e.g., Large Board Room, Blue Room"
                        className={errors.room ? 'error' : ''}
                        required
                    />
                    {errors.room && (
                        <span className="error-text">{errors.room}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="description">
                        Description <span className="required">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the purpose of this meeting..."
                        rows={4}
                        className={errors.description ? 'error' : ''}
                        required
                    />
                    {errors.description && (
                        <span className="error-text">{errors.description}</span>
                    )}
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                    >
                        {submitting ? 'Creating...' : 'Create Meeting'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddMeetingForm;
