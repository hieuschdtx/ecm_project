import { Box, Button, List, ListItemButton, Stack, Typography } from '@mui/material';
import PropsType from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Iconify from 'src/components/iconify';
import { categoryActionThunk } from 'src/redux/actions/category-action';
import { productCategoryActionThunk } from 'src/redux/actions/product-category-action';
import { RouterLink } from 'src/routes/components';
import { customShadows } from 'src/theme/custom-shadows';
import { primary } from 'src/theme/palette';
import styled from 'styled-components';

const StyleButton = {
  backgroundColor: 'transparent',
  color: 'white',
  border: 'none',
  borderRadius: 0,
  outline: 'none',
  boxShadow: 'none',
  padding: '8px 16px',
  ':hover': {
    backgroundColor: primary.hover,
  },
};

const RenderDropdown = ({ id, isOpen, handleIsOpen }) => {
  const dispatch = useDispatch();
  const { productCategories } = useSelector((x) => x.productCategories);
  const [onfocus, setOnfocus] = useState(false);
  const styleShadow = customShadows();

  useEffect(() => {
    dispatch(productCategoryActionThunk.getProductCategoryByCategoryId(id));
  }, [dispatch, id]);

  const handleMouseEnter = () => {
    if (isOpen) {
      setOnfocus(true);
    }
    if (!onfocus) {
      handleIsOpen(true);
    }
  };
  const handleMouseLeave = () => {
    setOnfocus(false);
    handleIsOpen(false);
  };

  return (
    <List
      sx={{
        width: '250px',
        position: 'absolute',
        top: 40,
        left: 0,
        backgroundColor: 'white',
        display: isOpen || onfocus ? 'block' : 'none',
        boxShadow: styleShadow.dropdown,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {productCategories.map((item, index) => (
        <ListItemButton
          key={item.id}
          sx={{
            color: 'black',
            ':hover': { backgroundColor: primary.red, color: 'white' },
            width: '100%',
            padding: '0 !important',
          }}
        >
          <DropdownItem to={`san-pham/${item.alias}`}>
            <Typography
              variant="normal"
              fontSize="13px"
            >
              {item.name}
            </Typography>
          </DropdownItem>
        </ListItemButton>
      ))}
    </List>
  );
};

export default function NavigationHeader() {
  const dispatch = useDispatch();
  const { categories } = useSelector((x) => x.categories);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    dispatch(categoryActionThunk.getAllCategories());
  }, [dispatch]);

  const renderMenu = (
    <Box
      height="100%"
      width="100%"
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        width="1200px"
        margin="0 auto"
      >
        {categories.map((element, index) =>
          element.alias === 'san-pham' ? (
            <Box
              sx={{ position: 'relative' }}
              key={element.id}
            >
              <Button
                key={index}
                component={RouterLink}
                href={element.alias}
                sx={StyleButton}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                endIcon={
                  <Iconify
                    rotate={isHovered ? 0 : 3}
                    icon="gridicons:dropdown"
                  />
                }
              >
                {element.name}
              </Button>
              <RenderDropdown
                id={element.id}
                isOpen={isHovered}
                handleIsOpen={setIsHovered}
              />
            </Box>
          ) : (
            <Button
              key={element.id}
              component={RouterLink}
              href={element.alias === 'trang-chu' ? '/' : element.alias}
              sx={StyleButton}
            >
              {element.name}
            </Button>
          ),
        )}
      </Stack>
    </Box>
  );
  return <div style={{ backgroundColor: primary.red, width: '100%' }}>{renderMenu}</div>;
}

RenderDropdown.propTypes = {
  id: PropsType.string,
  isOpen: PropsType.bool,
  handleIsOpen: PropsType.any,
};

const DropdownItem = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 13px;
  font-weight: 500;
  width: 100%;
  height: 100%;
  padding: 10px 0 10px 24px;
`;
