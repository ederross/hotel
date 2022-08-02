import * as MuiIcons from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../store/types';

interface IIconImportDynamically {
  iconName: number;
  size?: number;
  color?: string;
}

export const IconImportDynamically = ({
  iconName,
  size,
  color,
}: IIconImportDynamically) => {
  const {
    domain: { iconsDomain },
  } = useSelector((state: AppStore) => state);

  const findIconValue = iconsDomain.data.find(
    (i) => i.domainItemCode === iconName
  )?.domainItemValue;

  const Icon =
    MuiIcons[
      findIconValue
        ? findIconValue
        : ('HelpCenterOutlined' as keyof typeof MuiIcons)
    ];

  return <Icon style={{ fontSize: size, color: color }} />;
};
