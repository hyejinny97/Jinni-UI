import './FormatSelect.scss';
import {
  Select,
  Option,
  OptionValueType
} from '@/components/data-entry/Select';
import { useColorBoxContext } from '../ColorBox.hooks';
import { FORMAT } from '../ColorBox.constants';

const FormatSelect = () => {
  const { format, changeFormat } = useColorBoxContext();

  const handleFormatChange = (
    _: Event | React.SyntheticEvent,
    newFormat: OptionValueType
  ) => {
    changeFormat(newFormat as (typeof FORMAT)[number]);
  };

  return (
    <Select
      className="JinniColorBoxFormatSelect"
      value={format}
      onChange={handleFormatChange}
      size="sm"
      variant="borderless"
      MenuProps={{
        MenuListProps: { dense: true },
        style: { minWidth: 'auto' }
      }}
    >
      {FORMAT.map((val) => (
        <Option key={val} value={val} style={{ textAlign: 'center' }}>
          {val}
        </Option>
      ))}
    </Select>
  );
};

export default FormatSelect;
