import { SuccessIcon } from '@/components/icons/SuccessIcon';
import { InfoIcon } from '@/components/icons/InfoIcon';
import { WarningIcon } from '@/components/icons/WarningIcon';
import { ErrorIcon } from '@/components/icons/ErrorIcon';
import { AlertProps } from './Alert';

export const getDefaultIconByStatus = ({
  status
}: Required<Pick<AlertProps, 'status'>>) => {
  switch (status) {
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
