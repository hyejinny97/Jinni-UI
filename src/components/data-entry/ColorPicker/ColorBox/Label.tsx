import { Text } from '@/components/general/Text';

const Label = ({
  children,
  value
}: {
  children: React.ReactNode;
  value: string;
}) => {
  return (
    <div
      className="JinniLabel"
      style={{ display: 'flex', flexDirection: 'column', width: 'max-content' }}
    >
      <Text
        style={{
          fontSize: '10px',
          textAlign: 'center',
          fontWeight: '500',
          color: 'gray-600',
          margin: 0
        }}
      >
        {value}
      </Text>
      {children}
    </div>
  );
};

export default Label;
