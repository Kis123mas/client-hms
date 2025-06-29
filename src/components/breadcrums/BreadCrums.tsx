import React from 'react';
import { Link } from 'react-router-dom';
import './BreadCrums.css';

interface Crumb {
  label: string;
  path?: string;
}

interface BreadCrumbsProps {
  items: Crumb[];
}

function BreadCrumbs({ items }: BreadCrumbsProps) {
  return (
    <div className="breadcrumbs-container">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="separator">/</span>}
          {item.path ? (
            <Link to={item.path} className="crumb-link">
              {index === items.length - 1 ? (
                <span className="current-crumb">{item.label}</span>
              ) : (
                item.label
              )}
            </Link>
          ) : (
            <span className="current-crumb">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default BreadCrumbs;