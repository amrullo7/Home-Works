import React, { useState } from "react";
import {
  Table,
  Button,
  Dropdown,
  message,
  Space,
  Tooltip,
  Modal,
  Input,
  InputNumber,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  DownOutlined,
  EllipsisOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";

const initialData = [
  {
    id: 1,
    name: "Frozen yoghurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
  },
  {
    id: 2,
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
  },
  {
    id: 3,
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 24,
    protein: 6.0,
  },
  {
    id: 4,
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
  },
  {
    id: 5,
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
  },
];

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleDelete = (id) => {
    setData((prev) => prev.filter((row) => row.id !== id));
    messageApi.success("Deleted successfully");
  };

  const handleEdit = (row) => {
    setEditData({ ...row });
    setOpen(true);
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!editData.name.trim()) {
      messageApi.warning("Please enter dessert name");
      return;
    }

    setData((prev) =>
      prev.map((row) =>
        row.id === editData.id
          ? {
              ...editData,
              calories: Number(editData.calories),
              fat: Number(editData.fat),
              carbs: Number(editData.carbs),
              protein: Number(editData.protein),
            }
          : row,
      ),
    );

    setOpen(false);
    setEditData(null);
    messageApi.success("Updated successfully");
  };

  const handleClose = () => {
    setOpen(false);
    setEditData(null);
  };

  const handleMenuClick = ({ key }) => {
    if (key === "1") {
      messageApi.info("First menu item clicked");
    } else if (key === "2") {
      messageApi.info("Second menu item clicked");
    } else if (key === "3") {
      messageApi.warning("Third menu item clicked");
    }
  };

  const items = [
    {
      key: "1",
      label: "1st menu item",
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "2nd menu item",
      icon: <UserOutlined />,
    },
    {
      key: "3",
      label: "3rd menu item",
      icon: <UserOutlined />,
      danger: true,
    },
    {
      key: "4",
      label: "4th menu item",
      icon: <UserOutlined />,
      disabled: true,
    },
  ];

  const columns = [
    {
      title: "Dessert (100g serving)",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Calories",
      dataIndex: "calories",
      key: "calories",
      align: "right",
    },
    {
      title: "Fat (g)",
      dataIndex: "fat",
      key: "fat",
      align: "right",
    },
    {
      title: "Carbs (g)",
      dataIndex: "carbs",
      key: "carbs",
      align: "right",
    },
    {
      title: "Protein (g)",
      dataIndex: "protein",
      key: "protein",
      align: "right",
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, row) => (
        <Space>
          <Tooltip title="Delete">
            <Button
              danger
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(row.id)}
            />
          </Tooltip>

          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(row)}
            />
          </Tooltip>

          <Dropdown
            menu={{
              items,
              onClick: handleMenuClick,
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button type="text" icon={<EllipsisOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      {contextHolder}

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: 700 }}
      />

      <Space wrap style={{ marginTop: 20 }}>
        <Dropdown
          menu={{ items, onClick: handleMenuClick }}
          placement="bottomRight"
        >
          <Button>
            Dropdown <DownOutlined />
          </Button>
        </Dropdown>

        <Tooltip title="Click this button">
          <Button onClick={() => messageApi.info("Button clicked")}>
            With Tooltip
          </Button>
        </Tooltip>

        <Button
          danger
          onClick={() => messageApi.warning("Danger button clicked")}
        >
          Danger
        </Button>
      </Space>

      <Modal
        title="Edit Dessert"
        open={open}
        onOk={handleSave}
        onCancel={handleClose}
        okText="Save"
        cancelText="Cancel"
        destroyOnHidden
      >
        {editData && (
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Input
              placeholder="Dessert name"
              value={editData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />

            <InputNumber
              placeholder="Calories"
              value={editData.calories}
              onChange={(value) => handleChange("calories", value ?? 0)}
              style={{ width: "100%" }}
            />

            <InputNumber
              placeholder="Fat (g)"
              value={editData.fat}
              onChange={(value) => handleChange("fat", value ?? 0)}
              style={{ width: "100%" }}
            />

            <InputNumber
              placeholder="Carbs (g)"
              value={editData.carbs}
              onChange={(value) => handleChange("carbs", value ?? 0)}
              style={{ width: "100%" }}
            />

            <InputNumber
              placeholder="Protein (g)"
              value={editData.protein}
              onChange={(value) => handleChange("protein", value ?? 0)}
              style={{ width: "100%" }}
            />
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default App;
