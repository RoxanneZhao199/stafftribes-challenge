import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Button,
  FormGroup,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { CustomSlider } from "../styles/customSlider";
import { getDayName } from "../utils/dateUtils";
import { daysOfWeekMarks } from "../utils/daysMarks";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PropTypes from "prop-types";

const WeeklyAvailability = ({
  weekNum,
  ranges,
  setWeekRanges,
  isEnabled,
  setWeekEnabled,
}) => {
  const [showAdd, setShowAdd] = useState(true);

  const handleSliderChange = (index) => (event, newValue) => {
    if (!isEnabled) return;
    const newRange = newValue.sort((a, b) => a - b);
    const noOverlap = !ranges.some(
      (range, idx) =>
        idx !== index && newRange[0] <= range[1] && newRange[1] >= range[0]
    );

    if (noOverlap) {
      const updatedRanges = ranges.map((range, idx) =>
        idx === index ? newRange : range
      );
      setWeekRanges(weekNum - 1, updatedRanges);
    }
  };

  const handleRangeToggle = () => {
    if (!isEnabled) return;

    if (showAdd) {
      const sortedRanges = [...ranges].sort((a, b) => a[0] - b[0]);
      let newRangeStart = -1;
      let newRangeEnd = -1;

      for (let i = 0; i <= 6; i++) {
        const hasOverlap = sortedRanges.some(
          (range) =>
            (i >= range[0] && i <= range[1]) ||
            (i + 1 >= range[0] && i + 1 <= range[1])
        );
        if (!hasOverlap) {
          newRangeStart = i;
          newRangeEnd = i + 1;
          if (newRangeEnd > 6) break;
          break;
        }
      }

      if (newRangeStart !== -1 && newRangeEnd <= 6) {
        const newRange = [newRangeStart, newRangeEnd, new Date().getTime()];
        setWeekRanges(weekNum - 1, [...ranges, newRange]);
        setShowAdd(!showAdd);
      }
    } else {
      const reducedRanges = ranges.slice(0, ranges.length - 1);
      setWeekRanges(weekNum - 1, reducedRanges);
      setShowAdd(!showAdd);
    }
  };

  const handleCheckboxChange = (event) => {
    setWeekEnabled(weekNum - 1, event.target.checked);
  };

  return (
    <Box padding={2} sx={{ m: 2 }}>
      <Grid container>
        <Grid item xs={3}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={isEnabled} onChange={handleCheckboxChange} />
              }
              label={`Week ${weekNum}`}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ position: "relative", height: "80px" }}>
            {ranges.map((range, index) => (
              <CustomSlider
                key={index}
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  zIndex: index,
                }}
                value={[range[0], range[1]]}
                onChange={handleSliderChange(index)}
                valueLabelDisplay="on"
                getAriaValueText={getDayName}
                valueLabelFormat={getDayName}
                min={0}
                max={6}
                step={1}
                marks={daysOfWeekMarks}
                disableSwap
                disabled={!isEnabled}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Button
            startIcon={showAdd ? <AddIcon /> : <RemoveIcon />}
            onClick={handleRangeToggle}
            disabled={!isEnabled}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

WeeklyAvailability.propTypes = {
  weekNum: PropTypes.number.isRequired,
  ranges: PropTypes.arrayOf(PropTypes.array).isRequired,
  setWeekRanges: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  setWeekEnabled: PropTypes.func.isRequired,
};

export default WeeklyAvailability;
