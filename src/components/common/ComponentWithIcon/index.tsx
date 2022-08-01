import * as MuiIcons from '@mui/icons-material';

interface IIconImportDynamically {
  iconName: string | number;
  size?: number;
  color?: string;
}

export const IconImportDynamically = ({
  iconName,
  size,
  color,
}: IIconImportDynamically) => {
  const Icon = MuiIcons[iconName as keyof typeof MuiIcons];
  const DefaultIcon = MuiIcons['HelpCenterOutlined' as keyof typeof MuiIcons];

  return Icon ? (
    <Icon style={{ fontSize: size, color: color }} />
  ) : (
    <DefaultIcon style={{ fontSize: size }} />
  );
};
