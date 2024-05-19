import React from "react";
import { Box, Button, Typography } from "@mui/material";
import WeeklyAvailability from "./weeklyAvailability";

const AvailabilityScheduler = ({
  weeks,
  setWeekRanges,
  enabledWeeks,
  setWeekEnabled,
  setActiveWeekData,
}) => {
  const handleSave = () => {
    const processedData = weeks.map((weekRanges, index) => {
      const days = weekRanges.map((range) => {
        return enabledWeeks[index] ? [range[0], range[1]] : [];
      });

      return {
        week: `Week ${index + 1}`,
        days: days.filter((day) => day.length > 0),
      };
    });

    setActiveWeekData(processedData);
    console.log(processedData);
  };

  return (
    <Box>
      <Typography
        color="#2E4A62"
        variant="h4"
        mb={8}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        MY AVAILABILITY FOR THE NEXT 7 WEEKS
      </Typography>
      {weeks.map((ranges, index) => (
        <WeeklyAvailability
          key={index}
          weekNum={index + 1}
          ranges={ranges}
          setWeekRanges={setWeekRanges}
          isEnabled={enabledWeeks[index]}
          setWeekEnabled={setWeekEnabled}
        />
      ))}
      <Button
        variant="contained"
        color="primary"
        sx={{
          padding: "8px 30px",
          fontSize: "1.20rem",
          borderRadius: "30px",
          marginLeft: "30px",
          boxShadow: "0px 2px 20px rgba(0, 0, 0, 0.20)",
        }}
        onClick={handleSave}
      >
        Save
      </Button>
    </Box>
  );
};

export default AvailabilityScheduler;
