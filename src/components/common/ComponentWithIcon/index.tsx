import * as MuiIcons from '@mui/icons-material';

export const IconImportDynamically = ({ iconName, size}) => {
  const Icon = MuiIcons[iconName as keyof typeof MuiIcons];

  return <Icon style={{fontSize: size }} />;
};
