"use client";
import React from 'react';
import { Layout } from 'antd';
import Navbar from './Navbar';

const { Content } = Layout;

export default function DefaultLayout({ children }: { children: React.ReactNode }) {

  return (
    <Layout>
      <Navbar />
      <Content style={{ marginBottom: 40 }}>
        <div>
          {children}
        </div>
      </Content>
    </Layout>
  );
};
