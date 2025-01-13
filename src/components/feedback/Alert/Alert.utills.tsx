import { SuccessIcon } from '@/components/icons/SuccessIcon';
import { InfoIcon } from '@/components/icons/InfoIcon';
import { WarningIcon } from '@/components/icons/WarningIcon';
import { ErrorIcon } from '@/components/icons/ErrorIcon';
import { SeverityType } from './Alert';

export const getDefaultIconBySeverity = ({
  severity
}: {
  severity: SeverityType;
}) => {
  switch (severity) {
    case 'success':
      return <SuccessIcon />;
    case 'info':
      return <InfoIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'error':
      return <ErrorIcon />;
  }
};
