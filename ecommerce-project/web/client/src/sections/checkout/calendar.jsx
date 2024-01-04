import { Button, Typography, styled as MUIStyled, Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { primary } from 'src/theme/palette';
import { fDate, fGetTimeForDayOfWeek, getTimeLine, nameDaysOfWeek } from 'src/utils/format-time';
import PropTypes from 'prop-types';

const showNumberDateSelected = 4;

const TimeLine = ({ item, title, selectedItem, handleItemClick }) => (
  <Stack direction="row" alignItems="center" justifyContent="flex-start">
    <Typography variant="normal" fontSize={13} fontWeight={500} width={60}>
      {title}
    </Typography>
    <Box display="flex" alignItems="center" gap={1}>
      {item.map((time) => (
        <StyledButton
          key={time.value}
          checked={selectedItem === time.value}
          onClick={() => handleItemClick(time.value)}
        >
          <Typography variant="normal" fontSize={13} fontWeight={400}>
            {time.label}
          </Typography>
        </StyledButton>
      ))}
    </Box>
  </Stack>
);

TimeLine.propTypes = {
  item: PropTypes.any,
  title: PropTypes.any,
  selectedItem: PropTypes.any,
  handleItemClick: PropTypes.any,
};

export default function Calendar({ handleGetDate }) {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [morningDate, setMorningDate] = useState([]);
  const [afternoonDate, setAfternoonDate] = useState([]);
  const [nightDate, setNightDate] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const dates = [];
  for (let i = 0; i < showNumberDateSelected; i++) {
    const nextDate = new Date();
    if (currentDate.getDay() === nextDate.getDay() + i) {
      if (currentDate.getHours() >= 19) {
        continue;
      }
    }
    nextDate.setDate(currentDate.getDate() + i);
    dates.push(nextDate);
  }

  useEffect(() => {
    setSelectedDate(dates[0]?.getDay());
  }, []);

  const handleselectedDay = (day) => {
    setSelectedDate(day);
  };

  const handleItemClick = (value) => {
    setSelectedItem(value); // Cập nhật phần tử được chọn
  };

  useEffect(() => {
    const data = getTimeLine(selectedDate);
    setSelectedItem(data[0].value);
    const morningData = [];
    const afternoonData = [];
    const nightData = [];

    data.forEach((item) => {
      if (item.value <= 12) {
        morningData.push(item);
      } else if (item.value <= 18) {
        afternoonData.push(item);
      } else {
        nightData.push(item);
      }
    });

    setMorningDate(morningData);
    setAfternoonDate(afternoonData);
    setNightDate(nightData);
  }, [selectedDate]);

  useEffect(() => {
    handleGetDate(fGetTimeForDayOfWeek(selectedDate, selectedItem));
  }, [selectedDate, selectedItem]);

  return (
    <>
      <Box>
        <Typography variant="normal" fontSize={13} fontWeight={400}>
          Chọn ngày giao hàng
        </Typography>

        <Box mt={1} display="flex" alignItems="center" justifyContent="flex-start" gap={1}>
          {dates.map((item, index) => {
            const curDay = item.getDay();
            return (
              <StyledButton
                key={index}
                checked={selectedDate === curDay}
                onClick={() => handleselectedDay(curDay)}
              >
                <Typography variant="normal" fontSize={13} fontWeight={400} lineHeight={1.2}>
                  {currentDate.getDay() === curDay ? 'Hôm nay' : nameDaysOfWeek[curDay]}
                </Typography>
                <Typography variant="normal" fontSize={12} fontWeight={400}>
                  {fDate(item.getTime())}
                </Typography>
              </StyledButton>
            );
          })}
        </Box>
      </Box>
      <Box mt={1}>
        <Typography variant="normal" fontSize={13} fontWeight={400}>
          Chọn thời gian giao hàng
        </Typography>
        <Box
          mt={1}
          display="flex"
          flexDirection="column"
          alignItems="start"
          justifyContent="flex-start"
          gap={1.5}
        >
          {morningDate.length > 0 && (
            <TimeLine
              item={morningDate}
              title="Sáng"
              selectedItem={selectedItem}
              handleItemClick={handleItemClick}
            />
          )}
          {afternoonDate.length > 0 && (
            <TimeLine
              item={afternoonDate}
              title="Chiều"
              selectedItem={selectedItem}
              handleItemClick={handleItemClick}
            />
          )}
          {nightDate.length > 0 && (
            <TimeLine
              item={nightDate}
              title="Tối"
              selectedItem={selectedItem}
              handleItemClick={handleItemClick}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

Calendar.propTypes = {
  handleGetDate: PropTypes.func,
};

const StyledButton = MUIStyled(Button)(({ theme, checked }) => ({
  backgroundColor: `${checked ? primary.red : 'white'}`,
  textTransform: 'none',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgb(221, 221, 221)',
  padding: ' 12px',
  borderRadius: '0 !important',
  alignItems: 'center',
  justifyContent: 'center',
  color: `${checked ? 'white' : 'black'}`,
  '&:hover': {
    backgroundColor: primary.red,
    color: 'white',
  },
}));
