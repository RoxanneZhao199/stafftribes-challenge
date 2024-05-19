import { useState } from "react";

export default function useWeeks(initialWeeks) {
  const [weeks, setWeeks] = useState(initialWeeks);
  const [enabledWeeks, setEnabledWeeks] = useState(
    weeks.map((week) => week.map(() => true))
  );

  const setWeekRanges = (weekIndex, newRanges) => {
    setWeeks((prevWeeks) => {
      const updatedWeeks = [...prevWeeks];
      updatedWeeks[weekIndex] = newRanges;
      return updatedWeeks;
    });
  };

  const setWeekEnabled = (weekIndex, isEnabled) => {
    setEnabledWeeks((prevEnabledWeeks) => {
      const updatedEnabledWeeks = [...prevEnabledWeeks];
      updatedEnabledWeeks[weekIndex] = isEnabled;
      return updatedEnabledWeeks;
    });
  };

  return {
    weeks,
    enabledWeeks,
    setWeekRanges,
    setWeekEnabled,
  };
}
