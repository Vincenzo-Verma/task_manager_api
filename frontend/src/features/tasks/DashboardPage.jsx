import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { apiClient } from '../../lib/apiClient';
import { getApiErrorMessage } from '../../shared/utils/apiError';
import AlertMessage from '../../shared/components/AlertMessage';
import TaskForm from './TaskForm';
import TaskTable from './TaskTable';

function DashboardPage() {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [alert, setAlert] = useState({ type: 'info', message: '' });

  const greetingName = useMemo(() => user?.first_name || user?.username || 'User', [user]);

  const loadData = async () => {
    setLoading(true);
    setAlert({ type: 'info', message: '' });

    try {
      const [usersResponse, tasksResponse] = await Promise.all([
        apiClient.get('/api/users/list/'),
        apiClient.get('/api/tasks/'),
      ]);

      const userList = usersResponse.data?.results || usersResponse.data || [];
      const taskList = tasksResponse.data?.results || tasksResponse.data || [];

      setUsers(Array.isArray(userList) ? userList : []);
      setTasks(Array.isArray(taskList) ? taskList : []);
    } catch (error) {
      setAlert({ type: 'error', message: getApiErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmitTask = async (payload, formHelpers) => {
    setSaving(true);
    try {
      if (editingTask) {
        await apiClient.put(`/api/tasks/${editingTask.id}/`, payload);
        setAlert({ type: 'success', message: 'Task updated successfully.' });
      } else {
        await apiClient.post('/api/tasks/', payload);
        setAlert({ type: 'success', message: 'Task created successfully.' });
      }

      setEditingTask(null);
      formHelpers.reset();
      await loadData();
    } catch (error) {
      formHelpers.setError(getApiErrorMessage(error));
      setAlert({ type: 'error', message: getApiErrorMessage(error) });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (taskId) => {
    setDeleting(true);
    setAlert({ type: 'info', message: '' });

    try {
      await apiClient.delete(`/api/tasks/${taskId}/`);
      setAlert({ type: 'success', message: 'Task deleted successfully.' });
      await loadData();
    } catch (error) {
      setAlert({ type: 'error', message: getApiErrorMessage(error) });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className="shell dashboard">
      <header className="dashboard-header card">
        <div>
          <h1>Welcome, {greetingName}</h1>
          <p className="subtitle">Protected dashboard powered by JWT authentication.</p>
        </div>
        <button type="button" className="secondary" onClick={logout}>
          Log out
        </button>
      </header>

      <AlertMessage type={alert.type} message={alert.message} />

      {loading ? <p>Loading dashboard data...</p> : null}

      {!loading ? (
        <>
          <TaskForm
            users={users}
            onSubmit={handleSubmitTask}
            initialTask={editingTask}
            isSubmitting={saving}
            onCancel={() => setEditingTask(null)}
          />

          <TaskTable
            tasks={tasks}
            onEdit={setEditingTask}
            onDelete={handleDelete}
            isDeleting={deleting}
          />
        </>
      ) : null}
    </main>
  );
}

export default DashboardPage;
