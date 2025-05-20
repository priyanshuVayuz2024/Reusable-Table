import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Avatar,
  Tooltip,
  Box,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { InsertDriveFile } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router";
import { Popover } from "@mui/material";
import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
// import NoticeBoardDetail from "../detail";
import { useNavigate } from "react-router";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
export const GenericCard = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Card
        elevation={0}
        className="rounded-2xl shadow-lg bg-white border border-gray-200 mb-6"
      >
        <CardContent>
          <div className="flex justify-between items-start mb-2">
            <Link to={`detail`}>
              <Typography variant="h6" className="font-bold">
                {data.title}
              </Typography>
            </Link>
            <div className="hover:cursor-pointer" onClick={handleClick}>
              <MoreVertIcon />
            </div>
          </div>

          <div className="flex justify-between items-center mb-2">
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {data.date}
            </Typography>
            <Chip label="Expiring Soon" size="small" color="error" />
          </div>

          <CardMedia
            component="img"
            height="160"
            image={data.image ? data.image : "/anacity.svg"}
            alt={data.title}
            className="min-h-[172px] rounded-lg my-2 p-6 bg-gray-50 !object-contain"
          />

          <Typography variant="body2" className="text-gray-700 mb-2">
            {data.description}
          </Typography>

          <div className="flex gap-2 my-3">
            {data.attachments.map((file, idx) => (
              <Tooltip key={idx} title={file}>
                <Avatar variant="rounded" className="bg-gray-200 text-gray-700">
                  <InsertDriveFile />
                </Avatar>
              </Tooltip>
            ))}
          </div>

          <div className="space-y-4 mt-3">
            <LabelValue
              label={"Email Notifications:"}
              value={data.emailNotifications ? "Yes" : "No"}
            />
            <LabelValue label={"Expiry Date:"} value={data.expiryDate} />
            <LabelValue label={"Visibility:"} value={data.visibility} />
            <LabelValue label={"Approved By:"} value={data.approvedBy} />
            <LabelValue label={"Posted By:"} value={data.postedBy} />
            <LabelValue label={"Approved On:"} value={data.approvedOn} />
          </div>
        </CardContent>
      </Card>
      {anchorEl && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-[1200]"
          onClick={handleClose}
        />
      )}
      {/* <Popover
        open={anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{ className: "p-2 z-[1300]" }}
      >
        <PopoverComponent />
      </Popover> */}
    </>
  );
};

const PopoverComponent = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openPrintDialog, setOpenPrintDialog] = useState(false);
  const navigate = useNavigate();
  const handleDelete = () => {
    setOpenDialog(true);
  };
  const handleConfirmDelete = () => {
    setOpenDialog(false);

    console.log("Notice deleted");
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const handlePrintPreview = () => {
    setOpenPrintDialog(true);
  };

  const handleClosePrintPreview = () => {
    setOpenPrintDialog(false);
  };

  const goToDetailPage = () => {
    navigate("/forum/notice-board/detail");
  };

  const directedToReplyNotice = () => {
    navigate("/forum/notice-board/reply-on-notice");
  };

  const directedToEditDetails = () => {
    navigate("/forum/notice-board/edit-expiry-date");
  };
  return (
    <Box>
      <div className="grid gap-2">
        <div
          className="hover:cursor-pointer hover:bg-gray-200 p-1 rounded-lg"
          onClick={directedToReplyNotice}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <SendOutlinedIcon />
            <Typography className="text-black">Reply on Notice</Typography>
          </Stack>
        </div>

        <div
          className="hover:cursor-pointer hover:bg-gray-200 p-1 rounded-lg"
          onClick={directedToEditDetails}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <EditOutlinedIcon />
            <Typography className="text-black">Edit Expiry Date</Typography>
          </Stack>
        </div>

        <div
          className="hover:cursor-pointer hover:bg-gray-200  p-1 rounded-lg"
          onClick={handleDelete}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <DeleteOutlineOutlinedIcon />
            <Typography className="text-black">Delete Notice</Typography>
          </Stack>
        </div>

        <div
          className="hover:cursor-pointer hover:bg-gray-200  p-1 rounded-lg"
          onClick={goToDetailPage}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <RemoveRedEyeOutlinedIcon />
            <Typography className="text-black">View Notice</Typography>
          </Stack>
        </div>

        <div
          className="hover:cursor-pointer hover:bg-gray-200  p-1 rounded-lg"
          onClick={handlePrintPreview}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocalPrintshopOutlinedIcon />
            <Typography className="text-black">Print Notice</Typography>
          </Stack>
        </div>
      </div>

      {/* delete modal */}
      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle textAlign="center">
          <DeleteOutlineOutlinedIcon sx={{ color: "black", fontSize: 40 }} />
          <div>Confirm Delete</div>{" "}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center">
            <DialogContentText align="center">
              <div>
                Are you sure you want to delete this notice? This action cannot
                be undone.
              </div>
            </DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* print modal */}
      <Dialog
        open={openPrintDialog}
        onClose={handleClosePrintPreview}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Print Preview</DialogTitle>
        <DialogContent dividers>
          <NoticeBoardDetail />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePrintPreview}>Close</Button>
          <Button
            onClick={() => window.print()}
            variant="contained"
            color="primary"
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const LabelValue = ({ label, value }) => {
  return (
    <Box className="flex justify-between">
      <Typography fontSize={12} className="text-[#7B7B7B]">
        {label}
      </Typography>
      <Typography fontSize={12} className="text-[#121212]">
        {value}
      </Typography>
    </Box>
  );
};
