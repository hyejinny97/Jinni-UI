import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '.';
import { Button } from '@/components/general/Button';
import { ButtonBase } from '@/components/general/ButtonBase';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { Radio } from '@/components/data-entry/Radio';
import { RadioLabel } from '@/components/data-entry/RadioLabel';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';

const meta: Meta<typeof Modal> = {
  component: Modal,
  argTypes: {
    BoxProps: {
      description: 'Box 컴포넌트의 props',
      table: {
        type: {
          summary: `BoxProps`
        }
      }
    },
    children: {
      description: 'modal 콘텐츠 (ModalHeader, ModalBody, ModalFooter 등)'
    },
    onClose: {
      description: 'Escape 키/backdrop 클릭 이벤트가 일어날 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event, reason: "escapeKeyDown" | "backdropClick") => void`
        }
      }
    },
    open: {
      description: 'true이면, modal이 나타남'
    },
    scrollBehavior: {
      description: 'modal 내 content가 뷰포트를 넘길 때 scroll 하는 방법',
      table: {
        type: {
          summary: `'inside' | 'outside'`
        },
        defaultValue: { summary: `'inside'` }
      }
    },
    size: {
      description: 'modal의 너비',
      table: {
        type: {
          summary: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | Responsive<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>`
        },
        defaultValue: { summary: `'md'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Modal>;

const BasicModalTemplate = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal open={open} onClose={closeModal}>
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
            onClick={closeModal}
            aria-label="close"
          >
            <CloseIcon size={20} />
          </ButtonBase>
        </ModalHeader>
        <ModalBody>Modal Body</ModalBody>
        <ModalFooter>
          <Button variant="subtle-filled" onClick={closeModal}>
            Close
          </Button>
          <Button onClick={closeModal}>Ok</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

const ModalSizeTemplate = () => {
  const SIZES = [
    { label: 'xs', value: 'xs' },
    { label: 'sm', value: 'sm' },
    { label: 'md', value: 'md' },
    { label: 'lg', value: 'lg' },
    { label: 'xl', value: 'xl' },
    { label: 'full', value: 'full' },
    {
      label: `{ xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }`,
      value: { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }
    }
  ] as const;
  const [open, setOpen] = useState(false);
  const [checkedValue, setCheckedValue] = useState<number>(0);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(Number(e.target.value));
  };

  return (
    <Stack spacing={20}>
      <Grid columns={6}>
        {SIZES.map((size, idx) => {
          return (
            <RadioLabel
              key={size.label}
              label={size.label}
              {...(idx === SIZES.length - 1 && {
                style: { gridColumn: 'span 6' }
              })}
            >
              <Radio
                value={idx}
                checked={checkedValue === idx}
                onChange={check}
              />
            </RadioLabel>
          );
        })}
      </Grid>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal open={open} onClose={closeModal} size={SIZES[checkedValue].value}>
        <ModalHeader>Modal Header</ModalHeader>
        <ModalBody>Modal Body</ModalBody>
        <ModalFooter>
          <Button variant="subtle-filled" onClick={closeModal}>
            Close
          </Button>
          <Button onClick={closeModal}>Ok</Button>
        </ModalFooter>
      </Modal>
    </Stack>
  );
};

const ModalScrollBehaviorTemplate = () => {
  const SCROLLS = ['inside', 'outside'] as const;
  const [open, setOpen] = useState(false);
  const [checkedValue, setCheckedValue] = useState<(typeof SCROLLS)[number]>(
    SCROLLS[0]
  );

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(e.target.value as (typeof SCROLLS)[number]);
  };

  return (
    <Stack spacing={20}>
      <Grid columns={2}>
        {SCROLLS.map((scroll) => {
          return (
            <RadioLabel key={scroll} label={scroll}>
              <Radio
                value={scroll}
                checked={checkedValue === scroll}
                onChange={check}
              />
            </RadioLabel>
          );
        })}
      </Grid>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal open={open} onClose={closeModal} scrollBehavior={checkedValue}>
        <ModalHeader>Modal Header</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
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
          rerum consequuntur atque asperiores dolorem neque deserunt!
        </ModalBody>
        <ModalFooter>
          <Button variant="subtle-filled" onClick={closeModal}>
            Close
          </Button>
          <Button onClick={closeModal}>Ok</Button>
        </ModalFooter>
      </Modal>
    </Stack>
  );
};

const NestedModalTemplate = () => {
  const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);

  const openFirstModal = () => {
    setOpenFirst(true);
  };
  const openSecondModal = () => {
    setOpenSecond(true);
  };
  const closeFirstModal = () => {
    setOpenFirst(false);
  };
  const closeSecondModal = () => {
    setOpenSecond(false);
  };

  return (
    <>
      <Button onClick={openFirstModal}>Open First Modal</Button>
      <Modal open={openFirst} onClose={closeFirstModal}>
        <ModalHeader>First Modal Header</ModalHeader>
        <ModalBody>First Modal Body</ModalBody>
        <ModalFooter>
          <Button variant="subtle-filled" onClick={closeFirstModal}>
            Close
          </Button>
          <Button onClick={openSecondModal}>Open Second Model</Button>
        </ModalFooter>
      </Modal>
      <Modal open={openSecond} onClose={closeSecondModal}>
        <ModalHeader>Second Modal Header</ModalHeader>
        <ModalBody>Second Modal Body</ModalBody>
        <ModalFooter>
          <Button variant="subtle-filled" onClick={closeSecondModal}>
            Close
          </Button>
          <Button onClick={closeSecondModal}>Ok</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

const ModalFormTemplate = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.info('submit 됨');
    closeModal();
  };

  return (
    <>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal
        open={open}
        onClose={closeModal}
        BoxProps={{
          as: 'form',
          onSubmit: handleSubmit
        }}
        style={{ alignItems: 'start' }}
      >
        <ModalHeader>Modal Header</ModalHeader>
        <ModalBody>Modal Body</ModalBody>
        <ModalFooter>
          <Button variant="subtle-filled" onClick={closeModal}>
            Close
          </Button>
          <Button type="submit">Submit</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const BasicModal: Story = {
  render: () => <BasicModalTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BasicModalTemplate = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal open={open} onClose={closeModal}>
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
            onClick={closeModal}
            aria-label="close"
          >
            <CloseIcon size={20} />
          </ButtonBase>
        </ModalHeader>
        <ModalBody>Modal Body</ModalBody>
        <ModalFooter>
          <Button variant="subtle-filled" onClick={closeModal}>
            Close
          </Button>
          <Button onClick={closeModal}>Ok</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};`.trim()
      }
    }
  }
};

export const Sizes: Story = {
  render: () => <ModalSizeTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ModalSizeTemplate = () => {
  const SIZES = [
    { label: 'xs', value: 'xs' },
    { label: 'sm', value: 'sm' },
    { label: 'md', value: 'md' },
    { label: 'lg', value: 'lg' },
    { label: 'xl', value: 'xl' },
    { label: 'full', value: 'full' },
    {
      label: \`{ xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }\`,
      value: { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }
    }
  ] as const;
  const [open, setOpen] = useState(false);
  const [checkedValue, setCheckedValue] = useState<number>(0);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(Number(e.target.value));
  };

  return (
    <Stack spacing={20}>
      <Grid columns={6}>
        {SIZES.map((size, idx) => {
          return (
            <RadioLabel
              key={size.label}
              label={size.label}
              {...(idx === SIZES.length - 1 && {
                style: { gridColumn: 'span 6' }
              })}
            >
              <Radio
                value={idx}
                checked={checkedValue === idx}
                onChange={check}
              />
            </RadioLabel>
          );
        })}
      </Grid>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal open={open} onClose={closeModal} size={SIZES[checkedValue].value}>
        <ModalHeader>Modal Header</ModalHeader>
        <ModalBody>Modal Body</ModalBody>
        <ModalFooter>
          <Button variant="subtle-filled" onClick={closeModal}>
            Close
          </Button>
          <Button onClick={closeModal}>Ok</Button>
        </ModalFooter>
      </Modal>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ScrollBehavior: Story = {
  render: () => <ModalScrollBehaviorTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ModalScrollBehaviorTemplate = () => {
  const SCROLLS = ['inside', 'outside'] as const;
  const [open, setOpen] = useState(false);
  const [checkedValue, setCheckedValue] = useState<(typeof SCROLLS)[number]>(
    SCROLLS[0]
  );

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(e.target.value as (typeof SCROLLS)[number]);
  };

  return (
    <Stack spacing={20}>
      <Grid columns={2}>
        {SCROLLS.map((scroll) => {
          return (
            <RadioLabel key={scroll} label={scroll}>
              <Radio
                value={scroll}
                checked={checkedValue === scroll}
                onChange={check}
              />
            </RadioLabel>
          );
        })}
      </Grid>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal open={open} onClose={closeModal} scrollBehavior={checkedValue}>
        <ModalHeader>Modal Header</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
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
          rerum consequuntur atque asperiores dolorem neque deserunt!
        </ModalBody>
        <ModalFooter>
          <Button variant="subtle-filled" onClick={closeModal}>
            Close
          </Button>
          <Button onClick={closeModal}>Ok</Button>
        </ModalFooter>
      </Modal>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const NestedModal: Story = {
  render: () => <NestedModalTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const NestedModalTemplate = () => {
  const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);

  const openFirstModal = () => {
    setOpenFirst(true);
  };
  const openSecondModal = () => {
    setOpenSecond(true);
  };
  const closeFirstModal = () => {
    setOpenFirst(false);
  };
  const closeSecondModal = () => {
    setOpenSecond(false);
  };

  return (
    <>
      <Button onClick={openFirstModal}>Open First Modal</Button>
      <Modal open={openFirst} onClose={closeFirstModal}>
        <ModalHeader>First Modal Header</ModalHeader>
        <ModalBody>First Modal Body</ModalBody>
        <ModalFooter>
          <Button variant="subtle-filled" onClick={closeFirstModal}>
            Close
          </Button>
          <Button onClick={openSecondModal}>Open Second Model</Button>
        </ModalFooter>
      </Modal>
      <Modal open={openSecond} onClose={closeSecondModal}>
        <ModalHeader>Second Modal Header</ModalHeader>
        <ModalBody>Second Modal Body</ModalBody>
        <ModalFooter>
          <Button variant="subtle-filled" onClick={closeSecondModal}>
            Close
          </Button>
          <Button onClick={closeSecondModal}>Ok</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};`.trim()
      }
    }
  }
};

export const CustomizeModal: Story = {
  render: () => <ModalFormTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ModalFormTemplate = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.info('submit 됨');
    closeModal();
  };

  return (
    <>
      <Button onClick={openModal}>Open Modal</Button>
      <Modal
        open={open}
        onClose={closeModal}
        BoxProps={{
          as: 'form',
          onSubmit: handleSubmit
        }}
        style={{ alignItems: 'start' }}
      >
        <ModalHeader>Modal Header</ModalHeader>
        <ModalBody>Modal Body</ModalBody>
        <ModalFooter>
          <Button variant="subtle-filled" onClick={closeModal}>
            Close
          </Button>
          <Button type="submit">Submit</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};`.trim()
      }
    }
  }
};
