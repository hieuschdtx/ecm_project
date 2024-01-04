import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardBlog from './card-blog';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { newsActionThunk } from 'src/redux/actions/news-action';
import CustomPanigation from 'src/components/panigation/custom-panigation';
import { stringify } from 'query-string';
import { useRouter } from 'src/routes/hooks';

const defaultSize = 12;

export default function BlogView() {
  const { filterPaging } = useSelector((x) => x.news);
  const { result, total_pages, total_count, current_page } = filterPaging;
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const param = {
      pageNumber,
      pageSize: defaultSize,
    };
    dispatch(newsActionThunk.getAllNewsPaging(param));
    router.push('?' + stringify(param));
  }, [pageNumber]);

  const handleOnPageChange = (event, value) => {
    setPageNumber(value);
  };

  return (
    <Container>
      <Stack
        direction="column"
        gap={2}
      >
        <Typography variant="h4">Bài viết</Typography>
        <Stack
          width={1}
          mt={2}
          display={'grid'}
          gridTemplateColumns={'repeat(4,1fr)'}
          gap={2}
        >
          {result.map((item) => (
            <CardBlog
              news={item}
              key={item.id}
            />
          ))}
        </Stack>
        <Stack margin="12px auto 24px auto">
          <CustomPanigation
            count={total_pages}
            total={total_count}
            defaultValue={current_page}
            onChange={handleOnPageChange}
          />
        </Stack>
      </Stack>
    </Container>
  );
}
