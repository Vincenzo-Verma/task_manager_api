import { useEffect, useState } from 'react';
import { taskSchema } from '../../shared/validation/taskSchemas';
import { sanitizeObject } from '../../shared/utils/sanitize';

const emptyTask = {
  title: '',
  description: '',
  due_date: '',
  status: 'TODO',
  assigned_user_id: '',
};

function TaskForm({ users, onSubmit, initialTask, isSubmitting, onCancel }) {
  const [form, setForm] = useState(emptyTask);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialTask) {
      setForm({
        title: initialTask.title || '',
        description: initialTask.description || '',
        due_date: initialTask.due_date || '',
        status: initialTask.status || 'TODO',
        assigned_user_id: initialTask.assigned_user?.id || '',
      });
      return;
    }

    setForm(emptyTask);
  }, [initialTask]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const sanitized = sanitizeObject(form);
    const parsed = taskSchema.safeParse(sanitized);

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    await onSubmit(parsed.data, {
      reset: () => setForm(emptyTask),
      setError,
    });
  };

  return (
    <section className="card">
      <h2>{initialTask ? 'Edit Task' : 'Create Task'}</h2>
      {error ? <div className="alert alert-error">{error}</div> : null}

      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Title
          <input
            type="text"
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            required
          />
        </label>

        <label>
          Description
          <textarea
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            rows={4}
          />
        </label>

        <label>
          Due date
          <input
            type="date"
            value={form.due_date || ''}
            onChange={(event) => setForm((prev) => ({ ...prev, due_date: event.target.value }))}
          />
        </label>

        <label>
          Status
          <select
            value={form.status}
            onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
          >
            <option value="TODO">To do</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="DONE">Done</option>
          </select>
        </label>

        <label>
          Assign user
          <select
            value={form.assigned_user_id}
            onChange={(event) => setForm((prev) => ({ ...prev, assigned_user_id: event.target.value }))}
            required
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username} ({user.email || 'No email'})
              </option>
            ))}
          </select>
        </label>

        <div className="button-row">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : initialTask ? 'Update Task' : 'Create Task'}
          </button>
          {initialTask ? (
            <button type="button" className="secondary" onClick={onCancel}>
              Cancel Edit
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}

export default TaskForm;
