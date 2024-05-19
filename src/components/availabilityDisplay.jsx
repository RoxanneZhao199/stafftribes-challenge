import React, { useState } from "react";
import { Box, Typography, Button, Select, MenuItem } from "@mui/material";
import { getDayName } from "../utils/dateUtils";

const AvailabilityDisplay = ({ weekData }) => {
  const [selectedWeek, setSelectedWeek] = useState(0);

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  if (!weekData || !Array.isArray(weekData)) {
    return <Typography>No availability data available.</Typography>;
  }

  const currentWeekData = weekData[selectedWeek];
  const daysAvailable = currentWeekData ? currentWeekData.days : [];

  return (
    <Box>
      <Typography
        color="#2E4A62"
        variant="h4"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={3}
      >
        MY AVAILABILITY
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Button onClick={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}>
          Last Week
        </Button>
        <Button onClick={() => setSelectedWeek(0)}>This Week</Button>
        <Button onClick={() => setSelectedWeek(1)}>Next Week</Button>
        <Select value={selectedWeek} onChange={handleWeekChange}>
          {weekData.map((_, index) => (
            <MenuItem key={index} value={index}>{`Week ${index + 1}`}</MenuItem>
          ))}
        </Select>
        <Button
          onClick={() =>
            setSelectedWeek(Math.min(weekData.length - 1, selectedWeek + 1))
          }
        >
          Future Week
        </Button>
      </Box>
      <Typography> Availability for Week {selectedWeek + 1}:</Typography>
      {daysAvailable && daysAvailable.length > 0 ? (
        daysAvailable.map((range, index) => (
          <Typography
            key={index}
            sx={{
              backgroundColor: "#e0f2f1",
              padding: "8px",
              borderRadius: "4px",
              color: "#000",
              margin: "4px 0",
            }}
          >
            {getDayName(range[0])} to {getDayName(range[1])}
          </Typography>
        ))
      ) : (
        <Typography>No availability this week.</Typography>
      )}
    </Box>
  );
};

export default AvailabilityDisplay;
