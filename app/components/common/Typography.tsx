"use client";
import { Typography as AntTypography } from "antd";
import type { TitleProps } from "antd/es/typography/Title";

type Props = {
  typographyProps: TitleProps;
  children: React.ReactNode;
};

export default function Typography({
  typographyProps,
  children,
}: Props) {
  return (
    <AntTypography.Title {...typographyProps}>
      {children}
    </AntTypography.Title>
  );
}