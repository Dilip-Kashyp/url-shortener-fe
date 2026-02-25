"use client";
import React from 'react';
import {  message } from 'antd';
import { Input, Button, Typography, Flex, Card, Form } from '../common';
import { useLogin } from '../../Services';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DASHBOARD_URL, DONT_HAVE_AN_ACCOUNT, LOGIN, LOGIN_FAILED, LOGIN_SUCCESSFUL, REGISTER_NOW } from '@/app/constants';

const Login: React.FC = () => {
  const router = useRouter();
  
  const { mutate: loginMutation, isPending } = useLogin({
    mutationConfig: {
      onSuccess: () => {
        message.success(LOGIN_SUCCESSFUL);
        router.push(DASHBOARD_URL);
      },
      onError: (error: any) => {
        message.error(error.response?.data?.message || LOGIN_FAILED);
      }
    }
  });

  const onFinish = (values: any) => {
    loginMutation(values);
  };

  const formItem = [
    {
      name: 'email',
      formItemProps: {
        rules: [{ required: true, message: 'Please input your email!' }],
      },
      children: <Input type="text" inputProps={{ placeholder: 'Email' }} />,
    },
    {
      name: 'password',
      formItemProps: {
        rules: [{ required: true, message: 'Please input your password!' }],
      },
      children: <Input type="password"  inputProps={{ placeholder: 'Password' }} />,
    },
    {
      children: <Button buttonProps={{ type: 'primary', htmlType: 'submit', loading: isPending, block: true }}>
        {LOGIN}
      </Button>
    }
  ];

  return (
    <Flex flexProps={{ align: "center", justify: "center", style: { minHeight: '80vh' } }}>
      <Card cardProps={{style: { width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' } }}>
        <Typography typographyProps={{ level: 2, style: { textAlign: 'center', marginBottom: 24 } }}>
          {LOGIN}
        </Typography>
        <Form formProps={{ onFinish }} formItem={formItem} />
        <div style={{ textAlign: 'center' }}>   
          {DONT_HAVE_AN_ACCOUNT} <Link href="/signup" style={{ color: '#1890ff' }}>{REGISTER_NOW}</Link>
        </div>
      </Card>
    </Flex>
  );
};

export default Login;