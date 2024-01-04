import {
  Box,
  Collapse,
  Container,
  List,
  ListItemButton,
  Typography,
  styled as MUIStyled,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Iconify from 'src/components/iconify';
import { usePathname, useRouter } from 'src/routes/hooks';
import { primary } from 'src/theme/palette';
import { ProductCard } from 'src/components/card';
import { productAsyncThunk } from 'src/redux/actions/product-action';
import { stringify } from 'query-string';
import { StyleCardItem, StyleCardProduct } from '../styled';
import CustomPanigation from 'src/components/panigation/custom-panigation';

const defaultSize = 12;
const themes = createTheme({
  palette: {
    primary: {
      main: primary.red,
    },
  },
});

export default function ProductCategoryView() {
  const { alias } = useParams();
  const { productCategories } = useSelector((x) => x.productCategories);
  const { products, current_page, total_count, total_pages } = useSelector((x) => x.products);

  const [pageNumber, setPageNumber] = useState(1);

  const [open, setOpen] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!alias && pathname === '/san-pham') {
      const param = {
        pageNumber,
        pageSize: defaultSize,
      };
      dispatch(productAsyncThunk.getAllProductPaging(param));
      router.push('?' + stringify(param));
    } else {
      dispatch(productAsyncThunk.getProductByProductCategory());
    }
  }, [alias, pageNumber]);

  const productFilter = useMemo(() => {
    if (!alias && pathname === '/san-pham') {
      return products;
    }
    return products.filter((item) => item.product_category_id === selectedId);
  }, [products, selectedId]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleListItemClick = (item) => {
    setSelectedId(item.id);
    router.push(`/san-pham/${item.alias}`);
  };

  useEffect(() => {
    if (!(!alias && pathname === '/san-pham')) {
      const data = productCategories.find((item) => item.alias === alias && alias);
      setSelectedId(data.id);
    } else setSelectedId(null);
  }, [alias]);

  const handleOnPageChange = (event, value) => {
    setPageNumber(value);
  };

  return (
    <ThemeProvider theme={themes}>
      <Container sx={{ maxWidth: '1200px', position: 'relative', p: '0 !important' }}>
        <Box
          display="flex"
          flexDirection="row"
          width="100%"
          borderLeft="1px solid #e0e0e0"
        >
          <Box
            flex="0 0 auto"
            width="20%"
          >
            <List
              sx={{ width: '100%', maxWidth: 360, color: 'black' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton
                onClick={handleClick}
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography
                  variant="normal"
                  fontSize={14}
                >
                  DANH MỤC SẢN PHẨM
                </Typography>
                {open ? (
                  <Iconify
                    icon="ooui:next-ltr"
                    rotate={1}
                    width={15}
                  />
                ) : (
                  <Iconify
                    icon="ooui:next-ltr"
                    width={15}
                  />
                )}
              </ListItemButton>
              <Collapse
                in={open}
                timeout="auto"
                unmountOnExit
              >
                <List
                  component="div"
                  disablePadding
                >
                  {productCategories.map((item) => (
                    <StyledListItemButton
                      key={item.id}
                      sx={{ pl: 4 }}
                      selected={selectedId === item.id}
                      onClick={() => handleListItemClick(item)}
                    >
                      <Typography
                        variant="normal"
                        fontSize={13}
                      >
                        {item.name}
                      </Typography>
                    </StyledListItemButton>
                  ))}
                </List>
              </Collapse>
            </List>
          </Box>
          <Box
            borderLeft="1px solid #e0e0e0"
            width="100%"
            pb={2}
            px={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={3}
          >
            <StyleCardProduct $number={4}>
              {productFilter.map((product) =>
                product.status && product.home_flag ? (
                  <StyleCardItem key={product.id}>
                    <ProductCard product={product} />
                  </StyleCardItem>
                ) : (
                  ''
                ),
              )}
            </StyleCardProduct>
            {pathname === '/san-pham' ? (
              <Box>
                <CustomPanigation
                  count={total_pages}
                  total={total_count}
                  defaultValue={current_page}
                  onChange={handleOnPageChange}
                />
              </Box>
            ) : (
              ''
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const StyledListItemButton = MUIStyled(ListItemButton)(() => ({
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'white',
  },
  '&.Mui-selected': {
    backgroundColor: primary.red,
    color: 'white',
    '&:hover': {
      backgroundColor: primary.red,
    },
  },
}));
