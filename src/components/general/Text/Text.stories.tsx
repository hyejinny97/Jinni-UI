import { useEffect, useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';
import { Stack } from '@/components/layout/Stack';
import { Popper } from '@/components/_share/Popper';
import { ButtonGroup } from '@/components/general/ButtonGroup';
import { Button } from '@/components/general/Button';
import { SwitchLabel } from '@/components/data-entry/SwitchLabel';
import { Switch } from '@/components/data-entry/Switch';

const meta: Meta<typeof Text> = {
  component: Text,
  argTypes: {
    as: {
      defaultValue: { summary: 'p' }
    },
    children: {
      description: '텍스트'
    },
    lineClamp: {
      description: '보여지는 라인 수'
    },
    noMargin: {
      description: 'true이면, margin이 제거됨'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Text>;

const HTMLSemanticElementWithMarginSwitch = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <Stack spacing={20}>
      <SwitchLabel label="No Margin" style={{ gap: '5px' }}>
        <Switch checked={checked} onChange={handleChange} />
      </SwitchLabel>
      <Stack>
        <Text as="h1" noMargin={checked}>
          h1
        </Text>
        <Text as="h2" noMargin={checked}>
          h2
        </Text>
        <Text as="h3" noMargin={checked}>
          h3
        </Text>
        <Text as="h4" noMargin={checked}>
          h4
        </Text>
        <Text as="h5" noMargin={checked}>
          h5
        </Text>
        <Text as="h6" noMargin={checked}>
          h6
        </Text>
        <Text as="p" noMargin={checked}>
          p
        </Text>
        <Text as="b" noMargin={checked}>
          bold
        </Text>
        <Text as="i" noMargin={checked}>
          italic
        </Text>
        <Text as="u" noMargin={checked}>
          underline
        </Text>
        <Text as="abbr" noMargin={checked}>
          I18N
        </Text>
        <Text as="cite" noMargin={checked}>
          citation
        </Text>
        <Text as="del" noMargin={checked}>
          deleted
        </Text>
        <Text as="em" noMargin={checked}>
          emphasis
        </Text>
        <Text as="ins" noMargin={checked}>
          inserted
        </Text>
        <Text as="kbd" noMargin={checked}>
          ctrl + c
        </Text>
        <Text as="mark" noMargin={checked}>
          highlighted
        </Text>
        <Text as="s" noMargin={checked}>
          strikethrough
        </Text>
        <Text as="samp" noMargin={checked}>
          sample
        </Text>
        <Text as="sub" noMargin={checked}>
          sub
        </Text>
        <Text as="sup" noMargin={checked}>
          sup
        </Text>
      </Stack>
    </Stack>
  );
};

const TypographyWithMarginSwitch = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <Stack spacing={20}>
      <SwitchLabel label="No Margin" style={{ gap: '5px' }}>
        <Switch checked={checked} onChange={handleChange} />
      </SwitchLabel>
      <Stack>
        <Text className="typo-display-large" noMargin={checked}>
          display-large
        </Text>
        <Text className="typo-display-medium" noMargin={checked}>
          display-medium
        </Text>
        <Text className="typo-display-small" noMargin={checked}>
          display-small
        </Text>
        <Text className="typo-headline-large" noMargin={checked}>
          headline-large
        </Text>
        <Text className="typo-headline-medium" noMargin={checked}>
          headline-medium
        </Text>
        <Text className="typo-headline-small" noMargin={checked}>
          headline-small
        </Text>
        <Text className="typo-title-large" noMargin={checked}>
          title-large
        </Text>
        <Text className="typo-title-medium" noMargin={checked}>
          title-medium
        </Text>
        <Text className="typo-title-small" noMargin={checked}>
          title-small
        </Text>
        <Text className="typo-body-large" noMargin={checked}>
          body-large
        </Text>
        <Text className="typo-body-medium" noMargin={checked}>
          body-medium
        </Text>
        <Text className="typo-body-small" noMargin={checked}>
          body-small
        </Text>
        <Text className="typo-label-large" noMargin={checked}>
          label-large
        </Text>
        <Text className="typo-label-medium" noMargin={checked}>
          label-medium
        </Text>
        <Text className="typo-label-small" noMargin={checked}>
          label-small
        </Text>
      </Stack>
    </Stack>
  );
};

const ProcessableText = () => {
  const [open, setOpen] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState({ top: 0, left: 0 });
  const popperElRef = useRef<HTMLElement>(null);
  const selectionRef = useRef<Selection | null>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const highlightedText = selection.toString().trim();
      if (!highlightedText) return;

      const range = selection.getRangeAt(0);
      const rangeStart = range.startContainer.parentElement;
      const rangeEnd = range.endContainer.parentElement;
      const isMarked = rangeStart?.closest('mark') || rangeEnd?.closest('mark');
      const isUnderlined = rangeStart?.closest('u') || rangeEnd?.closest('u');
      const isDeleted = rangeStart?.closest('del') || rangeEnd?.closest('del');
      if (isMarked || isUnderlined || isDeleted) return;

      const { left, right, bottom } = range.getBoundingClientRect();
      selectionRef.current = selection;
      setAnchorPosition({ top: bottom, left: (left + right) / 2 });
      setOpen(true);
    };
    const handleMouseDown = (e: MouseEvent) => {
      const popperEl = popperElRef.current;
      const target = e.target as Node;
      if (popperEl?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const processText =
    (processType: 'highlight' | 'underline' | 'delete') => () => {
      const selection = selectionRef.current;
      if (!selection) return;

      const range = selection.getRangeAt(0);
      switch (processType) {
        case 'highlight': {
          const mark = document.createElement('mark');
          range.surroundContents(mark);
          break;
        }
        case 'underline': {
          const underline = document.createElement('u');
          range.surroundContents(underline);
          break;
        }
        case 'delete': {
          const del = document.createElement('del');
          range.surroundContents(del);
        }
      }
      selection.removeAllRanges();
      setOpen(false);
    };

  return (
    <>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo
        repellendus totam sequi nam possimus qui consectetur dignissimos?
        Molestiae amet iste nesciunt inventore eveniet deleniti ea. Voluptatum
        itaque distinctio quidem illo reprehenderit nulla pariatur vitae
        excepturi corporis ipsa at sapiente explicabo, assumenda alias! Ad ipsa
        quia magnam voluptatem architecto, reiciendis consequuntur
        exercitationem quam debitis earum eum sapiente, repudiandae animi
        assumenda quasi, voluptates numquam praesentium vitae doloribus. Cumque
        nobis maiores provident dolores delectus pariatur repellendus, assumenda
        vero odit, fuga, quidem earum distinctio officiis hic quaerat quasi sit
        debitis? Architecto fugiat delectus, expedita eveniet hic, sunt saepe
        repellat in tempora, odit nam quas.
      </Text>
      {open && (
        <Popper
          ref={popperElRef}
          className="elevation-5"
          anchorReference="anchorPosition"
          anchorPosition={anchorPosition}
          popperOrigin={{ horizontal: 'center', vertical: 'top' }}
          style={{ marginTop: '5px' }}
        >
          <ButtonGroup variant="subtle-filled" color="gray-700">
            <Button onClick={processText('highlight')}>highlight</Button>
            <Button onClick={processText('underline')}>underline</Button>
            <Button onClick={processText('delete')}>delete</Button>
          </ButtonGroup>
        </Popper>
      )}
    </>
  );
};

export const BasicText: Story = {
  render: (args) => {
    return <Text {...args}>Hello, world!</Text>;
  }
};

export const HTMLSemanticElement: Story = {
  render: () => <HTMLSemanticElementWithMarginSwitch />,
  parameters: {
    docs: {
      source: {
        code: `const HTMLSemanticElementWithMarginSwitch = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <Stack spacing={20}>
      <SwitchLabel label="No Margin" style={{ gap: '5px' }}>
        <Switch checked={checked} onChange={handleChange} />
      </SwitchLabel>
      <Stack>
        <Text as="h1" noMargin={checked}>
          h1
        </Text>
        <Text as="h2" noMargin={checked}>
          h2
        </Text>
        <Text as="h3" noMargin={checked}>
          h3
        </Text>
        <Text as="h4" noMargin={checked}>
          h4
        </Text>
        <Text as="h5" noMargin={checked}>
          h5
        </Text>
        <Text as="h6" noMargin={checked}>
          h6
        </Text>
        <Text as="p" noMargin={checked}>
          p
        </Text>
        <Text as="b" noMargin={checked}>
          bold
        </Text>
        <Text as="i" noMargin={checked}>
          italic
        </Text>
        <Text as="u" noMargin={checked}>
          underline
        </Text>
        <Text as="abbr" noMargin={checked}>
          I18N
        </Text>
        <Text as="cite" noMargin={checked}>
          citation
        </Text>
        <Text as="del" noMargin={checked}>
          deleted
        </Text>
        <Text as="em" noMargin={checked}>
          emphasis
        </Text>
        <Text as="ins" noMargin={checked}>
          inserted
        </Text>
        <Text as="kbd" noMargin={checked}>
          ctrl + c
        </Text>
        <Text as="mark" noMargin={checked}>
          highlighted
        </Text>
        <Text as="s" noMargin={checked}>
          strikethrough
        </Text>
        <Text as="samp" noMargin={checked}>
          sample
        </Text>
        <Text as="sub" noMargin={checked}>
          sub
        </Text>
        <Text as="sup" noMargin={checked}>
          sup
        </Text>
      </Stack>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Typography: Story = {
  render: () => <TypographyWithMarginSwitch />,
  parameters: {
    docs: {
      source: {
        code: `const TypographyWithMarginSwitch = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <Stack spacing={20}>
      <SwitchLabel label="No Margin" style={{ gap: '5px' }}>
        <Switch checked={checked} onChange={handleChange} />
      </SwitchLabel>
      <Stack>
        <Text className="typo-display-large" noMargin={checked}>
          display-large
        </Text>
        <Text className="typo-display-medium" noMargin={checked}>
          display-medium
        </Text>
        <Text className="typo-display-small" noMargin={checked}>
          display-small
        </Text>
        <Text className="typo-headline-large" noMargin={checked}>
          headline-large
        </Text>
        <Text className="typo-headline-medium" noMargin={checked}>
          headline-medium
        </Text>
        <Text className="typo-headline-small" noMargin={checked}>
          headline-small
        </Text>
        <Text className="typo-title-large" noMargin={checked}>
          title-large
        </Text>
        <Text className="typo-title-medium" noMargin={checked}>
          title-medium
        </Text>
        <Text className="typo-title-small" noMargin={checked}>
          title-small
        </Text>
        <Text className="typo-body-large" noMargin={checked}>
          body-large
        </Text>
        <Text className="typo-body-medium" noMargin={checked}>
          body-medium
        </Text>
        <Text className="typo-body-small" noMargin={checked}>
          body-small
        </Text>
        <Text className="typo-label-large" noMargin={checked}>
          label-large
        </Text>
        <Text className="typo-label-medium" noMargin={checked}>
          label-medium
        </Text>
        <Text className="typo-label-small" noMargin={checked}>
          label-small
        </Text>
      </Stack>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Color: Story = {
  render: (args) => {
    return (
      <Text {...args}>
        텍스트 중{' '}
        <Text
          as="mark"
          style={{
            backgroundColor: 'primary',
            color: 'white',
            padding: '2px 5px',
            borderRadius: '3px'
          }}
        >
          하이라이트
        </Text>
        되는 부분입니다.
      </Text>
    );
  }
};

export const LineClamp: Story = {
  render: (args) => {
    return (
      <Text lineClamp={3} {...args}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum,
        excepturi totam minus nulla ut et quia consectetur dolorem culpa ullam
        ab voluptate quae aliquam, accusantium nesciunt magnam officia, magni
        libero quasi! Et veniam enim sit assumenda modi dolores sint, omnis
        eveniet. Consequatur maiores architecto blanditiis, explicabo maxime
        facere dolorem dicta reiciendis quisquam sed autem, tenetur a minus.
        Quam, repellat iure veritatis aperiam delectus necessitatibus labore
        temporibus accusantium at amet neque numquam nam perferendis est ullam
        quidem facilis consectetur dicta omnis? Facere architecto inventore,
        doloribus nisi harum rerum, sequi dolore nam voluptatum quis unde?
        Quibusdam at cupiditate officia magni veniam sapiente?
      </Text>
    );
  }
};

export const SimpleCustomization: Story = {
  render: (args) => {
    return (
      <Text
        {...args}
        style={{
          textAlign: 'center',
          textTransform: 'uppercase',
          textDecorationLine: 'underline'
        }}
      >
        text
      </Text>
    );
  }
};

export const ComplexCustomization: Story = {
  render: () => <ProcessableText />,
  parameters: {
    docs: {
      source: {
        code: `const ProcessableText = () => {
  const [open, setOpen] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState({ top: 0, left: 0 });
  const popperElRef = useRef<HTMLElement>(null);
  const selectionRef = useRef<Selection | null>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const highlightedText = selection.toString().trim();
      if (!highlightedText) return;

      const range = selection.getRangeAt(0);
      const rangeStart = range.startContainer.parentElement;
      const rangeEnd = range.endContainer.parentElement;
      const isMarked = rangeStart?.closest('mark') || rangeEnd?.closest('mark');
      const isUnderlined = rangeStart?.closest('u') || rangeEnd?.closest('u');
      const isDeleted = rangeStart?.closest('del') || rangeEnd?.closest('del');
      if (isMarked || isUnderlined || isDeleted) return;

      const { left, right, bottom } = range.getBoundingClientRect();
      selectionRef.current = selection;
      setAnchorPosition({ top: bottom, left: (left + right) / 2 });
      setOpen(true);
    };
    const handleMouseDown = (e: MouseEvent) => {
      const popperEl = popperElRef.current;
      const target = e.target as Node;
      if (popperEl?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const processText =
    (processType: 'highlight' | 'underline' | 'delete') => () => {
      const selection = selectionRef.current;
      if (!selection) return;

      const range = selection.getRangeAt(0);
      switch (processType) {
        case 'highlight': {
          const mark = document.createElement('mark');
          range.surroundContents(mark);
          break;
        }
        case 'underline': {
          const underline = document.createElement('u');
          range.surroundContents(underline);
          break;
        }
        case 'delete': {
          const del = document.createElement('del');
          range.surroundContents(del);
        }
      }
      selection.removeAllRanges();
      setOpen(false);
    };

  return (
    <>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo
        repellendus totam sequi nam possimus qui consectetur dignissimos?
        Molestiae amet iste nesciunt inventore eveniet deleniti ea. Voluptatum
        itaque distinctio quidem illo reprehenderit nulla pariatur vitae
        excepturi corporis ipsa at sapiente explicabo, assumenda alias! Ad ipsa
        quia magnam voluptatem architecto, reiciendis consequuntur
        exercitationem quam debitis earum eum sapiente, repudiandae animi
        assumenda quasi, voluptates numquam praesentium vitae doloribus. Cumque
        nobis maiores provident dolores delectus pariatur repellendus, assumenda
        vero odit, fuga, quidem earum distinctio officiis hic quaerat quasi sit
        debitis? Architecto fugiat delectus, expedita eveniet hic, sunt saepe
        repellat in tempora, odit nam quas.
      </Text>
      {open && (
        <Popper
          ref={popperElRef}
          className="elevation-5"
          anchorReference="anchorPosition"
          anchorPosition={anchorPosition}
          popperOrigin={{ horizontal: 'center', vertical: 'top' }}
          style={{ marginTop: '5px' }}
        >
          <ButtonGroup variant="subtle-filled" color="gray-700">
            <Button onClick={processText('highlight')}>highlight</Button>
            <Button onClick={processText('underline')}>underline</Button>
            <Button onClick={processText('delete')}>delete</Button>
          </ButtonGroup>
        </Popper>
      )}
    </>
  );
};`.trim()
      }
    }
  }
};
