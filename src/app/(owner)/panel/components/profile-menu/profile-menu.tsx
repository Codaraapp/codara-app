"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import { styled, alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    backgroundColor: "#1C1F39",
    marginTop: theme.spacing(-6.1),
    minWidth: 170,
    color: "#cccccc",
    // marginBottom: theme.spacing(-10),
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 16,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function ProfileMenu({
  params,
}: {
  params: { userSession: Session | null };
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="profile-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        variant="outlined"
        color="secondary"
        sx={{
          width: "100%",
          textTransform: "none",
          borderRadius: 10,
          backgroundColor: "#1C1F39",
          borderColor: "#1C1F39",
          color: "#f9f9f9",
          "&:hover": {
            borderColor: "#1C1F39",
          },
        }}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Avatar
          alt={params.userSession?.user?.name || ""}
          src={params.userSession?.user?.image || ""}
          sx={{
            width: 24,
            height: 24,
            mr: 1,
            border: 2,
            borderColor: "#2B2D42",
          }}
        />
        {params.userSession?.user?.name}
      </Button>
      <StyledMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={() => signOut()}>Logout</MenuItem>
      </StyledMenu>
    </div>
  );
}
