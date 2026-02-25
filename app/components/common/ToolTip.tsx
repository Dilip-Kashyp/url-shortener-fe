import React from 'react';
import { ConfigProvider, Tooltip } from 'antd';

const SharedButton = ({ title, placement = 'top', icon }: { title: string, placement?: 'top' | 'bottom', icon?: React.ReactNode }) => (
  <Tooltip title={title} placement={placement}>
    {icon}
  </Tooltip>
);

const ToolTip: React.FC<{title: string, placement?: 'top' | 'bottom', icon?: React.ReactNode}> = ({title, placement = 'top', icon}) => {
  return (
    <ConfigProvider
      tooltip={{
        unique: true,   
      }}
    >  
    <SharedButton title={title} placement={placement} icon={icon} />
    </ConfigProvider>
  );
};

export default ToolTip;