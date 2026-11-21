import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  const icons = {
    success: <CheckCircle2 size={18} color="#22c55e" />,
    error: <AlertCircle size={18} color="#ef4444" />,
    info: <Info size={18} color="#FF941A" />
  };

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: 'calc(var(--mini-player-height) + 20px)',
        right: '24px',
        zIndex: 300,
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '380px'
      }}
    >
      {icons[type] || icons.info}
      <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 500, flex: 1 }}>
        {message}
      </span>
      {onClose && (
        <button onClick={onClose} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>
          <X size={16} />
        </button>
      )}
    </div>
  );
};

