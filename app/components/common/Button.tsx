"use client";

import { Button as AntButton } from "antd";
import type { ButtonProps } from "antd";
import React from "react";

type Props = {
  buttonProps?: ButtonProps;
  children?: React.ReactNode;
};

export default function Button({
  buttonProps,
  children,
}: Props) {
  return (
    <AntButton {...buttonProps}>
      {children ?? buttonProps?.children}
    </AntButton>
  );
}