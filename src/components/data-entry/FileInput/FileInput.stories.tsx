import { FormEvent, useState, useRef, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FileInput, { FileInputProps } from './FileInput';
import { Button } from '@/components/general/Button';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { ButtonBase } from '@/components/general/ButtonBase';
import { TrashcanIcon } from '@/components/icons/TrashcanIcon';
import { AddIcon } from '@/components/icons/AddIcon';
import { FileUploadIcon } from '@/components/icons/FileUploadIcon';
import { Divider } from '@/components/layout/Divider';
import { Toast } from '@/components/feedback/Toast';
import { CircularProgress } from '@/components/feedback/CircularProgress';

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
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    multiple: {
      description: 'true이면, 2개 이상의 파일을 받을 수 있음 ',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
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

const FileBox = ({
  file,
  imageUrl,
  disabled,
  onDelete
}: {
  file: File;
  imageUrl?: string;
  disabled?: boolean;
  onDelete: () => void;
}) => {
  return (
    <Box
      elevation={3}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        borderRadius: '4px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            width={50}
            height={50}
            style={{ objectFit: 'contain', borderRadius: '4px' }}
          />
        )}
        <Box>
          <Text className="typo-title-medium" style={{ margin: 0 }}>
            {file.name}
          </Text>
          <Text
            className="typo-label-medium"
            style={{ margin: '5px 0 0', color: 'gray-500' }}
          >
            {addByteUnit(file.size)}
          </Text>
          <Text
            className="typo-label-small"
            style={{ margin: 0, color: 'gray-400' }}
          >
            ({file.type})
          </Text>
        </Box>
      </div>
      <ButtonBase
        onClick={onDelete}
        disabled={disabled}
        style={{ display: 'inline-flex', borderRadius: '50%', padding: '4px' }}
      >
        <TrashcanIcon color="gray-500" />
      </ButtonBase>
    </Box>
  );
};

const FileInputTemplate = ({ children, ...props }: Partial<FileInputProps>) => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFile: File | null
  ) => {
    setFile(newFile);
  };
  const handleDelete = () => {
    setFile(null);
  };

  return (
    <div
      style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <FileInput value={file} onChange={handleChange} {...props}>
        {children || <Button>Choose File</Button>}
      </FileInput>
      {file && <FileBox file={file} onDelete={handleDelete} />}
    </div>
  );
};

const FileInputWithFormTemplate = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState(false);
  const toastMessageRef = useRef<string>('');

  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFile: File | null
  ) => {
    setFile(newFile);
  };
  const handleDelete = () => {
    setFile(null);
  };
  const handleToastClose = () => {
    setOpenToast(false);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      toastMessageRef.current = '업로드할 파일이 없습니다.';
      setOpenToast(true);
      return;
    }
    // file state를 사용해 서버로 파일 전송
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toastMessageRef.current = '파일이 업로드 되었습니다.';
      setOpenToast(true);
    }, 2000);
  };

  return (
    <>
      <form
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '20px',
          minWidth: '300px',
          maxWidth: '400px'
        }}
        onSubmit={handleSubmit}
      >
        <Stack direction="row" spacing={20}>
          <FileInput
            value={file}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <Button
              type="button"
              startAdornment={<AddIcon color="white" />}
              disabled={isSubmitting}
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
          <FileBox
            file={file}
            disabled={isSubmitting}
            onDelete={handleDelete}
          />
        )}
      </form>
      <Toast
        open={openToast}
        onClose={handleToastClose}
        message={toastMessageRef.current}
        autoHideDuration={3}
      />
    </>
  );
};

const MaxFileSizeTemplate = ({ children }: { children?: React.ReactNode }) => {
  const MAX_FILE_SIZE = 50000;
  const [file, setFile] = useState<File | null>(null);
  const [openToast, setOpenToast] = useState(false);
  const toastMessageRef = useRef<string>('');

  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFile: File | null
  ) => {
    if (newFile && newFile.size > MAX_FILE_SIZE) {
      toastMessageRef.current = `최대 파일 크기(50KB)를 초과했습니다. (파일 크기: ${addByteUnit(newFile.size)})`;
      setOpenToast(true);
      return;
    }
    setFile(newFile);
  };
  const handleDelete = () => {
    setFile(null);
  };
  const handleToastClose = () => {
    setOpenToast(false);
  };

  return (
    <>
      <div
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '20px',
          minWidth: '300px',
          maxWidth: '400px'
        }}
      >
        <FileInput value={file} onChange={handleChange}>
          {children || <Button>Choose File</Button>}
        </FileInput>
        {file && <FileBox file={file} onDelete={handleDelete} />}
      </div>
      <Toast
        open={openToast}
        onClose={handleToastClose}
        message={toastMessageRef.current}
        autoHideDuration={3}
      />
    </>
  );
};

const MultipleFileInputTemplate = () => {
  const [files, setFiles] = useState<Array<File>>([]);

  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFiles: Array<File>
  ) => {
    setFiles(newFiles);
  };
  const handleDelete = (idxToDelete: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== idxToDelete));
  };

  return (
    <div
      style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <FileInput multiple value={files} onChange={handleChange}>
        <Button>Choose File</Button>
      </FileInput>
      <Stack spacing={10}>
        {files.map((file, idx) => (
          <FileBox
            key={`${file.name}/${idx}`}
            file={file}
            onDelete={() => handleDelete(idx)}
          />
        ))}
      </Stack>
    </div>
  );
};

const MultipleFileInputWithFormTemplate = () => {
  const [files, setFiles] = useState<Array<File>>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState(false);
  const toastMessageRef = useRef<string>('');

  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFiles: Array<File>
  ) => {
    setFiles(newFiles);
  };
  const handleDelete = (idxToDelete: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== idxToDelete));
  };
  const handleToastClose = () => {
    setOpenToast(false);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      toastMessageRef.current = '업로드할 파일이 없습니다.';
      setOpenToast(true);
      return;
    }
    // files state를 사용해 서버로 파일 전송
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toastMessageRef.current = '파일이 업로드 되었습니다.';
      setOpenToast(true);
    }, 2000);
  };

  return (
    <>
      <form
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '20px',
          minWidth: '300px',
          maxWidth: '400px'
        }}
        onSubmit={handleSubmit}
      >
        <Stack direction="row" spacing={20}>
          <FileInput
            multiple
            value={files}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <Button
              type="button"
              startAdornment={<AddIcon color="white" />}
              disabled={isSubmitting}
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
        <Stack spacing={10}>
          {files.map((file, idx) => (
            <FileBox
              key={`${file.name}/${idx}`}
              file={file}
              onDelete={() => handleDelete(idx)}
              disabled={isSubmitting}
            />
          ))}
        </Stack>
      </form>
      <Toast
        open={openToast}
        onClose={handleToastClose}
        message={toastMessageRef.current}
        autoHideDuration={3}
      />
    </>
  );
};

const DeduplicatedFilesTemplate = () => {
  const [files, setFiles] = useState<Array<File>>([]);

  const handleChange = (
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
  const handleDelete = (idxToDelete: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== idxToDelete));
  };

  return (
    <div
      style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <FileInput multiple value={files} onChange={handleChange}>
        <Button>Choose File</Button>
      </FileInput>
      <Stack spacing={10}>
        {files.map((file, idx) => (
          <FileBox
            key={`${file.name}/${idx}`}
            file={file}
            onDelete={() => handleDelete(idx)}
          />
        ))}
      </Stack>
    </div>
  );
};

const MaxFilesTemplate = () => {
  const MAX_FILES = 3;
  const [files, setFiles] = useState<Array<File>>([]);
  const [openToast, setOpenToast] = useState(false);
  const toastMessageRef = useRef<string>('');

  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFiles: Array<File>
  ) => {
    if (newFiles.length > MAX_FILES) {
      toastMessageRef.current = '최대 업로드 파일 수(3개)를 초과했습니다.';
      setOpenToast(true);
      return;
    }
    setFiles(newFiles);
  };
  const handleDelete = (idxToDelete: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== idxToDelete));
  };
  const handleToastClose = () => {
    setOpenToast(false);
  };

  return (
    <>
      <div
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '20px',
          minWidth: '300px',
          maxWidth: '400px'
        }}
      >
        <FileInput multiple value={files} onChange={handleChange}>
          <Button>Choose File</Button>
        </FileInput>
        <Stack spacing={10}>
          {files.map((file, idx) => (
            <FileBox
              key={`${file.name}/${idx}`}
              file={file}
              onDelete={() => handleDelete(idx)}
            />
          ))}
        </Stack>
      </div>
      <Toast
        open={openToast}
        onClose={handleToastClose}
        message={toastMessageRef.current}
        autoHideDuration={3}
      />
    </>
  );
};

const ValidateAcceptTemplate = () => {
  const acceptTypes = ['image/png', 'image/jpeg'];
  const acceptTypesString = acceptTypes.join(',');
  const [file, setFile] = useState<File | null>(null);
  const [openToast, setOpenToast] = useState(false);
  const toastMessageRef = useRef<string>('');

  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFile: File | null
  ) => {
    if (newFile) {
      const isNotValidType = !acceptTypes.includes(newFile.type);
      if (isNotValidType) {
        toastMessageRef.current = `파일 유형이 올바르지 않습니다. (가능한 파일 유형: ${acceptTypesString})`;
        setOpenToast(true);
        return;
      }
    }
    setFile(newFile);
  };
  const handleDelete = () => {
    setFile(null);
  };
  const handleToastClose = () => {
    setOpenToast(false);
  };

  return (
    <>
      <div
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '20px',
          minWidth: '300px',
          maxWidth: '400px'
        }}
      >
        <FileInput
          accept={acceptTypesString}
          value={file}
          onChange={handleChange}
        >
          <Button>Choose File</Button>
        </FileInput>
        {file && <FileBox file={file} onDelete={handleDelete} />}
      </div>
      <Toast
        open={openToast}
        onClose={handleToastClose}
        message={toastMessageRef.current}
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

  const handleChange = (
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
  const handleDelete = (idxToDelete: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== idxToDelete));
    setDataUrlArr((prev) => prev.filter((_, idx) => idx !== idxToDelete));
  };

  return (
    <div
      style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <FileInput
        accept="image/*"
        multiple
        value={files}
        onChange={handleChange}
      >
        <Button>Choose File</Button>
      </FileInput>
      <Stack spacing={10}>
        {files.map((file, idx) => (
          <FileBox
            key={`${file.name}/${idx}`}
            file={file}
            imageUrl={dataUrlArr[idx]}
            onDelete={() => handleDelete(idx)}
          />
        ))}
      </Stack>
    </div>
  );
};

const DragAndDropTemplate = () => {
  const [files, setFiles] = useState<Array<File>>([]);
  const boxElRef = useRef<HTMLElement>(null);

  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    newFiles: Array<File>
  ) => {
    setFiles(newFiles);
  };
  const handleDelete = (idxToDelete: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== idxToDelete));
  };

  useEffect(() => {
    const boxEl = boxElRef.current;
    if (!boxEl) return;

    const handleDragEnter = () => {
      boxEl.style.backgroundColor = 'gray';
    };
    const handleDrop = () => {
      boxEl.style.backgroundColor = 'lightgray';
    };

    boxEl.addEventListener('dragenter', handleDragEnter);
    boxEl.addEventListener('drop', handleDrop);
    return () => {
      boxEl.removeEventListener('dragenter', handleDragEnter);
      boxEl.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
    <div
      style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <FileInput multiple value={files} onChange={handleChange}>
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
      <Stack spacing={10}>
        {files.map((file, idx) => (
          <FileBox
            key={`${file.name}/${idx}`}
            file={file}
            onDelete={() => handleDelete(idx)}
          />
        ))}
      </Stack>
    </div>
  );
};

export const VariousFileInputAppearances: Story = {
  render: () => (
    <Stack spacing={20} divider={<Divider orientation="horizontal" />}>
      <FileInputTemplate />
      <FileInputTemplate>
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
      </FileInputTemplate>
      <FileInputTemplate>
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
      </FileInputTemplate>
    </Stack>
  )
};

export const FileInputWithForm: Story = {
  render: () => <FileInputWithFormTemplate />
};

export const MaxFileSize: Story = {
  render: () => <MaxFileSizeTemplate />
};

export const MultipleDefault: Story = {
  render: () => <MultipleFileInputTemplate />
};

export const MultipleFileInputWithForm: Story = {
  render: () => <MultipleFileInputWithFormTemplate />
};

export const RemoveDuplicatedFiles: Story = {
  render: () => <DeduplicatedFilesTemplate />
};

export const MaxFiles: Story = {
  render: () => <MaxFilesTemplate />
};

export const AcceptDefault: Story = {
  render: () => <FileInputTemplate accept=".pdf" />
};

export const AcceptValidation: Story = {
  render: () => <ValidateAcceptTemplate />
};

export const FileInputWithPreviewImage: Story = {
  render: () => <FileInputWithPreviewImageTemplate />
};

export const DragAndDrop: Story = {
  render: () => <DragAndDropTemplate />
};

export const Disabled: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <FileInputTemplate disabled>
        <Button disabled>Choose File</Button>
      </FileInputTemplate>
      <FileInputTemplate disabled>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100px',
            height: '100px',
            border: '1px dashed lightgray',
            borderRadius: '4px',
            backgroundColor: 'gray-100',
            opacity: 0.5
          }}
        >
          Choose File
        </Box>
      </FileInputTemplate>
    </Stack>
  )
};
