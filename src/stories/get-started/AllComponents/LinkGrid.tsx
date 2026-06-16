import JinniProvider, { createDesignSystem } from '@/components/JinniProvider';
import Grid from '@/components/Grid';
import Link from '@/components/Link';
import ButtonBase from '@/components/ButtonBase';

const designSystem = createDesignSystem();

const LinkGrid = ({ data }: { data: string[] }) => {
  const url = new URL(window.location.origin);

  return (
    <JinniProvider designSystem={designSystem}>
      <Grid columns={3} spacing={20} style={{ minWidth: '300px' }}>
        {data.map((name) => {
          url.searchParams.set(
            'path',
            `/docs/components-${name.toLocaleLowerCase()}--docs`
          );
          return (
            <ButtonBase
              className="JinniLinkButton"
              as={Link}
              key={name}
              href={url.toString()}
              style={{
                padding: '6px 16px',
                textAlign: 'center',
                color: 'on-surface',
                backgroundColor: 'surface-container',
                borderRadius: 'xs'
              }}
            >
              {name}
            </ButtonBase>
          );
        })}
      </Grid>
    </JinniProvider>
  );
};

export default LinkGrid;
