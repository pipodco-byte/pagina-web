import React, { useState, useRef, useCallback, useEffect } from 'react';

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function NewsletterForm() {
  const [status, setStatus] = useState('idle');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const timeoutRef = useRef(null);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(email)) {
      setError('Por favor ingresa un email válido');
      return;
    }
    setStatus('loading');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setStatus('success');
      setEmail('');
      const successTimeout = setTimeout(() => setStatus('idle'), 3000);
      return () => clearTimeout(successTimeout);
    }, 1500);
  }, [email]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (status === 'success') {
    return (
      <div className="alert alert-success p-4 rounded-4 shadow-sm text-white border-0" style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
        ✓ ¡Gracias! Revisa tu correo.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="newsletter-form p-2 rounded-4 shadow-lg">
      <div className="input-group">
        <input
          id="newsletter-email"
          type="email"
          className="form-control border-0 bg-transparent text-white shadow-none"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          required
          style={{ color: 'white' }}
        />
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="btn btn-primary px-4 fw-bold text-uppercase tracking-wide"
        >
          {status === 'loading' ? (
            <span><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...</span>
          ) : (
            'Suscribirse'
          )}
        </button>
      </div>
      {error && <div className="text-danger mt-2 small">{error}</div>}
    </form>
  );
}