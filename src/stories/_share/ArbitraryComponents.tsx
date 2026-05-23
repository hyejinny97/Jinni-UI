import { Grid } from '@/components/layout/Grid';
import { Stack } from '@/components/layout/Stack';
import { Button } from '@/components/general/Button';
import { Slider } from '@/components/data-entry/Slider';
import { Rating } from '@/components/data-entry/Rating';
import { NumberInput } from '@/components/data-entry/NumberInput';
import { Chip } from '@/components/data-display/Chip';
import { Alert } from '@/components/feedback/Alert';

const ArbitraryComponents = () => {
  return (
    <Grid
      rows={3}
      columns={3}
      spacing={20}
      style={{
        gridTemplateRows: 'repeat(3, auto)',
        alignItems: 'center',
        padding: '16px',
        width: '550px',
        backgroundColor: 'surface-container-lowest',
        borderRadius: '4px',
        boxSizing: 'border-box'
      }}
    >
      <Button>Button</Button>
      <Slider
        step={10}
        marks
        defaultValue={30}
        style={{ gridColumn: 'span 2' }}
      />
      <Alert status="error" style={{ gridColumn: 'span 2' }}>
        This is Alert
      </Alert>
      <Rating defaultValue={2} />
      <NumberInput
        defaultValue={10}
        min={0}
        max={20}
        style={{ minWidth: 'auto', width: 'auto' }}
      />
      <Stack
        direction="row"
        spacing={5}
        style={{ gridColumn: 'span 2', alignItems: 'center' }}
      >
        <Chip variant="filled">Filled</Chip>
        <Chip variant="subtle-filled">Subtle-Filled</Chip>
        <Chip variant="outlined">Outlined</Chip>
        <Chip variant="text">Text</Chip>
      </Stack>
    </Grid>
  );
};

export default ArbitraryComponents;
