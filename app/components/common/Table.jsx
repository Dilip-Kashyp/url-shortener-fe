import React from 'react';
import { Table as AntdTable } from 'antd';

const Table = ({columns, dataSource}) => <AntdTable className="w-full" columns={columns} dataSource={dataSource} />;

export default Table;