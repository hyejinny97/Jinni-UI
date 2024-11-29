import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Chip } from '@/components/data-display/Chip';
import { Avatar } from '@/components/data-display/Avatar';
import { PersonIcon } from '@/components/icons/PersonIcon';
import { TrashcanIcon } from '@/components/icons/TrashcanIcon';
import dogImage from '@/assets/images/dog-1.jpg';

const meta: Meta<typeof Chip> = {
  component: Chip,
  argTypes: {
    clickable: {
      description:
        'true이면 hover & ripple 애니메이션이 추가됨 (단, onDelete prop을 추가한 경우 hover 애니메이션만 추가됨)',
      defaultValue: { summary: 'false' }
    },
    color: {
      description: 'chip 색상',
      defaultValue: { summary: 'primary' }
    },
    deleteIcon: {
      description: '삭제 아이콘',
      defaultValue: { summary: '<DefaultDeleteIcon />' }
    },
    label: {
      description: 'chip 내부 내용 (text 등)'
    },
    leftAvatar: {
      description: 'chip label의 왼쪽에 위치한 아바타'
    },
    leftIcon: {
      description: 'chip label의 왼쪽에 위치한 아이콘'
    },
    onClick: {
      description: '클릭 이벤트가 일어났을 때 호출되는 함수'
    },
    onDelete: {
      description: '삭제 이벤트가 일어났을 때 호출되는 함수'
    },
    rightAvatar: {
      description: 'chip label의 오른쪽에 위치한 아바타'
    },
    rightIcon: {
      description: 'chip label의 오른쪽에 위치한 아이콘'
    },
    shape: {
      description: 'chip 모양',
      table: {
        type: { summary: 'pill | rounded' },
        defaultValue: { summary: 'pill' }
      }
    },
    size: {
      description: 'chip 크기',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' }
      }
    },
    variant: {
      description: 'chip 종류',
      table: {
        type: { summary: 'filled | subtle-filled | outlined | text' },
        defaultValue: { summary: 'filled' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Chip>;

const RowStack = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: 'flex', columnGap: '30px', alignItems: 'end' }}>
      {children}
    </div>
  );
};

const ColumnStack = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '30px' }}>
      {children}
    </div>
  );
};

export const BasicChip: Story = {
  args: {
    label: 'label'
  },
  render: (args) => <Chip {...args} />
};

export const ChipVariant: Story = {
  args: {
    label: 'label'
  },
  render: (args) => {
    return (
      <RowStack>
        <Chip variant="filled" {...args} />
        <Chip variant="subtle-filled" {...args} />
        <Chip variant="outlined" {...args} />
        <Chip variant="text" {...args} />
      </RowStack>
    );
  }
};

export const ChipShape: Story = {
  args: {
    label: 'label'
  },
  render: (args) => {
    return (
      <RowStack>
        <Chip shape="pill" {...args} />
        <Chip shape="rounded" {...args} />
      </RowStack>
    );
  }
};

export const LeftAvatarChip: Story = {
  args: {
    label: 'label'
  },
  render: (args) => {
    return (
      <ColumnStack>
        <RowStack>
          <Chip
            leftAvatar={<Avatar src={dogImage} alt="강아지 사진" />}
            {...args}
          />
          <Chip leftAvatar={<Avatar>N</Avatar>} {...args} />
          <Chip
            leftAvatar={
              <Avatar>
                <PersonIcon />
              </Avatar>
            }
            {...args}
          />
        </RowStack>
        <RowStack>
          <Chip
            leftAvatar={<Avatar src={dogImage} alt="강아지 사진" />}
            variant="subtle-filled"
            {...args}
          />
          <Chip
            leftAvatar={<Avatar>N</Avatar>}
            variant="subtle-filled"
            {...args}
          />
          <Chip
            leftAvatar={
              <Avatar>
                <PersonIcon />
              </Avatar>
            }
            variant="subtle-filled"
            {...args}
          />
        </RowStack>
        <RowStack>
          <Chip
            leftAvatar={<Avatar src={dogImage} alt="강아지 사진" />}
            variant="outlined"
            {...args}
          />
          <Chip leftAvatar={<Avatar>N</Avatar>} variant="outlined" {...args} />
          <Chip
            leftAvatar={
              <Avatar>
                <PersonIcon />
              </Avatar>
            }
            variant="outlined"
            {...args}
          />
        </RowStack>
        <RowStack>
          <Chip
            leftAvatar={<Avatar src={dogImage} alt="강아지 사진" />}
            variant="text"
            {...args}
          />
          <Chip leftAvatar={<Avatar>N</Avatar>} variant="text" {...args} />
          <Chip
            leftAvatar={
              <Avatar>
                <PersonIcon />
              </Avatar>
            }
            variant="text"
            {...args}
          />
        </RowStack>
      </ColumnStack>
    );
  }
};

export const RightAvatarChip: Story = {
  args: {
    label: 'label'
  },
  render: (args) => {
    return (
      <ColumnStack>
        <RowStack>
          <Chip
            rightAvatar={<Avatar src={dogImage} alt="강아지 사진" />}
            {...args}
          />
          <Chip rightAvatar={<Avatar>N</Avatar>} {...args} />
          <Chip
            rightAvatar={
              <Avatar>
                <PersonIcon />
              </Avatar>
            }
            {...args}
          />
        </RowStack>
        <RowStack>
          <Chip
            rightAvatar={<Avatar src={dogImage} alt="강아지 사진" />}
            variant="subtle-filled"
            {...args}
          />
          <Chip
            rightAvatar={<Avatar>N</Avatar>}
            variant="subtle-filled"
            {...args}
          />
          <Chip
            rightAvatar={
              <Avatar>
                <PersonIcon />
              </Avatar>
            }
            variant="subtle-filled"
            {...args}
          />
        </RowStack>
        <RowStack>
          <Chip
            rightAvatar={<Avatar src={dogImage} alt="강아지 사진" />}
            variant="outlined"
            {...args}
          />
          <Chip rightAvatar={<Avatar>N</Avatar>} variant="outlined" {...args} />
          <Chip
            rightAvatar={
              <Avatar>
                <PersonIcon />
              </Avatar>
            }
            variant="outlined"
            {...args}
          />
        </RowStack>
        <RowStack>
          <Chip
            rightAvatar={<Avatar src={dogImage} alt="강아지 사진" />}
            variant="text"
            {...args}
          />
          <Chip rightAvatar={<Avatar>N</Avatar>} variant="text" {...args} />
          <Chip
            rightAvatar={
              <Avatar>
                <PersonIcon />
              </Avatar>
            }
            variant="text"
            {...args}
          />
        </RowStack>
      </ColumnStack>
    );
  }
};

export const LeftIconChip: Story = {
  args: {
    label: 'label'
  },
  render: (args) => {
    return (
      <RowStack>
        <Chip leftIcon={<PersonIcon />} variant="filled" {...args} />
        <Chip leftIcon={<PersonIcon />} variant="subtle-filled" {...args} />
        <Chip leftIcon={<PersonIcon />} variant="outlined" {...args} />
        <Chip leftIcon={<PersonIcon />} variant="text" {...args} />
      </RowStack>
    );
  }
};

export const RightIconChip: Story = {
  args: {
    label: 'label'
  },
  render: (args) => {
    return (
      <RowStack>
        <Chip rightIcon={<PersonIcon />} variant="filled" {...args} />
        <Chip rightIcon={<PersonIcon />} variant="subtle-filled" {...args} />
        <Chip rightIcon={<PersonIcon />} variant="outlined" {...args} />
        <Chip rightIcon={<PersonIcon />} variant="text" {...args} />
      </RowStack>
    );
  }
};

export const ClickableChip: Story = {
  args: {
    label: 'label',
    onClick: fn()
  },
  render: (args) => {
    return (
      <ColumnStack>
        <RowStack>
          <Chip
            onClick={() => {
              console.info('클릭');
            }}
            {...args}
          />
          <Chip
            onClick={() => {
              console.info('클릭');
            }}
            variant="subtle-filled"
            {...args}
          />
          <Chip
            onClick={() => {
              console.info('클릭');
            }}
            variant="outlined"
            {...args}
          />
          <Chip
            onClick={() => {
              console.info('클릭');
            }}
            variant="text"
            {...args}
          />
        </RowStack>
        <RowStack>
          <Chip
            leftAvatar={<Avatar src={dogImage} alt="강아지 사진" />}
            onClick={() => {
              console.info('클릭');
            }}
            {...args}
          />
          <Chip
            leftAvatar={<Avatar>N</Avatar>}
            onClick={() => {
              console.info('클릭');
            }}
            {...args}
          />
          <Chip
            leftAvatar={
              <Avatar>
                <PersonIcon />
              </Avatar>
            }
            onClick={() => {
              console.info('클릭');
            }}
            {...args}
          />
        </RowStack>
      </ColumnStack>
    );
  }
};

export const DefaultDeletableChip: Story = {
  args: {
    label: 'label',
    onDelete: fn()
  },
  render: (args) => {
    return (
      <ColumnStack>
        <RowStack>
          <Chip
            onDelete={() => {
              console.info('삭제');
            }}
            {...args}
          />
          <Chip
            onDelete={() => {
              console.info('삭제');
            }}
            variant="subtle-filled"
            {...args}
          />
          <Chip
            onDelete={() => {
              console.info('삭제');
            }}
            variant="outlined"
            {...args}
          />
          <Chip
            onDelete={() => {
              console.info('삭제');
            }}
            variant="text"
            {...args}
          />
        </RowStack>
        <RowStack>
          <Chip
            leftAvatar={<Avatar src={dogImage} alt="강아지 사진" />}
            onDelete={() => {
              console.info('삭제');
            }}
            {...args}
          />
          <Chip
            leftAvatar={<Avatar>N</Avatar>}
            onDelete={() => {
              console.info('삭제');
            }}
            {...args}
          />
          <Chip
            leftAvatar={
              <Avatar>
                <PersonIcon />
              </Avatar>
            }
            onDelete={() => {
              console.info('삭제');
            }}
            {...args}
          />
        </RowStack>
      </ColumnStack>
    );
  }
};

export const CustomDeletableChip: Story = {
  args: {
    label: 'label',
    onDelete: fn()
  },
  render: (args) => {
    return (
      <RowStack>
        <Chip
          onDelete={() => {
            console.info('삭제');
          }}
          deleteIcon={<TrashcanIcon />}
          {...args}
        />
        <Chip
          onDelete={() => {
            console.info('삭제');
          }}
          deleteIcon={<TrashcanIcon />}
          variant="subtle-filled"
          {...args}
        />
        <Chip
          onDelete={() => {
            console.info('삭제');
          }}
          deleteIcon={<TrashcanIcon />}
          variant="outlined"
          {...args}
        />
        <Chip
          onDelete={() => {
            console.info('삭제');
          }}
          deleteIcon={<TrashcanIcon />}
          variant="text"
          {...args}
        />
      </RowStack>
    );
  }
};

export const ClickableAndDeletableChip: Story = {
  args: {
    label: 'label',
    onClick: fn(),
    onDelete: fn()
  },
  render: (args) => {
    return (
      <RowStack>
        <Chip
          onClick={() => {
            console.info('클릭');
          }}
          onDelete={() => {
            console.info('삭제');
          }}
          {...args}
        />
        <Chip
          onClick={() => {
            console.info('클릭');
          }}
          onDelete={() => {
            console.info('삭제');
          }}
          variant="subtle-filled"
          {...args}
        />
        <Chip
          onClick={() => {
            console.info('클릭');
          }}
          onDelete={() => {
            console.info('삭제');
          }}
          variant="outlined"
          {...args}
        />
        <Chip
          onClick={() => {
            console.info('클릭');
          }}
          onDelete={() => {
            console.info('삭제');
          }}
          variant="text"
          {...args}
        />
      </RowStack>
    );
  }
};

export const ClickableOuterLinkChip: Story = {
  args: {
    label: 'label'
  },
  render: (args) => {
    return (
      <RowStack>
        <a href="#">
          <Chip clickable {...args} />
        </a>
        <a href="#">
          <Chip clickable variant="subtle-filled" {...args} />
        </a>
        <a href="#">
          <Chip clickable variant="outlined" {...args} />
        </a>
        <a href="#">
          <Chip clickable variant="text" {...args} />
        </a>
      </RowStack>
    );
  }
};

export const ClickableInnerLinkChip: Story = {
  args: {
    label: <a href="#">label</a>
  },
  render: (args) => {
    return (
      <RowStack>
        <Chip clickable {...args} />
        <Chip clickable variant="subtle-filled" {...args} />
        <Chip clickable variant="outlined" {...args} />
        <Chip clickable variant="text" {...args} />
      </RowStack>
    );
  }
};

export const Color: Story = {
  args: {
    label: 'label'
  },
  render: (args) => {
    return (
      <ColumnStack>
        <RowStack>
          <Chip variant="filled" color="secondary" {...args} />
          <Chip variant="subtle-filled" color="secondary" {...args} />
          <Chip variant="outlined" color="secondary" {...args} />
          <Chip variant="text" color="secondary" {...args} />
        </RowStack>
        <RowStack>
          <Chip variant="filled" color="yellow-400" {...args} />
          <Chip variant="subtle-filled" color="yellow-400" {...args} />
          <Chip variant="outlined" color="yellow-400" {...args} />
          <Chip variant="text" color="yellow-400" {...args} />
        </RowStack>
        <RowStack>
          <Chip variant="filled" color="green" {...args} />
          <Chip variant="subtle-filled" color="green" {...args} />
          <Chip variant="outlined" color="green" {...args} />
          <Chip variant="text" color="green" {...args} />
        </RowStack>
        <RowStack>
          <Chip variant="filled" color="#159" {...args} />
          <Chip variant="subtle-filled" color="#159" {...args} />
          <Chip variant="outlined" color="#159" {...args} />
          <Chip variant="text" color="#159" {...args} />
        </RowStack>
        <RowStack>
          <Chip variant="filled" color="rgb(100,100, 100)" {...args} />
          <Chip variant="subtle-filled" color="rgb(100,100, 100)" {...args} />
          <Chip variant="outlined" color="rgb(100,100, 100)" {...args} />
          <Chip variant="text" color="rgb(100,100, 100)" {...args} />
        </RowStack>
      </ColumnStack>
    );
  }
};

export const Size: Story = {
  args: {
    label: 'label'
  },
  render: (args) => {
    return (
      <ColumnStack>
        <RowStack>
          <Chip size="sm" {...args} />
          <Chip size="md" {...args} />
          <Chip size="lg" {...args} />
        </RowStack>
        <RowStack>
          <Chip leftIcon={<PersonIcon />} size="sm" {...args} />
          <Chip leftIcon={<PersonIcon />} size="md" {...args} />
          <Chip leftIcon={<PersonIcon />} size="lg" {...args} />
        </RowStack>
        <RowStack>
          <Chip
            leftAvatar={<Avatar src={dogImage} alt="강아지 사진" />}
            size="sm"
            {...args}
          />
          <Chip
            leftAvatar={<Avatar src={dogImage} alt="강아지 사진" />}
            size="md"
            {...args}
          />
          <Chip
            leftAvatar={<Avatar src={dogImage} alt="강아지 사진" />}
            size="lg"
            {...args}
          />
        </RowStack>
      </ColumnStack>
    );
  }
};
