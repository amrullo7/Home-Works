import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { DownOutlined, EllipsisOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space, Tooltip } from "antd";

const items = [
  { label: "1st menu item", key: "1", icon: <UserOutlined /> },
  { label: "2nd menu item", key: "2", icon: <UserOutlined /> },
  { label: "3rd menu item", key: "3", icon: <UserOutlined />, danger: true },
  { label: "4rd menu item", key: "4", icon: <UserOutlined />, danger: true, disabled: true },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    id: Date.now() + Math.random(),
  };
}

const App = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [data, setData] = useState([
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ]);

  const [open, setOpen] = useState(false);

  const [editData, setEditData] = useState({
    id: null,
    name: "",
    calories: "",
    fat: "",
    carbs: "",
    protein: "",
  });

  const handleDelete = (id) => {
    setData((prev) => prev.filter((row) => row.id !== id));
  };

  const handleEdit = (row) => {
    setEditData({ ...row });
    setOpen(true);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
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
          : row
      )
    );
    setOpen(false);
    messageApi.success("Updated successfully");
  };

  const handleButtonClick = (e) => {
    messageApi.info("Click on left button.");
    console.log("click left button", e);
  };

  const handleMenuClick = (e) => {
    messageApi.info("Click on menu item.");
    console.log("click", e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete" arrow placement="top">
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <DeleteRoundedIcon sx={{ color: "red" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEdit(row)}>
                      <EditRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {contextHolder}

      <Space wrap>
        <Space.Compact>
          <Button onClick={handleButtonClick}>Dropdown</Button>
          <Dropdown menu={menuProps} placement="bottomRight">
            <Button icon={<EllipsisOutlined />} />
          </Dropdown>
        </Space.Compact>
        <Space.Compact>
          <Button onClick={handleButtonClick}>Dropdown</Button>
          <Dropdown menu={menuProps} placement="bottomRight">
            <Button icon={<UserOutlined />} />
          </Dropdown>
        </Space.Compact>
        <Space.Compact>
          <Button onClick={handleButtonClick} disabled>
            Dropdown
          </Button>
          <Dropdown menu={menuProps} placement="bottomRight" disabled>
            <Button icon={<EllipsisOutlined />} disabled />
          </Dropdown>
        </Space.Compact>
        <Space.Compact>
          <Tooltip title="tooltip">
            <Button onClick={handleButtonClick}>With Tooltip</Button>
          </Tooltip>
          <Dropdown menu={menuProps} placement="bottomRight">
            <Button loading />
          </Dropdown>
        </Space.Compact>
        <Dropdown menu={menuProps}>
          <Button
            onClick={handleButtonClick}
            icon={<DownOutlined />}
            iconPlacement="end"
          >
            Button
          </Button>
        </Dropdown>
        <Space.Compact>
          <Button onClick={handleButtonClick} danger>
            Danger
          </Button>
          <Dropdown menu={menuProps} placement="bottomRight">
            <Button icon={<EllipsisOutlined />} danger />
          </Dropdown>
        </Space.Compact>
      </Space>

      <Dialog
        open={open}
        slots={{ transition: Transition }}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>Edit Dessert</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Dessert name"
            name="name"
            value={editData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Calories"
            name="calories"
            type="number"
            value={editData.calories}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Fat (g)"
            name="fat"
            type="number"
            value={editData.fat}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Carbs (g)"
            name="carbs"
            type="number"
            value={editData.carbs}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Protein (g)"
            name="protein"
            type="number"
            value={editData.protein}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;