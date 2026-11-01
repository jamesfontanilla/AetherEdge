import React, { useState } from 'react';

export interface AetherAuthProps {
  onSuccess?: (user: { id: string; email: string }) => void;
  title?: string;
  providers?: ('postveil' | 'google' | 'github')[];
}

export const AetherAuth: React.FC<AetherAuthProps> = ({
  onSuccess,
  title = "Sign in to your Sovereign Account",
  providers = ['postveil', 'github', 'google']
}) => {
  const [loading, setLoading] = useState(false);

  const handlePostveilLogin = async () => {
    setLoading(true);
    try {
      // Sovereign Passkey WebAuthn flow
      window.location.href = `https://auth.postveil.me/login?redirect_uri=${encodeURIComponent(window.location.origin + '/api/auth/callback')}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#12141D',
      border: '1px solid #262B3F',
      borderRadius: '12px',
      padding: '24px',
      maxWidth: '380px',
      color: '#FFFFFF',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>{title}</h3>
      
      {providers.includes('postveil') && (
        <button
          onClick={handlePostveilLogin}
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: '#10B981',
            color: '#090A0F',
            fontWeight: 600,
            padding: '10px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '12px'
          }}
        >
          {loading ? 'Authenticating...' : '⚡ Sign in with Postveil (Passkey)'}
        </button>
      )}

      {providers.includes('github') && (
        <button
          onClick={() => window.location.href = '/api/auth/github'}
          style={{
            width: '100%',
            backgroundColor: '#1A1D2B',
            color: '#FFFFFF',
            border: '1px solid #262B3F',
            padding: '10px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '8px'
          }}
        >
          Continue with GitHub
        </button>
      )}
    </div>
  );
};
