import { Flex as AntdFlex } from 'antd';

const Flex = ({flexProps, children}) => {
  return (
    <AntdFlex {...flexProps}>{children}</AntdFlex>
  );
};

export default Flex;