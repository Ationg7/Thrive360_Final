// StatCard Component
// Following Clean Code Principle: Single Responsibility and Reusability

import React, { memo } from 'react';

/**
 * StatCard Component - Displays a single statistic with value and label
 * @param {Object} props - Component props
 * @param {number|string} props.value - The statistic value to display
 * @param {string} props.label - The label for the statistic
 * @param {'users'|'active-users'|'posts'|'challenges'} [props.type] - Type of stat for styling
 * @param {string} [props.className=''] - Additional CSS classes
 */
const StatCard = memo(({ value, label, type, className = '' }) => {
  const getCardClass = () => {
    const baseClass = 'stat-card';
    const typeClass = type ? `stat-card--${type}` : '';
    return `${baseClass} ${typeClass} ${className}`.trim();
  };

  return (
    <div className={getCardClass()}>
      <h3 className="stat-value">{value}</h3>
      <p className="stat-label">{label}</p>
    </div>
  );
});

StatCard.displayName = 'StatCard';

export default StatCard;
