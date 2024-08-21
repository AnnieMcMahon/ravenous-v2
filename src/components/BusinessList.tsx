import React from 'react';
import Business from './Business';
import { appBusinessInfo } from '../utilities/interfaces';

interface BusinessListProps {
  businesses: appBusinessInfo[];
}

const BusinessList: React.FC<BusinessListProps> = ({ businesses }) => {
  if (!businesses || businesses.length === 0) {
    return (
      <div id="business-list">
        <p>No results found. Please enter valid search words.</p>
      </div>
    );
  }

  return (
    <div id="business-list">
      {businesses.map((business) => (
        <Business info={business} key={business.id} />
      ))}
    </div>
  );
};

export default BusinessList;