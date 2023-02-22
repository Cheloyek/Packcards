import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import s from "./actionModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { FC, ReactNode } from "react";

type PropsType = {
  children?: ReactNode;
  title: string;
  active: boolean | undefined;
  setActive: any;
};

export const ActionModal: FC<PropsType> = ({ children, title, active, setActive }) => {
  const handleClose = () => {
    setActive(false);
  };
  return (
    <div>
      <Modal
        // @ts-ignore
        open={active}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={s.wrapper}>
          <div className={s.titleBlock}>
            <Typography id="modal-modal-title" variant="h6" component="h2" className={s.title}>
              {title}
            </Typography>
            <CloseIcon onClick={handleClose} className={s.buttonClose} />
          </div>
          {children}
        </Box>
      </Modal>
    </div>
  );
};
