import React, { FormEvent, useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FileInput from './FileInput';
import { Button } from '@/components/general/Button';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { ButtonBase } from '@/components/general/ButtonBase';
import { TrashcanIcon } from '@/components/icons/TrashcanIcon';
import { AddIcon } from '@/components/icons/AddIcon';
import { FileUploadIcon } from '@/components/icons/FileUploadIcon';
import { Toast } from '@/components/feedback/Toast';
import { CircularProgress } from '@/components/feedback/CircularProgress';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';

const meta: Meta<typeof FileInput> = {
  component: FileInput,
  argTypes: {
    accept: {
      description: '허용하는 file 유형',
      type: 'string'
    },
    children: {
      description: 'file input을 나타내는 요소',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨 ',
      table: {
        type: { summary: 'boolean' }
      }
    },
    multiple: {
      description: 'true이면, 2개 이상의 파일을 받을 수 있음 ',
      table: {
        type: { summary: 'boolean' }
      }
    },
    name: {
      description: 'file input의 name',
      type: 'string'
    },
    onChange: {
      description: 'file input의 value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(
    event: React.ChangeEvent<HTMLInputElement>,
    value: Multiple extends true ? Array<File> : null | File;
  ) => void`
        }
      }
    },
    value: {
      description: 'file input의 value',
      table: {
        type: {
          summary: `Multiple extends true ? Array<File> : null | File`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof FileInput>;

const addByteUnit = (value: number): string => {
  const UNITS = ['B', 'KB', 'MB', 'TB'];

  let currentUnitIdx = 0;
  let currentValue = value;
  for (let i = 0; 0 <= i && i <= UNITS.length - 1; i++) {
    const hasQuotient = Math.floor(currentValue / 1000);
    if (hasQuotient) {
      currentValue /= 1000;
      currentUnitIdx += 1;
    } else {
      break;
    }
  }
  return `${currentValue.toFixed(2)} ${UNITS[currentUnitIdx]}`;
};

const BasicFileInputTemplate = () => {
  const APPEARANCES = ['Button', 'Square', 'Circle'] as const;
  const [appearance, setAppearance] = useState<(typeof APPEARANCES)[number]>(
    APPEARANCES[0]
  );
  const [file, setFile] = useState<File | null>(null);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFile: File | null
  ) => {
    setFile(newFile);
  };
  const removeFile = () => {
    setFile(null);
  };
  const changeAppearance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppearance(e.target.value as (typeof APPEARANCES)[number]);
  };

  let content = null;
  switch (appearance) {
    case 'Button':
      content = <Button tabIndex={-1}>Choose File</Button>;
      break;
    case 'Square':
      content = (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100px',
            height: '100px',
            border: '1px dashed lightgray',
            borderRadius: '4px',
            backgroundColor: 'gray-100'
          }}
        >
          Choose File
        </Box>
      );
      break;
    case 'Circle':
      content = (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100px',
            height: '100px',
            border: '1px dashed lightgray',
            borderRadius: '50%',
            backgroundColor: 'gray-100'
          }}
        >
          Choose File
        </Box>
      );
  }

  return (
    <Stack
      spacing={20}
      style={{
        alignItems: 'center',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <fieldset>
        <legend>Choose FileInput appearance</legend>
        <RadioGroup
          name="appearance"
          value={appearance}
          onChange={changeAppearance}
        >
          <Stack direction="row">
            {APPEARANCES.map((appearance) => (
              <Label key={appearance} content={appearance}>
                <Radio value={appearance} />
              </Label>
            ))}
          </Stack>
        </RadioGroup>
      </fieldset>
      <FileInput value={file} onChange={updateFile}>
        {content}
      </FileInput>
      {file && (
        <Box
          elevation={3}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            width: '100%',
            borderRadius: '4px'
          }}
        >
          <Box>
            <Text className="typo-title-medium" noMargin>
              {file.name}
            </Text>
            <Text
              className="typo-label-medium"
              noMargin
              style={{ marginTop: '5px', color: 'gray-500' }}
            >
              {addByteUnit(file.size)}
            </Text>
            <Text
              className="typo-label-small"
              noMargin
              style={{ color: 'gray-400' }}
            >
              ({file.type})
            </Text>
          </Box>
          <ButtonBase
            aria-label={`remove ${file.name} file`}
            onClick={removeFile}
            style={{
              display: 'inline-flex',
              borderRadius: '50%',
              padding: '4px'
            }}
          >
            <TrashcanIcon color="gray-500" />
          </ButtonBase>
        </Box>
      )}
    </Stack>
  );
};

const BasicMultipleTemplate = () => {
  const [files, setFiles] = useState<Array<File>>([]);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFiles: Array<File>
  ) => {
    setFiles(newFiles);
  };
  const removeFile = (idxToDelete: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== idxToDelete));
  };

  return (
    <Stack
      spacing={20}
      style={{
        alignItems: 'center',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <FileInput multiple value={files} onChange={updateFile}>
        <Button tabIndex={-1}>Choose File</Button>
      </FileInput>
      <Stack spacing={10} style={{ alignSelf: 'stretch' }}>
        {files.map((file, idx) => (
          <Box
            key={`${file.name}/${idx}`}
            elevation={3}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 20px',
              width: '100%',
              borderRadius: '4px'
            }}
          >
            <Box>
              <Text className="typo-title-medium" noMargin>
                {file.name}
              </Text>
              <Text
                className="typo-label-medium"
                noMargin
                style={{ marginTop: '5px', color: 'gray-500' }}
              >
                {addByteUnit(file.size)}
              </Text>
              <Text
                className="typo-label-small"
                noMargin
                style={{ color: 'gray-400' }}
              >
                ({file.type})
              </Text>
            </Box>
            <ButtonBase
              aria-label={`remove ${file.name} file`}
              onClick={() => removeFile(idx)}
              style={{
                display: 'inline-flex',
                borderRadius: '50%',
                padding: '4px'
              }}
            >
              <TrashcanIcon color="gray-500" />
            </ButtonBase>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

const DeduplicatedFilesTemplate = () => {
  const [files, setFiles] = useState<Array<File>>([]);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFiles: Array<File>
  ) => {
    const fileNameSet = new Set(newFiles.map((file) => file.name));
    const deduplicatedFiles: Array<File> = [];
    newFiles.forEach((file) => {
      if (fileNameSet.has(file.name)) {
        deduplicatedFiles.push(file);
        fileNameSet.delete(file.name);
      }
    });
    setFiles(deduplicatedFiles);
  };
  const removeFile = (idxToDelete: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== idxToDelete));
  };

  return (
    <Stack
      spacing={20}
      style={{
        alignItems: 'center',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <FileInput multiple value={files} onChange={updateFile}>
        <Button tabIndex={-1}>Choose File</Button>
      </FileInput>
      <Stack spacing={10} style={{ alignSelf: 'stretch' }}>
        {files.map((file, idx) => (
          <Box
            key={`${file.name}/${idx}`}
            elevation={3}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 20px',
              width: '100%',
              borderRadius: '4px'
            }}
          >
            <Box>
              <Text className="typo-title-medium" noMargin>
                {file.name}
              </Text>
              <Text
                className="typo-label-medium"
                noMargin
                style={{ marginTop: '5px', color: 'gray-500' }}
              >
                {addByteUnit(file.size)}
              </Text>
              <Text
                className="typo-label-small"
                noMargin
                style={{ color: 'gray-400' }}
              >
                ({file.type})
              </Text>
            </Box>
            <ButtonBase
              aria-label={`remove ${file.name} file`}
              onClick={() => removeFile(idx)}
              style={{
                display: 'inline-flex',
                borderRadius: '50%',
                padding: '4px'
              }}
            >
              <TrashcanIcon color="gray-500" />
            </ButtonBase>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

const BasicAcceptTemplate = () => {
  const [file, setFile] = useState<File | null>(null);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFile: File | null
  ) => {
    setFile(newFile);
  };
  const removeFile = () => {
    setFile(null);
  };

  return (
    <Stack
      spacing={20}
      style={{
        alignItems: 'center',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <FileInput accept=".pdf" value={file} onChange={updateFile}>
        <Button tabIndex={-1}>Choose File</Button>
      </FileInput>
      {file && (
        <Box
          elevation={3}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            width: '100%',
            borderRadius: '4px'
          }}
        >
          <Box>
            <Text className="typo-title-medium" noMargin>
              {file.name}
            </Text>
            <Text
              className="typo-label-medium"
              noMargin
              style={{ marginTop: '5px', color: 'gray-500' }}
            >
              {addByteUnit(file.size)}
            </Text>
            <Text
              className="typo-label-small"
              noMargin
              style={{ color: 'gray-400' }}
            >
              ({file.type})
            </Text>
          </Box>
          <ButtonBase
            aria-label={`remove ${file.name} file`}
            onClick={removeFile}
            style={{
              display: 'inline-flex',
              borderRadius: '50%',
              padding: '4px'
            }}
          >
            <TrashcanIcon color="gray-500" />
          </ButtonBase>
        </Box>
      )}
    </Stack>
  );
};

const ValidateAcceptTemplate = () => {
  const acceptTypes = ['image/png', 'image/jpeg'];
  const acceptTypesString = acceptTypes.join(',');
  const [file, setFile] = useState<File | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFile: File | null
  ) => {
    if (newFile) {
      const isNotValidType = !acceptTypes.includes(newFile.type);
      if (isNotValidType) {
        setToastMessage(
          `파일 유형이 올바르지 않습니다. (가능한 파일 유형: ${acceptTypesString})`
        );
        return;
      }
    }
    setFile(newFile);
  };
  const removeFile = () => {
    setFile(null);
  };
  const closeToast = () => {
    setToastMessage(null);
  };

  return (
    <>
      <Stack
        spacing={20}
        style={{
          alignItems: 'center',
          minWidth: '300px',
          maxWidth: '400px'
        }}
      >
        <FileInput
          accept={acceptTypesString}
          value={file}
          onChange={updateFile}
        >
          <Button tabIndex={-1}>Choose File</Button>
        </FileInput>
        {file && (
          <Box
            elevation={3}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 20px',
              width: '100%',
              borderRadius: '4px'
            }}
          >
            <Box>
              <Text className="typo-title-medium" noMargin>
                {file.name}
              </Text>
              <Text
                className="typo-label-medium"
                noMargin
                style={{ marginTop: '5px', color: 'gray-500' }}
              >
                {addByteUnit(file.size)}
              </Text>
              <Text
                className="typo-label-small"
                noMargin
                style={{ color: 'gray-400' }}
              >
                ({file.type})
              </Text>
            </Box>
            <ButtonBase
              aria-label={`remove ${file.name} file`}
              onClick={removeFile}
              style={{
                display: 'inline-flex',
                borderRadius: '50%',
                padding: '4px'
              }}
            >
              <TrashcanIcon color="gray-500" />
            </ButtonBase>
          </Box>
        )}
      </Stack>
      <Toast
        open={!!toastMessage}
        onClose={closeToast}
        message={toastMessage}
        autoHideDuration={3}
      />
    </>
  );
};

const DisabledTemplate = () => {
  const [file, setFile] = useState<File | null>(null);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFile: File | null
  ) => {
    setFile(newFile);
  };
  const removeFile = () => {
    setFile(null);
  };

  return (
    <Stack
      spacing={20}
      style={{
        alignItems: 'center',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <FileInput value={file} onChange={updateFile} disabled>
        <Button tabIndex={-1} disabled>
          Choose File
        </Button>
      </FileInput>
      {file && (
        <Box
          elevation={3}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            width: '100%',
            borderRadius: '4px'
          }}
        >
          <Box>
            <Text className="typo-title-medium" noMargin>
              {file.name}
            </Text>
            <Text
              className="typo-label-medium"
              noMargin
              style={{ marginTop: '5px', color: 'gray-500' }}
            >
              {addByteUnit(file.size)}
            </Text>
            <Text
              className="typo-label-small"
              noMargin
              style={{ color: 'gray-400' }}
            >
              ({file.type})
            </Text>
          </Box>
          <ButtonBase
            aria-label={`remove ${file.name} file`}
            onClick={removeFile}
            style={{
              display: 'inline-flex',
              borderRadius: '50%',
              padding: '4px'
            }}
          >
            <TrashcanIcon color="gray-500" />
          </ButtonBase>
        </Box>
      )}
    </Stack>
  );
};

const MaxFileSizeTemplate = () => {
  const MAX_FILE_SIZE = 50000;
  const [file, setFile] = useState<File | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFile: File | null
  ) => {
    if (newFile && newFile.size > MAX_FILE_SIZE) {
      setToastMessage(
        `최대 파일 크기(50KB)를 초과했습니다. (파일 크기: ${addByteUnit(newFile.size)})`
      );
      return;
    }
    setFile(newFile);
  };
  const removeFile = () => {
    setFile(null);
  };
  const closeToast = () => {
    setToastMessage(null);
  };

  return (
    <>
      <Stack
        spacing={20}
        style={{
          alignItems: 'center',
          minWidth: '300px',
          maxWidth: '400px'
        }}
      >
        <FileInput value={file} onChange={updateFile}>
          <Button tabIndex={-1}>Choose File</Button>
        </FileInput>
        {file && (
          <Box
            elevation={3}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 20px',
              width: '100%',
              borderRadius: '4px'
            }}
          >
            <Box>
              <Text className="typo-title-medium" noMargin>
                {file.name}
              </Text>
              <Text
                className="typo-label-medium"
                noMargin
                style={{ marginTop: '5px', color: 'gray-500' }}
              >
                {addByteUnit(file.size)}
              </Text>
              <Text
                className="typo-label-small"
                noMargin
                style={{ color: 'gray-400' }}
              >
                ({file.type})
              </Text>
            </Box>
            <ButtonBase
              aria-label={`remove ${file.name} file`}
              onClick={removeFile}
              style={{
                display: 'inline-flex',
                borderRadius: '50%',
                padding: '4px'
              }}
            >
              <TrashcanIcon color="gray-500" />
            </ButtonBase>
          </Box>
        )}
      </Stack>
      <Toast
        open={!!toastMessage}
        onClose={closeToast}
        message={toastMessage}
        autoHideDuration={3}
      />
    </>
  );
};

const MaxFilesTemplate = () => {
  const MAX_FILES = 3;
  const [files, setFiles] = useState<Array<File>>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFiles: Array<File>
  ) => {
    if (newFiles.length > MAX_FILES) {
      setToastMessage('최대 업로드 파일 수(3개)를 초과했습니다.');
      return;
    }
    setFiles(newFiles);
  };
  const removeFile = (idxToDelete: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== idxToDelete));
  };
  const closeToast = () => {
    setToastMessage(null);
  };

  return (
    <>
      <Stack
        spacing={20}
        style={{
          alignItems: 'center',
          minWidth: '300px',
          maxWidth: '400px'
        }}
      >
        <FileInput multiple value={files} onChange={updateFile}>
          <Button tabIndex={-1}>Choose File</Button>
        </FileInput>
        <Stack spacing={10} style={{ alignSelf: 'stretch' }}>
          {files.map((file, idx) => (
            <Box
              key={`${file.name}/${idx}`}
              elevation={3}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 20px',
                width: '100%',
                borderRadius: '4px'
              }}
            >
              <Box>
                <Text className="typo-title-medium" noMargin>
                  {file.name}
                </Text>
                <Text
                  className="typo-label-medium"
                  noMargin
                  style={{ marginTop: '5px', color: 'gray-500' }}
                >
                  {addByteUnit(file.size)}
                </Text>
                <Text
                  className="typo-label-small"
                  noMargin
                  style={{ color: 'gray-400' }}
                >
                  ({file.type})
                </Text>
              </Box>
              <ButtonBase
                aria-label={`remove ${file.name} file`}
                onClick={() => removeFile(idx)}
                style={{
                  display: 'inline-flex',
                  borderRadius: '50%',
                  padding: '4px'
                }}
              >
                <TrashcanIcon color="gray-500" />
              </ButtonBase>
            </Box>
          ))}
        </Stack>
      </Stack>
      <Toast
        open={!!toastMessage}
        onClose={closeToast}
        message={toastMessage}
        autoHideDuration={3}
      />
    </>
  );
};

const FileInputWithFormTemplate = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFile: File | null
  ) => {
    setFile(newFile);
  };
  const removeFile = () => {
    setFile(null);
  };
  const closeToast = () => {
    setToastMessage(null);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setToastMessage('업로드할 파일이 없습니다.');
      return;
    }
    // file state를 사용해 서버로 파일 전송
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage('파일이 업로드 되었습니다.');
    }, 2000);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={20}
          style={{
            alignItems: 'center',
            minWidth: '300px',
            maxWidth: '400px'
          }}
        >
          <Stack direction="row" spacing={20}>
            <FileInput value={file} onChange={updateFile}>
              <Button
                type="button"
                startAdornment={<AddIcon color="white" />}
                disabled={isSubmitting}
                tabIndex={-1}
              >
                Choose File
              </Button>
            </FileInput>
            <Button
              type="submit"
              variant="outlined"
              startAdornment={
                isSubmitting ? (
                  <CircularProgress color="primary" />
                ) : (
                  <FileUploadIcon color="primary" />
                )
              }
              disabled={isSubmitting}
            >
              Upload File
            </Button>
          </Stack>
          {file && (
            <Box
              elevation={3}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 20px',
                width: '100%',
                borderRadius: '4px'
              }}
            >
              <Box>
                <Text className="typo-title-medium" noMargin>
                  {file.name}
                </Text>
                <Text
                  className="typo-label-medium"
                  noMargin
                  style={{ marginTop: '5px', color: 'gray-500' }}
                >
                  {addByteUnit(file.size)}
                </Text>
                <Text
                  className="typo-label-small"
                  noMargin
                  style={{ color: 'gray-400' }}
                >
                  ({file.type})
                </Text>
              </Box>
              <ButtonBase
                aria-label={`remove ${file.name} file`}
                onClick={removeFile}
                style={{
                  display: 'inline-flex',
                  borderRadius: '50%',
                  padding: '4px'
                }}
              >
                <TrashcanIcon color="gray-500" />
              </ButtonBase>
            </Box>
          )}
        </Stack>
      </form>
      <Toast
        open={!!toastMessage}
        onClose={closeToast}
        message={toastMessage}
        autoHideDuration={3}
      />
    </>
  );
};

const FileInputWithPreviewImageTemplate = () => {
  const [files, setFiles] = useState<Array<File>>([]);
  const [dataUrlArr, setDataUrlArr] = useState<Array<string>>([]);

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
  const updateFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    newFiles: Array<File>
  ) => {
    setFiles(newFiles);

    const { files } = e.target;
    if (files) {
      const addedFiles = [...files];
      Promise.all(addedFiles.map((file) => fileToDataUrl(file))).then(
        (dataUrlArr) => {
          setDataUrlArr((prev) => [...prev, ...dataUrlArr]);
        }
      );
    }
  };
  const removeFile = (idxToDelete: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== idxToDelete));
    setDataUrlArr((prev) => prev.filter((_, idx) => idx !== idxToDelete));
  };

  return (
    <Stack
      spacing={20}
      style={{
        alignItems: 'center',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <FileInput accept="image/*" multiple value={files} onChange={updateFile}>
        <Button tabIndex={-1}>Choose File</Button>
      </FileInput>
      <Stack spacing={10} style={{ alignSelf: 'stretch' }}>
        {files.map((file, idx) => (
          <Box
            key={`${file.name}/${idx}`}
            elevation={3}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 20px',
              width: '100%',
              borderRadius: '4px'
            }}
          >
            <Stack
              direction="row"
              spacing={20}
              style={{ alignItems: 'center' }}
            >
              <img
                src={dataUrlArr[idx]}
                alt={file.name}
                width={50}
                height={50}
                style={{ objectFit: 'contain', borderRadius: '4px' }}
              />
              <Box>
                <Text className="typo-title-medium" noMargin>
                  {file.name}
                </Text>
                <Text
                  className="typo-label-medium"
                  noMargin
                  style={{ marginTop: '5px', color: 'gray-500' }}
                >
                  {addByteUnit(file.size)}
                </Text>
                <Text
                  className="typo-label-small"
                  noMargin
                  style={{ color: 'gray-400' }}
                >
                  ({file.type})
                </Text>
              </Box>
            </Stack>
            <ButtonBase
              aria-label={`remove ${file.name} file`}
              onClick={() => removeFile(idx)}
              style={{
                display: 'inline-flex',
                borderRadius: '50%',
                padding: '4px'
              }}
            >
              <TrashcanIcon color="gray-500" />
            </ButtonBase>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

const DragAndDropTemplate = () => {
  const [files, setFiles] = useState<Array<File>>([]);
  const boxElRef = useRef<HTMLElement>(null);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFiles: Array<File>
  ) => {
    setFiles(newFiles);
  };
  const removeFile = (idxToDelete: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== idxToDelete));
  };
  const handleDragEnter = () => {
    const boxEl = boxElRef.current;
    if (!boxEl) return;
    boxEl.style.backgroundColor = 'gray';
  };
  const handleDrop = () => {
    const boxEl = boxElRef.current;
    if (!boxEl) return;
    boxEl.style.backgroundColor = 'lightgray';
  };

  return (
    <Stack
      spacing={20}
      style={{
        alignItems: 'center',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <FileInput
        multiple
        value={files}
        onChange={updateFile}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
      >
        <Box
          ref={boxElRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '500px',
            height: '300px',
            border: '1px dashed gray',
            borderRadius: '4px',
            backgroundColor: 'lightgray'
          }}
        >
          Click or drag file to this area
        </Box>
      </FileInput>
      <Stack spacing={10} style={{ alignSelf: 'stretch' }}>
        {files.map((file, idx) => (
          <Box
            key={`${file.name}/${idx}`}
            elevation={3}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 20px',
              width: '100%',
              borderRadius: '4px'
            }}
          >
            <Box>
              <Text className="typo-title-medium" noMargin>
                {file.name}
              </Text>
              <Text
                className="typo-label-medium"
                noMargin
                style={{ marginTop: '5px', color: 'gray-500' }}
              >
                {addByteUnit(file.size)}
              </Text>
              <Text
                className="typo-label-small"
                noMargin
                style={{ color: 'gray-400' }}
              >
                ({file.type})
              </Text>
            </Box>
            <ButtonBase
              aria-label={`remove ${file.name} file`}
              onClick={() => removeFile(idx)}
              style={{
                display: 'inline-flex',
                borderRadius: '50%',
                padding: '4px'
              }}
            >
              <TrashcanIcon color="gray-500" />
            </ButtonBase>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export const BasicFileInput: Story = {
  render: () => <BasicFileInputTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BasicFileInputTemplate = () => {
  const APPEARANCES = ['Button', 'Square', 'Circle'] as const;
  const [appearance, setAppearance] = useState<(typeof APPEARANCES)[number]>(
    APPEARANCES[0]
  );
  const [file, setFile] = useState<File | null>(null);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFile: File | null
  ) => {
    setFile(newFile);
  };
  const removeFile = () => {
    setFile(null);
  };
  const changeAppearance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppearance(e.target.value as (typeof APPEARANCES)[number]);
  };

  let content = null;
  switch (appearance) {
    case 'Button':
      content = <Button tabIndex={-1}>Choose File</Button>;
      break;
    case 'Square':
      content = (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100px',
            height: '100px',
            border: '1px dashed lightgray',
            borderRadius: '4px',
            backgroundColor: 'gray-100'
          }}
        >
          Choose File
        </Box>
      );
      break;
    case 'Circle':
      content = (
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100px',
            height: '100px',
            border: '1px dashed lightgray',
            borderRadius: '50%',
            backgroundColor: 'gray-100'
          }}
        >
          Choose File
        </Box>
      );
  }

  return (
    <Stack
      spacing={20}
      style={{
        alignItems: 'center',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <fieldset>
        <legend>Choose FileInput appearance</legend>
        <RadioGroup
          name="appearance"
          value={appearance}
          onChange={changeAppearance}
        >
          <Stack direction="row">
            {APPEARANCES.map((appearance) => (
              <Label key={appearance} content={appearance}>
                <Radio value={appearance} />
              </Label>
            ))}
          </Stack>
        </RadioGroup>
      </fieldset>
      <FileInput value={file} onChange={updateFile}>
        {content}
      </FileInput>
      {file && (
        <Box
          elevation={3}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            width: '100%',
            borderRadius: '4px'
          }}
        >
          <Box>
            <Text className="typo-title-medium" noMargin>
              {file.name}
            </Text>
            <Text
              className="typo-label-medium"
              noMargin
              style={{ marginTop: '5px', color: 'gray-500' }}
            >
              {addByteUnit(file.size)}
            </Text>
            <Text
              className="typo-label-small"
              noMargin
              style={{ color: 'gray-400' }}
            >
              ({file.type})
            </Text>
          </Box>
          <ButtonBase
            aria-label={\`remove \${file.name} file\`}
            onClick={removeFile}
            style={{
              display: 'inline-flex',
              borderRadius: '50%',
              padding: '4px'
            }}
          >
            <TrashcanIcon color="gray-500" />
          </ButtonBase>
        </Box>
      )}
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const BasicMultiple: Story = {
  render: () => <BasicMultipleTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BasicMultipleTemplate = () => {
  const [files, setFiles] = useState<Array<File>>([]);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFiles: Array<File>
  ) => {
    setFiles(newFiles);
  };
  const removeFile = (idxToDelete: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== idxToDelete));
  };

  return (
    <Stack
      spacing={20}
      style={{
        alignItems: 'center',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <FileInput multiple value={files} onChange={updateFile}>
        <Button tabIndex={-1}>Choose File</Button>
      </FileInput>
      <Stack spacing={10} style={{ alignSelf: 'stretch' }}>
        {files.map((file, idx) => (
          <Box
            key={\`\${file.name}/\${idx}\`}
            elevation={3}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 20px',
              width: '100%',
              borderRadius: '4px'
            }}
          >
            <Box>
              <Text className="typo-title-medium" noMargin>
                {file.name}
              </Text>
              <Text
                className="typo-label-medium"
                noMargin
                style={{ marginTop: '5px', color: 'gray-500' }}
              >
                {addByteUnit(file.size)}
              </Text>
              <Text
                className="typo-label-small"
                noMargin
                style={{ color: 'gray-400' }}
              >
                ({file.type})
              </Text>
            </Box>
            <ButtonBase
              aria-label={\`remove \${file.name} file\`}
              onClick={() => removeFile(idx)}
              style={{
                display: 'inline-flex',
                borderRadius: '50%',
                padding: '4px'
              }}
            >
              <TrashcanIcon color="gray-500" />
            </ButtonBase>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const RemoveDuplicatedFiles: Story = {
  render: () => <DeduplicatedFilesTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DeduplicatedFilesTemplate = () => {
  const [files, setFiles] = useState<Array<File>>([]);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFiles: Array<File>
  ) => {
    const fileNameSet = new Set(newFiles.map((file) => file.name));
    const deduplicatedFiles: Array<File> = [];
    newFiles.forEach((file) => {
      if (fileNameSet.has(file.name)) {
        deduplicatedFiles.push(file);
        fileNameSet.delete(file.name);
      }
    });
    setFiles(deduplicatedFiles);
  };
  const removeFile = (idxToDelete: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== idxToDelete));
  };

  return (
    <Stack
      spacing={20}
      style={{
        alignItems: 'center',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <FileInput multiple value={files} onChange={updateFile}>
        <Button tabIndex={-1}>Choose File</Button>
      </FileInput>
      <Stack spacing={10} style={{ alignSelf: 'stretch' }}>
        {files.map((file, idx) => (
          <Box
            key={\`\${file.name}/\${idx}\`}
            elevation={3}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 20px',
              width: '100%',
              borderRadius: '4px'
            }}
          >
            <Box>
              <Text className="typo-title-medium" noMargin>
                {file.name}
              </Text>
              <Text
                className="typo-label-medium"
                noMargin
                style={{ marginTop: '5px', color: 'gray-500' }}
              >
                {addByteUnit(file.size)}
              </Text>
              <Text
                className="typo-label-small"
                noMargin
                style={{ color: 'gray-400' }}
              >
                ({file.type})
              </Text>
            </Box>
            <ButtonBase
              aria-label={\`remove \${file.name} file\`}
              onClick={() => removeFile(idx)}
              style={{
                display: 'inline-flex',
                borderRadius: '50%',
                padding: '4px'
              }}
            >
              <TrashcanIcon color="gray-500" />
            </ButtonBase>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const BasicAccept: Story = {
  render: () => <BasicAcceptTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BasicAcceptTemplate = () => {
  const [file, setFile] = useState<File | null>(null);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFile: File | null
  ) => {
    setFile(newFile);
  };
  const removeFile = () => {
    setFile(null);
  };

  return (
    <Stack
      spacing={20}
      style={{
        alignItems: 'center',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <FileInput accept=".pdf" value={file} onChange={updateFile}>
        <Button tabIndex={-1}>Choose File</Button>
      </FileInput>
      {file && (
        <Box
          elevation={3}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            width: '100%',
            borderRadius: '4px'
          }}
        >
          <Box>
            <Text className="typo-title-medium" noMargin>
              {file.name}
            </Text>
            <Text
              className="typo-label-medium"
              noMargin
              style={{ marginTop: '5px', color: 'gray-500' }}
            >
              {addByteUnit(file.size)}
            </Text>
            <Text
              className="typo-label-small"
              noMargin
              style={{ color: 'gray-400' }}
            >
              ({file.type})
            </Text>
          </Box>
          <ButtonBase
            aria-label={\`remove \${file.name} file\`}
            onClick={removeFile}
            style={{
              display: 'inline-flex',
              borderRadius: '50%',
              padding: '4px'
            }}
          >
            <TrashcanIcon color="gray-500" />
          </ButtonBase>
        </Box>
      )}
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const AcceptValidation: Story = {
  render: () => <ValidateAcceptTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ValidateAcceptTemplate = () => {
  const acceptTypes = ['image/png', 'image/jpeg'];
  const acceptTypesString = acceptTypes.join(',');
  const [file, setFile] = useState<File | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFile: File | null
  ) => {
    if (newFile) {
      const isNotValidType = !acceptTypes.includes(newFile.type);
      if (isNotValidType) {
        setToastMessage(
          \`파일 유형이 올바르지 않습니다. (가능한 파일 유형: \${acceptTypesString})\`
        );
        return;
      }
    }
    setFile(newFile);
  };
  const removeFile = () => {
    setFile(null);
  };
  const closeToast = () => {
    setToastMessage(null);
  };

  return (
    <>
      <Stack
        spacing={20}
        style={{
          alignItems: 'center',
          minWidth: '300px',
          maxWidth: '400px'
        }}
      >
        <FileInput
          accept={acceptTypesString}
          value={file}
          onChange={updateFile}
        >
          <Button tabIndex={-1}>Choose File</Button>
        </FileInput>
        {file && (
          <Box
            elevation={3}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 20px',
              width: '100%',
              borderRadius: '4px'
            }}
          >
            <Box>
              <Text className="typo-title-medium" noMargin>
                {file.name}
              </Text>
              <Text
                className="typo-label-medium"
                noMargin
                style={{ marginTop: '5px', color: 'gray-500' }}
              >
                {addByteUnit(file.size)}
              </Text>
              <Text
                className="typo-label-small"
                noMargin
                style={{ color: 'gray-400' }}
              >
                ({file.type})
              </Text>
            </Box>
            <ButtonBase
              aria-label={\`remove \${file.name} file\`}
              onClick={removeFile}
              style={{
                display: 'inline-flex',
                borderRadius: '50%',
                padding: '4px'
              }}
            >
              <TrashcanIcon color="gray-500" />
            </ButtonBase>
          </Box>
        )}
      </Stack>
      <Toast
        open={!!toastMessage}
        onClose={closeToast}
        message={toastMessage}
        autoHideDuration={3}
      />
    </>
  );
};`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: () => <DisabledTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DisabledTemplate = () => {
  const [file, setFile] = useState<File | null>(null);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFile: File | null
  ) => {
    setFile(newFile);
  };
  const removeFile = () => {
    setFile(null);
  };

  return (
    <Stack
      spacing={20}
      style={{
        alignItems: 'center',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <FileInput value={file} onChange={updateFile} disabled>
        <Button tabIndex={-1} disabled>Choose File</Button>
      </FileInput>
      {file && (
        <Box
          elevation={3}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            width: '100%',
            borderRadius: '4px'
          }}
        >
          <Box>
            <Text className="typo-title-medium" noMargin>
              {file.name}
            </Text>
            <Text
              className="typo-label-medium"
              noMargin
              style={{ marginTop: '5px', color: 'gray-500' }}
            >
              {addByteUnit(file.size)}
            </Text>
            <Text
              className="typo-label-small"
              noMargin
              style={{ color: 'gray-400' }}
            >
              ({file.type})
            </Text>
          </Box>
          <ButtonBase
            aria-label={\`remove \${file.name} file\`}
            onClick={removeFile}
            style={{
              display: 'inline-flex',
              borderRadius: '50%',
              padding: '4px'
            }}
          >
            <TrashcanIcon color="gray-500" />
          </ButtonBase>
        </Box>
      )}
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const MaxFileSize: Story = {
  render: () => <MaxFileSizeTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const MaxFileSizeTemplate = () => {
  const MAX_FILE_SIZE = 50000;
  const [file, setFile] = useState<File | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFile: File | null
  ) => {
    if (newFile && newFile.size > MAX_FILE_SIZE) {
      setToastMessage(
        \`최대 파일 크기(50KB)를 초과했습니다. (파일 크기: \${addByteUnit(newFile.size)})\`
      );
      return;
    }
    setFile(newFile);
  };
  const removeFile = () => {
    setFile(null);
  };
  const closeToast = () => {
    setToastMessage(null);
  };

  return (
    <>
      <Stack
        spacing={20}
        style={{
          alignItems: 'center',
          minWidth: '300px',
          maxWidth: '400px'
        }}
      >
        <FileInput value={file} onChange={updateFile}>
          <Button tabIndex={-1}>Choose File</Button>
        </FileInput>
        {file && (
          <Box
            elevation={3}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 20px',
              width: '100%',
              borderRadius: '4px'
            }}
          >
            <Box>
              <Text className="typo-title-medium" noMargin>
                {file.name}
              </Text>
              <Text
                className="typo-label-medium"
                noMargin
                style={{ marginTop: '5px', color: 'gray-500' }}
              >
                {addByteUnit(file.size)}
              </Text>
              <Text
                className="typo-label-small"
                noMargin
                style={{ color: 'gray-400' }}
              >
                ({file.type})
              </Text>
            </Box>
            <ButtonBase
              aria-label={\`remove \${file.name} file\`}
              onClick={removeFile}
              style={{
                display: 'inline-flex',
                borderRadius: '50%',
                padding: '4px'
              }}
            >
              <TrashcanIcon color="gray-500" />
            </ButtonBase>
          </Box>
        )}
      </Stack>
      <Toast
        open={!!toastMessage}
        onClose={closeToast}
        message={toastMessage}
        autoHideDuration={3}
      />
    </>
  );
};`.trim()
      }
    }
  }
};

export const MaxFiles: Story = {
  render: () => <MaxFilesTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const MaxFilesTemplate = () => {
  const MAX_FILES = 3;
  const [files, setFiles] = useState<Array<File>>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFiles: Array<File>
  ) => {
    if (newFiles.length > MAX_FILES) {
      setToastMessage('최대 업로드 파일 수(3개)를 초과했습니다.');
      return;
    }
    setFiles(newFiles);
  };
  const removeFile = (idxToDelete: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== idxToDelete));
  };
  const closeToast = () => {
    setToastMessage(null);
  };

  return (
    <>
      <Stack
        spacing={20}
        style={{
          alignItems: 'center',
          minWidth: '300px',
          maxWidth: '400px'
        }}
      >
        <FileInput multiple value={files} onChange={updateFile}>
          <Button tabIndex={-1}>Choose File</Button>
        </FileInput>
        <Stack spacing={10} style={{ alignSelf: 'stretch' }}>
          {files.map((file, idx) => (
            <Box
              key={\`\${file.name}/\${idx}\`}
              elevation={3}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 20px',
                width: '100%',
                borderRadius: '4px'
              }}
            >
              <Box>
                <Text className="typo-title-medium" noMargin>
                  {file.name}
                </Text>
                <Text
                  className="typo-label-medium"
                  noMargin
                  style={{ marginTop: '5px', color: 'gray-500' }}
                >
                  {addByteUnit(file.size)}
                </Text>
                <Text
                  className="typo-label-small"
                  noMargin
                  style={{ color: 'gray-400' }}
                >
                  ({file.type})
                </Text>
              </Box>
              <ButtonBase
                aria-label={\`remove \${file.name} file\`}
                onClick={() => removeFile(idx)}
                style={{
                  display: 'inline-flex',
                  borderRadius: '50%',
                  padding: '4px'
                }}
              >
                <TrashcanIcon color="gray-500" />
              </ButtonBase>
            </Box>
          ))}
        </Stack>
      </Stack>
      <Toast
        open={!!toastMessage}
        onClose={closeToast}
        message={toastMessage}
        autoHideDuration={3}
      />
    </>
  );
};`.trim()
      }
    }
  }
};

export const FileInputWithForm: Story = {
  render: () => <FileInputWithFormTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const FileInputWithFormTemplate = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFile: File | null
  ) => {
    setFile(newFile);
  };
  const removeFile = () => {
    setFile(null);
  };
  const closeToast = () => {
    setToastMessage(null);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setToastMessage('업로드할 파일이 없습니다.');
      return;
    }
    // file state를 사용해 서버로 파일 전송
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage('파일이 업로드 되었습니다.');
    }, 2000);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={20}
          style={{
            alignItems: 'center',
            minWidth: '300px',
            maxWidth: '400px'
          }}
        >
          <Stack direction="row" spacing={20}>
            <FileInput value={file} onChange={updateFile}>
              <Button
                type="button"
                startAdornment={<AddIcon color="white" />}
                disabled={isSubmitting}
                tabIndex={-1}
              >
                Choose File
              </Button>
            </FileInput>
            <Button
              type="submit"
              variant="outlined"
              startAdornment={
                isSubmitting ? (
                  <CircularProgress color="primary" />
                ) : (
                  <FileUploadIcon color="primary" />
                )
              }
              disabled={isSubmitting}
            >
              Upload File
            </Button>
          </Stack>
          {file && (
            <Box
              elevation={3}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 20px',
                width: '100%',
                borderRadius: '4px'
              }}
            >
              <Box>
                <Text className="typo-title-medium" noMargin>
                  {file.name}
                </Text>
                <Text
                  className="typo-label-medium"
                  noMargin
                  style={{ marginTop: '5px', color: 'gray-500' }}
                >
                  {addByteUnit(file.size)}
                </Text>
                <Text
                  className="typo-label-small"
                  noMargin
                  style={{ color: 'gray-400' }}
                >
                  ({file.type})
                </Text>
              </Box>
              <ButtonBase
                aria-label={\`remove \${file.name} file\`}
                onClick={removeFile}
                style={{
                  display: 'inline-flex',
                  borderRadius: '50%',
                  padding: '4px'
                }}
              >
                <TrashcanIcon color="gray-500" />
              </ButtonBase>
            </Box>
          )}
        </Stack>
      </form>
       <Toast
        open={!!toastMessage}
        onClose={closeToast}
        message={toastMessage}
        autoHideDuration={3}
      />
    </>
  );
};`.trim()
      }
    }
  }
};

export const FileInputWithPreviewImage: Story = {
  render: () => <FileInputWithPreviewImageTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const FileInputWithPreviewImageTemplate = () => {
  const [files, setFiles] = useState<Array<File>>([]);
  const [dataUrlArr, setDataUrlArr] = useState<Array<string>>([]);

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
  const updateFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    newFiles: Array<File>
  ) => {
    setFiles(newFiles);

    const { files } = e.target;
    if (files) {
      const addedFiles = [...files];
      Promise.all(addedFiles.map((file) => fileToDataUrl(file))).then(
        (dataUrlArr) => {
          setDataUrlArr((prev) => [...prev, ...dataUrlArr]);
        }
      );
    }
  };
  const removeFile = (idxToDelete: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== idxToDelete));
    setDataUrlArr((prev) => prev.filter((_, idx) => idx !== idxToDelete));
  };

  return (
    <Stack
      spacing={20}
      style={{
        alignItems: 'center',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <FileInput accept="image/*" multiple value={files} onChange={updateFile}>
        <Button tabIndex={-1}>Choose File</Button>
      </FileInput>
      <Stack spacing={10} style={{ alignSelf: 'stretch' }}>
        {files.map((file, idx) => (
          <Box
            key={\`\${file.name}/\${idx}\`}
            elevation={3}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 20px',
              width: '100%',
              borderRadius: '4px'
            }}
          >
            <Stack
              direction="row"
              spacing={20}
              style={{ alignItems: 'center' }}
            >
              <img
                src={dataUrlArr[idx]}
                alt={file.name}
                width={50}
                height={50}
                style={{ objectFit: 'contain', borderRadius: '4px' }}
              />
              <Box>
                <Text className="typo-title-medium" noMargin>
                  {file.name}
                </Text>
                <Text
                  className="typo-label-medium"
                  noMargin
                  style={{ marginTop: '5px', color: 'gray-500' }}
                >
                  {addByteUnit(file.size)}
                </Text>
                <Text
                  className="typo-label-small"
                  noMargin
                  style={{ color: 'gray-400' }}
                >
                  ({file.type})
                </Text>
              </Box>
            </Stack>
            <ButtonBase
              aria-label={\`remove \${file.name} file\`}
              onClick={() => removeFile(idx)}
              style={{
                display: 'inline-flex',
                borderRadius: '50%',
                padding: '4px'
              }}
            >
              <TrashcanIcon color="gray-500" />
            </ButtonBase>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const DragAndDrop: Story = {
  render: () => <DragAndDropTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DragAndDropTemplate = () => {
  const [files, setFiles] = useState<Array<File>>([]);
  const boxElRef = useRef<HTMLElement>(null);

  const updateFile = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFiles: Array<File>
  ) => {
    setFiles(newFiles);
  };
  const removeFile = (idxToDelete: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== idxToDelete));
  };
  const handleDragEnter = () => {
    const boxEl = boxElRef.current;
    if (!boxEl) return;
    boxEl.style.backgroundColor = 'gray';
  };
  const handleDrop = () => {
    const boxEl = boxElRef.current;
    if (!boxEl) return;
    boxEl.style.backgroundColor = 'lightgray';
  };

  return (
    <Stack
      spacing={20}
      style={{
        alignItems: 'center',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <FileInput
        multiple
        value={files}
        onChange={updateFile}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
      >
        <Box
          ref={boxElRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '500px',
            height: '300px',
            border: '1px dashed gray',
            borderRadius: '4px',
            backgroundColor: 'lightgray'
          }}
        >
          Click or drag file to this area
        </Box>
      </FileInput>
      <Stack spacing={10} style={{ alignSelf: 'stretch' }}>
        {files.map((file, idx) => (
          <Box
            key={\`\${file.name}/\${idx}\`}
            elevation={3}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 20px',
              width: '100%',
              borderRadius: '4px'
            }}
          >
            <Box>
              <Text className="typo-title-medium" noMargin>
                {file.name}
              </Text>
              <Text
                className="typo-label-medium"
                noMargin
                style={{ marginTop: '5px', color: 'gray-500' }}
              >
                {addByteUnit(file.size)}
              </Text>
              <Text
                className="typo-label-small"
                noMargin
                style={{ color: 'gray-400' }}
              >
                ({file.type})
              </Text>
            </Box>
            <ButtonBase
              aria-label={\`remove \${file.name} file\`}
              onClick={() => removeFile(idx)}
              style={{
                display: 'inline-flex',
                borderRadius: '50%',
                padding: '4px'
              }}
            >
              <TrashcanIcon color="gray-500" />
            </ButtonBase>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};`.trim()
      }
    }
  }
};
