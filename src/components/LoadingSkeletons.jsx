import React from 'react';
import './LoadingSkeletons.css';

export const TourCardSkeleton = () => (
  <div className="skeleton-card">
    <div className="skeleton-image loading-skeleton"></div>
    <div className="skeleton-content">
      <div className="skeleton-title loading-skeleton"></div>
      <div className="skeleton-text loading-skeleton"></div>
      <div className="skeleton-text short loading-skeleton"></div>
      <div className="skeleton-price loading-skeleton"></div>
    </div>
  </div>
);

export const ToursGridSkeleton = ({ count = 6 }) => (
  <div className="tours-grid">
    {Array.from({ length: count }).map((_, index) => (
      <TourCardSkeleton key={index} />
    ))}
  </div>
);

export default TourCardSkeleton;
