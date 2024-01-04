import { Box, Card, Stack, Typography } from '@mui/material';
import Label from 'src/components/label';
import { useRouter } from 'src/routes/hooks';
import { customShadows } from 'src/theme/custom-shadows';
import { common, grey, primary } from 'src/theme/palette';
import { BACKEND_URL } from 'src/utils/axios-instance';
import { fDate } from 'src/utils/format-time';
import styled from 'styled-components';

export default function CardBlog({ news }) {
  const shadow = customShadows();
  const router = useRouter();
  const renderTag = (
    <Label
      color={common.white}
      sx={{
        fontSize: '11px',
        pl: 1.5,
        pr: 1.5,
        width: 70,
        backgroundColor: primary.red,
        borderRadius: 22,
      }}
    >
      MEATDELI
    </Label>
  );

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 300,
        height: 400,
        backgroundColor: common.white,
        boxShadow: shadow.cards,
        cursor: 'pointer',
      }}
      onClick={() => router.push(`${news.alias}`)}
    >
      <Stack
        p={news.image ? 0 : 2}
        height={180}
        width={1}
      >
        <img
          src={`${BACKEND_URL}images/news${news.image}`}
          width="100%"
          height={180}
          alt={news.name}
        />
      </Stack>
      <Stack
        p={2}
        direction="column"
        flex={1}
      >
        {renderTag}
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'space-between'}
          mt={1}
          height={'auto'}
          flex={2}
        >
          <Stack>
            <Typography
              variant="normal"
              fontSize={15}
              fontWeight={700}
            >
              {news.name}
            </Typography>
            <TextDescription>{news.description}</TextDescription>
          </Stack>
          <Typography
            variant="normal"
            fontSize={12}
            textAlign={'right'}
            color={grey[600]}
          >
            {fDate(news.created_at)}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}

const TextDescription = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  font-size: 12px;
  color: ${grey[600]};
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;
