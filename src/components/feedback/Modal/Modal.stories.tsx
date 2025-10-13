import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '.';
import { Button } from '@/components/general/Button';
import { ButtonBase } from '@/components/general/ButtonBase';
import { CloseIcon } from '@/components/icons/CloseIcon';

const meta: Meta<typeof Modal> = {
  component: Modal,
  argTypes: {
    children: {
      description:
        'Modal 내 ModalContent 컴포넌트에 담겨질 요소 (ModalHeader, ModalBody, ModalFooter 등)'
    },
    ModalContentProps: {
      description: 'Modal 내 ModalContent(=Box) 컴포넌트의 props',
      table: {
        type: {
          summary: `BoxProps`
        },
        defaultValue: {
          summary: `{ elevation: 15, round: isFullSize ? 0 : 4 }`
        }
      }
    },
    onClose: {
      description:
        '"escapeKeyDown", "backdropClick" 이벤트가 일어날 때 호출되는 함수'
    },
    open: {
      description: 'true이면, modal이 나타남'
    },
    scrollBehavior: {
      description: 'modal의 높이가 화면 높이보다 클 때, scroll 하는 방법',
      table: {
        type: {
          summary: `inside | outside`
        },
        defaultValue: { summary: `inside` }
      }
    },
    size: {
      description: 'modal의 너비',
      table: {
        type: {
          summary: `xs | sm | md| lg | xl | full | Responsive<xs | sm | md | lg | xl | full>`
        },
        defaultValue: { summary: `md` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Modal>;

const LONG_CONTENT = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
          reiciendis qui illo veniam aspernatur excepturi nobis, ullam maxime
          est, consectetur rem doloremque itaque quod eos recusandae consequatur
          doloribus ea fuga nostrum voluptas. Dicta, maxime quidem! Veniam,
          repellat necessitatibus alias labore sunt nemo maxime aut mollitia
          sequi corrupti, consequatur laudantium? Dolorem animi earum sed culpa
          fugiat, corrupti ex vel ad totam cupiditate voluptas amet harum.
          Tenetur dignissimos voluptatem, commodi necessitatibus totam
          consectetur repellat ea laboriosam amet sit autem officia quibusdam a
          odit iure officiis laborum ipsum sapiente ullam soluta? Voluptas porro
          perferendis alias at commodi. Veniam alias sunt maiores quam. Culpa
          alias laborum commodi repellendus repellat iste ipsa ducimus ullam
          corrupti rem dolore provident quibusdam saepe fuga natus sint
          explicabo non libero illo, dolorum labore? Molestiae id maiores vitae
          recusandae rem suscipit. Beatae, perspiciatis illum placeat
          laudantium, quibusdam minima, ipsam vitae officiis voluptatibus
          repellendus laborum facere! Nam reiciendis, laboriosam porro esse
          voluptatum qui. Minus voluptas iusto rem aliquam esse. Animi quisquam
          ad veniam veritatis officia omnis! Consectetur itaque voluptates
          dolor, dolore velit minima beatae perspiciatis quae ex quis obcaecati
          sapiente unde molestias rerum commodi. Quibusdam quisquam, corporis
          aliquid quas at velit nam rerum odio labore distinctio odit pariatur,
          natus voluptate architecto quidem nulla dolore, necessitatibus qui
          dolores voluptas quaerat? Tenetur, cum laboriosam. Voluptatum autem
          adipisci qui illo non temporibus placeat doloribus reiciendis
          necessitatibus laboriosam, fugit delectus labore laudantium molestias
          libero voluptates id, dicta quo similique. Sint quidem reiciendis
          ducimus autem molestias totam velit sapiente est doloribus eaque
          beatae repudiandae, ipsum exercitationem mollitia at voluptates, sequi
          omnis reprehenderit distinctio iure eligendi voluptatem! Eos quos in
          et, doloribus animi recusandae dolorum hic, delectus perferendis
          quidem similique pariatur beatae blanditiis iure non asperiores ab
          aliquid, facilis sunt quas optio veritatis. Pariatur porro
          exercitationem ut voluptas cumque qui sequi, odio laborum error eius,
          autem vero eos, quibusdam aut? Molestiae aspernatur beatae reiciendis
          tempora veritatis officia, rem cum. Id numquam amet facilis tenetur
          debitis perspiciatis, officiis voluptatibus dolores esse ipsum quae
          sunt porro fugit nisi quo quos ratione? Optio, eos. Nobis consequuntur
          optio ex explicabo inventore beatae eligendi, temporibus assumenda
          fugit placeat rerum soluta aperiam, animi tempore cumque quidem nihil
          numquam consectetur laboriosam dicta asperiores eaque aliquid rem
          reprehenderit. Repudiandae numquam porro velit blanditiis. Cumque
          exercitationem quibusdam corrupti a saepe ipsum corporis, beatae eum
          laboriosam. Tenetur, quidem sed. Perspiciatis fuga soluta pariatur
          mollitia quas aspernatur nihil veniam magnam dolorem veritatis nobis,
          aliquam velit sed. Rem saepe obcaecati exercitationem veritatis! Animi
          fuga nihil et quia cupiditate aliquam tempora esse nulla aut fugiat
          debitis aliquid suscipit natus provident laudantium, fugit nobis?
          Dolorum quas cupiditate quae quidem dolores numquam pariatur
          voluptatum, harum commodi maiores minus vitae doloremque, eum
          aspernatur eveniet molestiae dicta et provident! Possimus laudantium
          dicta voluptas quae veniam unde saepe officia, natus minima architecto
          impedit modi officiis libero molestiae ad esse illo quidem maiores
          numquam nemo a accusamus aut. Cupiditate, molestiae incidunt cumque
          doloribus explicabo illo voluptatem quam vitae accusamus natus ipsum
          rerum itaque, tempora provident possimus? Quam nostrum inventore,
          rerum consequuntur atque asperiores dolorem neque deserunt!`;

const ModalTemplate = ({
  openButtonContent,
  headerContent,
  bodyContent,
  closeButtonContent,
  okButtonContent,
  ...rest
}: {
  openButtonContent?: string;
  headerContent?: string;
  bodyContent?: string;
  closeButtonContent?: string;
  okButtonContent?: string;
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>{openButtonContent || 'Open Modal'}</Button>
      <Modal open={open} onClose={handleClose} {...rest}>
        <ModalHeader style={{ position: 'relative' }}>
          {headerContent || 'Modal Header'}
          <ButtonBase
            style={{
              display: 'inline-flex',
              position: 'absolute',
              top: '5px',
              right: '5px',
              padding: '4px',
              borderRadius: '50%'
            }}
            onClick={handleClose}
          >
            <CloseIcon size={20} />
          </ButtonBase>
        </ModalHeader>
        <ModalBody>{bodyContent || 'Modal Body'}</ModalBody>
        <ModalFooter>
          <Button variant="subtle-filled" onClick={handleClose}>
            {closeButtonContent || 'Close'}
          </Button>
          <Button onClick={handleClose}>{okButtonContent || 'Ok'}</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

const NestedModalTemplate = ({ ...rest }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open First Modal</Button>
      <Modal open={open} onClose={handleClose} {...rest}>
        <ModalHeader style={{ position: 'relative' }}>
          First Modal Header
          <ButtonBase
            style={{ position: 'absolute', top: '5px', right: '5px' }}
            onClick={handleClose}
          >
            <CloseIcon size={20} />
          </ButtonBase>
        </ModalHeader>
        <ModalBody>First Modal Body</ModalBody>
        <ModalFooter>
          <Button variant="subtle-filled" onClick={handleClose}>
            Close
          </Button>
          <ModalTemplate
            openButtonContent="Open Second Modal"
            headerContent="Second Modal Header"
            bodyContent="Second Modal Body"
          />
        </ModalFooter>
      </Modal>
    </>
  );
};

const ModalFormTemplate = ({ ...rest }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.info('submit 됨');
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        ModalContentProps={{
          as: 'form',
          onSubmit: handleSubmit
        }}
        {...rest}
      >
        <ModalHeader style={{ position: 'relative' }}>
          Modal Header
          <ButtonBase
            style={{
              display: 'inline-flex',
              position: 'absolute',
              top: '5px',
              right: '5px',
              padding: '4px',
              borderRadius: '50%'
            }}
            onClick={handleClose}
          >
            <CloseIcon size={20} />
          </ButtonBase>
        </ModalHeader>
        <ModalBody>Modal Body</ModalBody>
        <ModalFooter>
          <Button variant="subtle-filled" onClick={handleClose}>
            Close
          </Button>
          <Button>Ok</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const BasicModal: Story = {
  render: (args) => <ModalTemplate {...args} />
};

export const ResponsiveSizes: Story = {
  render: (args) => (
    <ModalTemplate
      size={{ xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }}
      {...args}
    />
  )
};

export const FullSize: Story = {
  render: (args) => (
    <ModalTemplate
      size="full"
      ModalContentProps={{ style: { backgroundColor: 'gray-50' } }}
      {...args}
    />
  )
};

export const ScrollInside: Story = {
  render: (args) => (
    <ModalTemplate
      bodyContent={LONG_CONTENT}
      scrollBehavior="inside"
      {...args}
    />
  )
};

export const ScrollOutside: Story = {
  render: (args) => (
    <ModalTemplate
      bodyContent={LONG_CONTENT}
      scrollBehavior="outside"
      {...args}
    />
  )
};

export const NestedModal: Story = {
  render: (args) => <NestedModalTemplate {...args} />
};

export const ModalForm: Story = {
  render: (args) => <ModalFormTemplate {...args} />
};

export const CustomizedStyle: Story = {
  render: (args) => <ModalTemplate style={{ alignItems: 'start' }} {...args} />
};
