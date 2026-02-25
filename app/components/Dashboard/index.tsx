"use client";
import React, { useState } from "react";
import { Modal, message, Tooltip } from "antd";
import { QRCodeSVG } from "qrcode.react";
import { HERO_HEADING_DASHBOARD, HERO_SUBTEXT, SHORTEN, YOU_CAN_CREATE_MORE_LINKS, YOU_CAN_CREATE_MORE_LINKS_TOOLTIP } from "@/app/constants";
import { Container, Typography, Input, Button, ToolTip, Flex, Table } from "../common";
import { CircleQuestionMark, Trash2, Copy, Share2, QrCode } from "lucide-react";
import { useUrlShortener, useUrlHistory, useDeleteUrl, useCurrentUser } from "@/app/Services";

interface UrlItem {
  id: string;
  original_url: string;
  short_url: string;
  clicks: number;
  created_at: string;
}

export default function Dashboard() {
  const { data: historyData, refetch: refetchHistory } = useUrlHistory();
  const { data: user, isLoading } = useCurrentUser();

  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const shortenerHandler = useUrlShortener({
    mutationConfig: {
      onSuccess: () => {
        refetchHistory();
      },
      onError: (err: Error) => {
        console.error("Shorten error:", err);
      },
    },
  });

  const deleteHandler = useDeleteUrl({
    mutationConfig: {
      onSuccess: () => {
        refetchHistory();
      },
      onError: (err: Error) => {
        console.error("Delete error:", err);
      },
    },
  });

  function handleShortenUrl(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const original_url = formData.get("original_url") as string;

    if (original_url) {
      shortenerHandler.mutate({
        data: {
          original_url,
        },
      });
      e.currentTarget.reset();
    }
  }

  const handleDelete = (shortCode: string) => {
    deleteHandler.mutate(shortCode);
  };


  const handleCopy = (shortCode: string) => {
    const url = shortCode;
    navigator.clipboard.writeText(url).then(() => {
      messageApi.success("Short URL copied to clipboard!");
    });
  };

  const handleShare = async (record: UrlItem) => {
    const url = (record.short_url);
    if (navigator.share) {
      try {
        await navigator.share({
          url,
        });
      } catch (err) {
      }
    } else {
      navigator.clipboard.writeText(url).then(() => {
        messageApi.info("Link copied to clipboard (sharing not supported in this browser).");
      });
    }
  };

  const handleQrCode = (shortCode: string) => {
    setQrUrl(shortCode);
    setQrModalOpen(true);
  };

  const columns = [
    {
      title: "Original URL",
      dataIndex: "original_url",
      key: "original_url",
      ellipsis: true,
      render: (original_url: string) => (
        <a
          href={original_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {original_url}
        </a>
      ),
    },
    {
      title: "Short URL",
      dataIndex: "short_url",
      key: "short_url",
      ellipsis: true,
      render: (short_url: string) => (
        <a
          href={short_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {short_url}
        </a>
      ),
    },
    {
      title: "Clicks",
      dataIndex: "clicks",
      key: "clicks",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "action",
      render: (_: unknown, record: UrlItem) => (
        <Flex flexProps={{ gap: 4, align: "center" }}>
          {/* Copy */}
          <Tooltip title="Copy short URL">
            <Button
              buttonProps={{
                type: "text",
                icon: <Copy size={16} />,
                onClick: () => handleCopy(record.short_url),
              }}
            />
          </Tooltip>

          {/* QR Code */}
          <Tooltip title="Show QR Code">
            <Button
              buttonProps={{
                type: "text",
                icon: <QrCode size={16} />,
                onClick: () => handleQrCode(record.short_url),
              }}
            />
          </Tooltip>

          {/* Share */}
          <Tooltip title="Share URL">
            <Button
              buttonProps={{
                type: "text",
                icon: <Share2 size={16} />,
                onClick: () => handleShare(record),
              }}
            />
          </Tooltip>

          {/* Delete */}
          <Tooltip title="Delete">
            <Button
              buttonProps={{
                type: "text",
                danger: true,
                icon: <Trash2 size={16} />,
                onClick: () => handleDelete(record.short_url),
              }}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  const dataSource =
    historyData?.data?.history?.map((item: UrlItem, index: number) => ({
      ...item,
      key: item.id || index,
    })) || [];

  return (
    <>
      {contextHolder}
      <Modal
        open={qrModalOpen}
        onCancel={() => setQrModalOpen(false)}
        footer={null}
        centered
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            padding: "16px 0",
          }}
        >
          {qrUrl && <QRCodeSVG value={qrUrl} size={220} />}
          <p style={{ wordBreak: "break-all", textAlign: "center", color: "#555" }}>
            {qrUrl}
          </p>
        </div>
      </Modal>

      <Container
        width="860px"
        className="h-screen flex flex-col items-center gap-4"
      >
        <Typography typographyProps={{ level: 1 }}>
          {HERO_HEADING_DASHBOARD}
        </Typography>
        <Typography
          typographyProps={{
            level: 5,
            className: "text-center",
          }}
        >
          {HERO_SUBTEXT}
        </Typography>

        <form onSubmit={handleShortenUrl} className="w-full">
          <Input
            inputProps={{
              type: "text",
              placeholder: "Enter your URL",
              className: "w-full",
              name: "original_url",
              size: "large",
              suffix: (
                <Button
                  buttonProps={{
                    type: "primary",
                    size: "large",
                    htmlType: "submit",
                    loading: shortenerHandler.isPending,
                  }}
                >
                  {SHORTEN}
                </Button>
              ),
            }}
            type="input"
          />
        </form>

        {!user && <Flex flexProps={{ gap: 4, justify: "center", align: "center" }}>
          <Typography
            typographyProps={{
              level: 5,
              style: { fontSize: 12, minHeight: "1.2em" },
            }}
          >
            {YOU_CAN_CREATE_MORE_LINKS}
          </Typography>
          <ToolTip
            title={YOU_CAN_CREATE_MORE_LINKS_TOOLTIP}
            placement="top"
            icon={<CircleQuestionMark size={14} />}
          />
        </Flex>}

        <Table columns={columns} dataSource={dataSource} />
      </Container>
    </>
  );
}
