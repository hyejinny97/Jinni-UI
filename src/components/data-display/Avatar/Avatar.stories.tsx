import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@/components/data-display/Avatar';
import dogImage1 from '@/assets/images/dog-1.jpg';
import dogImage2 from '@/assets/images/dog-2.jpg';
import { PersonIcon } from '@/components/icons/PersonIcon';
import { Badge } from '@/components/data-display/Badge';
import { FileInput } from '@/components/data-entry/FileInput';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  argTypes: {
    alt: {
      description: 'image를 설명하기 위한 대체 텍스트',
      type: 'string'
    },
    children: {
      description: '주로 텍스트나 icon이 들어가며, src prop이 없는 경우 적용됨',
      table: { type: { summary: 'React.ReactNode' } }
    },
    imgProps: {
      description: '(src, alt 속성은 제외한) HTML img element의 props',
      table: {
        type: {
          summary: 'crossOrigin | width | height | loading | sizes | ...'
        }
      }
    },
    shape: {
      description: '아바타의 모양',
      table: {
        type: { summary: `'circle' | 'square' | 'rounded'` },
        defaultValue: { summary: `'circle'` }
      }
    },
    size: {
      description: 'image의 사이즈',
      table: { type: { summary: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | number` } },
      defaultValue: { summary: `'md'` },
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    src: {
      description: 'image 주소',
      type: 'string'
    }
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Story />
        </div>
      );
    }
  ]
};

export default meta;
type Story = StoryObj<typeof Avatar>;

const AvatarUploadTemplate = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const { result } = reader;
        if (typeof result === 'string') {
          resolve(result);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    newFile: File | null
  ) => {
    setFile(newFile);
    const { files } = e.target;
    if (files) {
      fileToDataUrl(files[0]).then((url) => setDataUrl(url));
    }
  };

  return (
    <FileInput accept="image/*" value={file} onChange={handleChange}>
      {file && dataUrl ? (
        <Avatar key="image-avatar" src={dataUrl} alt={file.name} />
      ) : (
        <Avatar key="icon-avatar">
          <PersonIcon color="white" />
        </Avatar>
      )}
    </FileInput>
  );
};

export const ImageAvatars: Story = {
  render: (args) => {
    return (
      <>
        <Avatar src={dogImage1} alt="강아지 아바타" {...args} />
        <Avatar
          src={dogImage2}
          alt="강아지 아바타"
          imgProps={{
            width: 100,
            height: 100
          }}
          {...args}
        />
      </>
    );
  }
};

export const LetterAvatars: Story = {
  render: (args) => {
    return (
      <>
        <Avatar {...args}>J</Avatar>
        <Avatar
          style={{ backgroundColor: 'yellow-400', color: 'yellow-50' }}
          {...args}
        >
          J
        </Avatar>
        <Avatar
          role="img"
          aria-label="Jinni 아바타"
          style={{ fontSize: '16px' }}
          {...args}
        >
          JN
        </Avatar>
      </>
    );
  }
};

export const IconAvatars: Story = {
  render: (args) => {
    return (
      <>
        <Avatar {...args}>
          <PersonIcon color="white" />
        </Avatar>
        <Avatar
          role="img"
          aria-label="사람 아바타"
          style={{
            backgroundColor: 'yellow-400'
          }}
          {...args}
        >
          <PersonIcon color="yellow-50" />
        </Avatar>
      </>
    );
  }
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Avatar size="xs" {...args}>
            N
          </Avatar>
          <Avatar size="sm" {...args}>
            N
          </Avatar>
          <Avatar>N</Avatar>
          <Avatar size="lg" {...args}>
            N
          </Avatar>
          <Avatar size="xl" {...args}>
            N
          </Avatar>
          <Avatar
            size={200}
            style={{ fontSize: '100px', fontWeight: 900 }}
            {...args}
          >
            N
          </Avatar>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Avatar size="xs" {...args}>
            <PersonIcon color="white" />
          </Avatar>
          <Avatar size="sm" {...args}>
            <PersonIcon color="white" />
          </Avatar>
          <Avatar {...args}>
            <PersonIcon color="white" />
          </Avatar>
          <Avatar size="lg" {...args}>
            <PersonIcon color="white" />
          </Avatar>
          <Avatar size="xl" {...args}>
            <PersonIcon color="white" />
          </Avatar>
          <Avatar size={200} {...args}>
            <PersonIcon color="white" size={100} />
          </Avatar>
        </div>
      </div>
    );
  }
};

export const Shape: Story = {
  render: (args) => {
    return (
      <>
        <Avatar {...args}>N</Avatar>
        <Avatar shape="square" {...args}>
          N
        </Avatar>
        <Avatar shape="rounded" {...args}>
          N
        </Avatar>
      </>
    );
  }
};

export const Color: Story = {
  render: (args) => {
    return (
      <>
        <Avatar {...args}>N</Avatar>
        <Avatar
          style={{
            backgroundColor: 'secondary',
            color: 'on-secondary'
          }}
          {...args}
        >
          N
        </Avatar>
        <Avatar
          style={{
            backgroundColor: 'tertiary',
            color: 'on-tertiary'
          }}
          {...args}
        >
          N
        </Avatar>
        <Avatar
          style={{
            backgroundColor: 'green'
          }}
          {...args}
        >
          N
        </Avatar>
        <Avatar
          style={{
            backgroundColor: '#123'
          }}
          {...args}
        >
          N
        </Avatar>
        <Avatar
          style={{
            backgroundColor: 'rgb(100,100,100)'
          }}
          {...args}
        >
          N
        </Avatar>
        <Avatar
          style={{
            backgroundColor: 'rgba(100,100,100, 0.5)'
          }}
          {...args}
        >
          N
        </Avatar>
      </>
    );
  }
};

export const AvatarFallbacks: Story = {
  render: (args) => {
    return (
      <>
        <Avatar
          src="./broken-image.png"
          alt="broken-image"
          style={{ fontSize: '10px' }}
          {...args}
        >
          children
        </Avatar>
        <Avatar
          src="./broken-image.png"
          alt="broken-image"
          style={{ fontSize: '15px' }}
          {...args}
        />
        <Avatar src="./broken-image.png" {...args} />
      </>
    );
  }
};

export const AvatarWithBadge: Story = {
  render: (args) => {
    return (
      <Badge badgeContent={5}>
        <Avatar src={dogImage1} alt="강아지 아바타" shape="rounded" {...args} />
      </Badge>
    );
  }
};

export const AvatarUpload: Story = {
  render: (args) => <AvatarUploadTemplate {...args} />,
  parameters: {
    docs: {
      source: {
        code: `const AvatarUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const { result } = reader;
        if (typeof result === 'string') {
          resolve(result);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    newFile: File | null
  ) => {
    setFile(newFile);
    const { files } = e.target;
    if (files) {
      fileToDataUrl(files[0]).then((url) => setDataUrl(url));
    }
  };

  return (
    <FileInput accept="image/*" value={file} onChange={handleChange}>
      {file && dataUrl ? (
        <Avatar key="image-avatar" src={dataUrl} alt={file.name} />
      ) : (
        <Avatar key="icon-avatar">
          <PersonIcon color="white" />
        </Avatar>
      )}
    </FileInput>
  );
};`.trim()
      }
    }
  }
};
