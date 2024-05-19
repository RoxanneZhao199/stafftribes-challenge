import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import AvailabilityScheduler from "./components/availabilityScheduler";
import AvailabilityDisplay from "./components/availabilityDisplay";
import useWeeks from "./hooks/useWeeks";

const App = () => {
  const { weeks, setWeekRanges, enabledWeeks, setWeekEnabled } = useWeeks(
    Array.from({ length: 7 }, () => [[1, 2, new Date().getTime()]])
  );

  const [currentWeek, setCurrentWeek] = useState(0);
  const [activeWeekData, setActiveWeekData] = useState([]);

  useEffect(() => {
    if (weeks[currentWeek] && enabledWeeks[currentWeek]) {
      const newData = weeks[currentWeek].filter(
        (_, index) => enabledWeeks[index]
      );
      setActiveWeekData(newData);
    } else {
      setActiveWeekData(weeks[currentWeek] || []);
    }
  }, [currentWeek, weeks, enabledWeeks]);

  const handleWeekChange = (weekIndex) => {
    setCurrentWeek(weekIndex);
  };

  return (
    <Container maxWidth="lg">
      <Box
        p={3}
        mb={4}
        component="section"
        border={1}
        borderColor="grey.300"
        boxShadow={2}
      >
        <AvailabilityScheduler
          weeks={weeks}
          setWeekRanges={setWeekRanges}
          enabledWeeks={enabledWeeks}
          setWeekEnabled={setWeekEnabled}
          onWeekChange={handleWeekChange}
          setActiveWeekData={setActiveWeekData}
        />
      </Box>
      <Box
        p={3}
        component="section"
        border={1}
        borderColor="grey.300"
        boxShadow={2}
      >
        <AvailabilityDisplay weekData={activeWeekData} />
      </Box>
    </Container>
  );
};

export default App;
