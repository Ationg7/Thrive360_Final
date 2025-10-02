// NavigationButton Component
// Following Clean Code Principle: Single Responsibility and Reusability

import React, { memo } from 'react';

/**
 * NavigationButton Component - Renders a navigation button for admin features
 * @param {Object} props - Component props
 * @param {string} props.id - Unique identifier for the button
 * @param {string} props.label - Display text for the button
 * @param {string} props.color - Color theme for the button
 * @param {string} props.route - Route to navigate to when clicked
 * @param {Function} props.onClick - Click handler function
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 */
const NavigationButton = memo(({ 
  id, 
  label, 
  color, 
  route, 
  onClick, 
  className = '',
  disabled = false 
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(route);
    }
  };

  const getButtonClass = () => {
    const baseClass = 'nav-button';
    const idClass = `nav-button--${id}`;
    const disabledClass = disabled ? 'nav-button--disabled' : '';
    return `${baseClass} ${idClass} ${disabledClass} ${className}`.trim();
  };

  return (
    <button
      className={getButtonClass()}
      onClick={handleClick}
      disabled={disabled}
      aria-label={`Navigate to ${label}`}
    >
      {label}
    </button>
  );
});

NavigationButton.displayName = 'NavigationButton';

export default NavigationButton;
