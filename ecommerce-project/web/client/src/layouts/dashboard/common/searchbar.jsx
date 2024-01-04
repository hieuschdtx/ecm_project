import { useEffect, useState } from 'react';

import {
  TextField,
  IconButton,
  Card,
  List,
  ListItemButton,
  ListItem,
  MenuItem,
  Stack,
  Box,
  Typography,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';
import { useSelector } from 'react-redux';
import { applyFilter } from './filter-search';
import styled from 'styled-components';
import { customShadows } from 'src/theme/custom-shadows';
import Scrollbar from 'src/components/scrollbar';
import { BACKEND_URL } from 'src/utils/axios-instance';
import { fNumber } from 'src/utils/format-number';
import { Link } from 'react-router-dom';
import { useRouter } from 'src/routes/hooks';

const shadow = customShadows();

export default function Searchbar() {
  const [textSearch, setTextSearch] = useState('');
  const { products } = useSelector((x) => x.products);
  const dataFitler = applyFilter({ inputData: products, filterName: textSearch });

  useEffect(() => {
    setTextSearch('');
  }, [window.location.pathname]);

  return (
    <InputSearch>
      <TextField
        name="phone_number"
        placeholder="Tìm kiếm sản phẩm..."
        fullWidth
        value={textSearch}
        onChange={(e) => setTextSearch(e.target.value)}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton edge="start">
                <Iconify icon="eva:search-fill" />
              </IconButton>
            </InputAdornment>
          ),
          style: {
            borderRadius: `${dataFitler.length > 0 ? '16px 16px 0 0' : '16px'}`,
            marginLeft: '15px',
            fontSize: '13px',
            lineHeight: 1.5,
            height: '39px',
            appearance: 'none',
            wordSpacing: '-1px',
            border: 'none',
            '&:hover': {
              border: 'none',
              borderColor: 'transparent',
            },
          },
        }}
      />
      <ShowItemFilter $show={dataFitler.length > 0 ? 'block' : 'none'}>
        <Scrollbar sx={{ height: 'auto', maxHeight: 360 }}>
          <List sx={{ p: 0.5 }}>
            {dataFitler.length > 0 &&
              dataFitler.map((product) => (
                <ListProductItem
                  product={product}
                  key={product.id}
                />
              ))}
          </List>
        </Scrollbar>
      </ShowItemFilter>
    </InputSearch>
  );
}

const ListProductItem = ({ product }) => {
  const router = useRouter();
  const handleSelectProduct = () => {
    router.push(`/thong-tin-san-pham/${product.alias}`);
  };

  return (
    <LinkItemProduct onClick={handleSelectProduct}>
      <Stack sx={{ width: '60px' }}>
        <img
          alt={product.name}
          src={`${BACKEND_URL}images/products${product.avatar}`}
          width="100%"
        />
      </Stack>
      <Stack sx={{ width: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="normal"
          fontSize={14}
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          {product.name}
        </Typography>
        <Stack
          direction={'row'}
          gap={2}
        >
          <Typography
            variant="normal"
            fontSize={13}
            width="50%"
          >
            {`Khối lượng: ${product.weight} Kg`}
          </Typography>
          <Typography
            variant="normal"
            fontSize={13}
          >
            {`Giá bán: ${product.price_sale > 0 ? fNumber(product.price_sale) : fNumber(product.price)} đ`}
          </Typography>
        </Stack>
      </Stack>
    </LinkItemProduct>
  );
};

const InputSearch = styled.div`
  width: 400px;
  position: relative;
`;

const ShowItemFilter = styled.div`
  position: absolute;
  width: 100%;
  background-color: white;
  box-shadow: ${shadow.cards};
  left: 0;
  right: 0;
  color: black;
  bottom: -100;
  display: ${(prop) => prop.$show};
  border-radius: 0 0 16px 16px;
  margin-left: 15px;
  z-index: 10000;
`;

const LinkItemProduct = styled.div`
  display: flex;
  font-size: 13px;
  align-items: center;
  padding: 6px 10px;
  gap: 10px;
  text-decoration: none;
  color: black;
  cursor: pointer;
  &:hover {
    box-shadow: ${shadow.dropdown};
  }
`;
