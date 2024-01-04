import { useState } from 'react';
import {
  IconButton,
  MenuItem,
  Popover,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { notify } from 'src/utils/untils';
import ModalDelete from 'src/components/modal-delete/modal-delete';
import Iconify from 'src/components/iconify';
import PropTypes from 'prop-types';
import { productCategoriesService } from 'src/apis/product-categories-service';
import Label from 'src/components/label';
import { secondary } from 'src/theme/palette';
import ProductCategoriesEdit from './product-categories-edit';

export default function ProductCategoriesTableRow({
  name,
  category,
  discount,
  createdBy,
  createdAt,
  hanldeGetId,
}) {
  const [open, setOpen] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [id, setId] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = (event) => {
    setOpen(null);
  };

  const handleEditModal = (event) => {
    const categoryId = hanldeGetId(event);

    setId(categoryId);
    setOpenModalEdit(true);
    setOpen(null);
  };

  const handleDeleteModal = async (event) => {
    const categoryId = hanldeGetId(event);

    setId(categoryId);
    setOpenModalDelete(true);
    setOpen(null);
  };

  const handleDeleteCategory = async () => {
    if (id) {
      const { data, status } = await productCategoriesService.deleteProductCategory(id);
      setId(null);
      const { message } = data;
      notify(message, status);
    }
    setId(null);
  };

  const renderDiscount = (
    <Label
      variant="filled"
      color={secondary.dark}
      sx={{
        fontSize: '12px',
        pl: 1.5,
        pr: 1.5,
        width: 45,
      }}
    >
      {`${discount}%`}
    </Label>
  );

  return (
    <>
      <ModalDelete
        open={openModalDelete}
        handleClose={() => setOpenModalDelete(false)}
        handleAccept={handleDeleteCategory}
      />
      {openModalEdit && (
        <ProductCategoriesEdit
          open={openModalEdit}
          handleClose={() => setOpenModalEdit(false)}
          proCategory={id}
        />
      )}
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell component="th" scope="row" padding="normal">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="normal" fontSize={13} noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Typography variant="normal" fontSize={13} noWrap>
            {category}
          </Typography>
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
            {discount !== undefined && renderDiscount}
          </Stack>
        </TableCell>

        <TableCell>
          <Typography variant="normal" fontSize={13} noWrap>
            {createdBy}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="normal" fontSize={13} noWrap>
            {createdAt}
          </Typography>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={(event) => handleEditModal(event)}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Chỉnh sửa
        </MenuItem>

        <MenuItem
          onClick={(event) => {
            handleDeleteModal(event);
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>
    </>
  );
}
ProductCategoriesTableRow.propTypes = {
  handleClick: PropTypes.func,
  createdBy: PropTypes.any,
  name: PropTypes.any,
  discount: PropTypes.any,
  category: PropTypes.any,
  createdAt: PropTypes.string,
  hanldeGetId: PropTypes.func,
};
