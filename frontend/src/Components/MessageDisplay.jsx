// MessageDisplay Component
// Following Clean Code Principle: Single Responsibility and Reusability

import React, { memo } from 'react';

/**
 * MessageDisplay Component - Shows error and success messages with dismiss functionality
 * @param {Object} props - Component props
 * @param {string} [props.error] - Error message to display
 * @param {string} [props.success] - Success message to display
 * @param {Function} [props.onDismiss] - Function to call when dismissing messages
 */
const MessageDisplay = memo(({ error, success, onDismiss }) => {
  if (!error && !success) return null;

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
      {error && (
        <div className="error-message" role="alert">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{error}</span>
            <button
              onClick={handleDismiss}
              style={{
                background: 'none',
                border: 'none',
                color: '#721c24',
                cursor: 'pointer',
                fontSize: '18px',
                padding: '0',
                marginLeft: '10px'
              }}
              aria-label="Dismiss error message"
            >
              ×
            </button>
          </div>
        </div>
      )}
      {success && (
        <div className="success-message" role="status">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{success}</span>
            <button
              onClick={handleDismiss}
              style={{
                background: 'none',
                border: 'none',
                color: '#155724',
                cursor: 'pointer',
                fontSize: '18px',
                padding: '0',
                marginLeft: '10px'
              }}
              aria-label="Dismiss success message"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

MessageDisplay.displayName = 'MessageDisplay';

export default MessageDisplay;
