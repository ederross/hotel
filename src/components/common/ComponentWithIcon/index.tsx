import * as MuiIcons from '@mui/icons-material';

export const IconImportDynamically = ({ iconName, size }) => {
  const Icon = MuiIcons[iconName as keyof typeof MuiIcons];
  const DefaultIcon = MuiIcons['HelpCenterOutlined' as keyof typeof MuiIcons];

  return Icon ? (
    <Icon style={{ fontSize: size }} />
  ) : (
    <DefaultIcon style={{ fontSize: size }} />
  );
};
