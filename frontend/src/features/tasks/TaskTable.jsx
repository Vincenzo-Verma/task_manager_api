function formatStatus(status) {
  switch (status) {
    case 'IN_PROGRESS':
      return 'In progress';
    case 'DONE':
      return 'Done';
    default:
      return 'To do';
  }
}

function TaskTable({ tasks, onEdit, onDelete, isDeleting }) {
  if (!tasks.length) {
    return <p className="empty">No tasks yet. Create one from the form.</p>;
  }

  return (
    <section className="card">
      <h2>Tasks</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Assigned User</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{formatStatus(task.status)}</td>
                <td>{task.due_date || 'N/A'}</td>
                <td>{task.assigned_user?.username || 'Unassigned'}</td>
                <td>
                  <div className="button-row compact">
                    <button type="button" className="secondary" onClick={() => onEdit(task)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="danger"
                      onClick={() => onDelete(task.id)}
                      disabled={isDeleting}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TaskTable;
