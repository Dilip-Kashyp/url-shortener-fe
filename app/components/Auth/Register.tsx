"use client";

import React from 'react';
import { Input, Button, Typography, Flex, Card, Form, Notification } from '../common';
import { useRegister } from '../../Services';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ALREADY_HAVE_AN_ACCOUNT, LOGIN, REGISTER, REGISTRATION_SUCCESSFUL, REGISTRATION_FAILED, LOGIN_URL } from '@/app/constants';

const Register: React.FC = () => {
  const router = useRouter();

  const { mutate: registerMutation, isPending } = useRegister({
    mutationConfig: {
      onSuccess: () => {
        Notification(REGISTRATION_SUCCESSFUL, 'success');
        router.push(LOGIN_URL);
      },
      onError: (error: any) => {
        Notification(error.response?.data?.message || REGISTRATION_FAILED, 'error');
      }
    } 
  });

  const onFinish = (values: any) => {
    registerMutation(values);
  };

  const formItem = [
    {
      name: 'name',
      formItemProps: {
        rules: [{ required: true, message: 'Please input your name!' }],
      },
      children: <Input type="text" inputProps={{ placeholder: 'Name' }} />,
    },
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
      children: <Input type="password" inputProps={{ placeholder: 'Password' }} />,
    },
    {
      children: <Button buttonProps={{ type: 'primary', htmlType: 'submit', loading: isPending, block: true }}>
        {REGISTER}
      </Button>
    }
  ];
  return (
    <Flex flexProps={{ align: "center", justify: "center", style: { minHeight: '80vh' } }}>
      <Card cardProps={{ style: { width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' } }}>
        <Typography typographyProps={{ level: 2, style: { textAlign: 'center', marginBottom: 24 } }}>
          {REGISTER}
        </Typography>
        <Form formProps={{ onFinish }} formItem={formItem} />
        <div style={{ textAlign: 'center' }}>
          {ALREADY_HAVE_AN_ACCOUNT} <Link href="/login" style={{ color: '#1890ff' }}>{LOGIN}</Link>
        </div>
      </Card>
    </Flex>
  );
};

export default Register;
