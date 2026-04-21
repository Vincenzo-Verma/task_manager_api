import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { loginSchema } from '../../shared/validation/authSchemas';
import { sanitizeObject } from '../../shared/utils/sanitize';
import AlertMessage from '../../shared/components/AlertMessage';

function LoginPage() {
  const navigate = useNavigate();
  const { login, getErrorMessage } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [alert, setAlert] = useState({ type: 'info', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setAlert({ type: 'info', message: '' });

    const sanitized = sanitizeObject(form);
    const validationResult = loginSchema.safeParse(sanitized);

    if (!validationResult.success) {
      setAlert({ type: 'error', message: validationResult.error.issues[0].message });
      return;
    }

    setIsSubmitting(true);
    try {
      await login(validationResult.data.username, validationResult.data.password);
      setAlert({ type: 'success', message: 'Login successful.' });
      navigate('/dashboard');
    } catch (error) {
      setAlert({ type: 'error', message: getErrorMessage(error) });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-card shell">
      <h1>Task Manager Login</h1>
      <p className="subtitle">Use your API credentials to access the dashboard.</p>
      <AlertMessage type={alert.type} message={alert.message} />

      <form onSubmit={onSubmit} className="form-grid">
        <label>
          Username
          <input
            type="text"
            value={form.username}
            onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
            autoComplete="username"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            autoComplete="current-password"
            required
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p>
        New here? <Link to="/register">Create an account</Link>
      </p>
    </section>
  );
}

export default LoginPage;
