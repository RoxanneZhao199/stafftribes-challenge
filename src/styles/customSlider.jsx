import { styled } from "@mui/material/styles";
import { Slider } from "@mui/material";
export const CustomSlider = styled(Slider)(({ theme, disabled }) => ({
  "& .MuiSlider-valueLabel": {
    backgroundColor: disabled ? "#a8a8a8" : "#2E4A62",
    color: disabled ? "#666" : "#ffffff",
  },
  "& .MuiSlider-thumb": {
    backgroundColor: disabled ? "#cccccc" : "#2E4A62",
  },
  "& .MuiSlider-track": {
    backgroundColor: disabled ? "#bdbdbd" : "#2E4A62",
  },
  "& .MuiSlider-rail": {
    backgroundColor: "#cccccc",
    opacity: 0.1,
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#2E4A62",
  },
}));
