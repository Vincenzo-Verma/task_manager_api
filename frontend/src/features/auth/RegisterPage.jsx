import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { registerSchema } from '../../shared/validation/authSchemas';
import { sanitizeObject } from '../../shared/utils/sanitize';
import AlertMessage from '../../shared/components/AlertMessage';

const initialForm = {
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  password2: '',
};

function RegisterPage() {
  const navigate = useNavigate();
  const { register, getErrorMessage } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [alert, setAlert] = useState({ type: 'info', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setAlert({ type: 'info', message: '' });

    const sanitized = sanitizeObject(form);
    const validationResult = registerSchema.safeParse(sanitized);

    if (!validationResult.success) {
      setAlert({ type: 'error', message: validationResult.error.issues[0].message });
      return;
    }

    setIsSubmitting(true);
    try {
      await register(validationResult.data);
      setAlert({ type: 'success', message: 'Registration successful. Please log in.' });
      navigate('/login');
    } catch (error) {
      setAlert({ type: 'error', message: getErrorMessage(error) });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-card shell">
      <h1>Create Account</h1>
      <p className="subtitle">Register a user, then log in to manage tasks.</p>
      <AlertMessage type={alert.type} message={alert.message} />

      <form onSubmit={onSubmit} className="form-grid">
        <label>
          Username
          <input
            type="text"
            value={form.username}
            onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
        </label>

        <label>
          First name
          <input
            type="text"
            value={form.first_name}
            onChange={(event) => setForm((prev) => ({ ...prev, first_name: event.target.value }))}
          />
        </label>

        <label>
          Last name
          <input
            type="text"
            value={form.last_name}
            onChange={(event) => setForm((prev) => ({ ...prev, last_name: event.target.value }))}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            required
          />
        </label>

        <label>
          Confirm password
          <input
            type="password"
            value={form.password2}
            onChange={(event) => setForm((prev) => ({ ...prev, password2: event.target.value }))}
            required
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p>
        Already registered? <Link to="/login">Sign in</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
