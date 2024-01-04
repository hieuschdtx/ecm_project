import { Container, Stack, Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { newsActionThunk } from 'src/redux/actions/news-action';
import { fDateTime } from 'src/utils/format-time';

const BlogDetailView = () => {
  const { alias } = useParams();
  const dipatch = useDispatch();
  const { news } = useSelector((x) => x.news);

  useEffect(() => {
    dipatch(newsActionThunk.getAllNews());
  }, []);

  const dataFilter = news.find((item) => item.alias === alias);

  return (
    <Fragment>
      <Helmet>
        <title>{dataFilter?.name || 'Không tìm thấy bài viết'}</title>
      </Helmet>
      <Container>
        {dataFilter ? (
          <>
            <Stack>
              <Typography variant="h4">{dataFilter.name}</Typography>
            </Stack>
            <Stack>
              <Typography
                variant="caption"
                fontSize={13}
              >
                {fDateTime(dataFilter.created_at)}
              </Typography>
              <div
                style={{ fontSize: 14 }}
                dangerouslySetInnerHTML={{ __html: dataFilter.detail }}
              />
            </Stack>
          </>
        ) : (
          <Stack>
            <Typography variant="h4">Không tìm thấy bài viết</Typography>
          </Stack>
        )}
      </Container>
    </Fragment>
  );
};

export default BlogDetailView;
