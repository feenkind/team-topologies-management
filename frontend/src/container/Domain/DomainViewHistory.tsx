import * as React from 'react';
import { IDomain } from '../../store/slices/domainSlice';

interface IDomainViewHistoryProps {
  domain: IDomain;
}

const DomainViewHistory: React.FC<IDomainViewHistoryProps> = ({
  domain,
}: IDomainViewHistoryProps) => {
  return <>{domain.name}</>;
};

export default DomainViewHistory;
