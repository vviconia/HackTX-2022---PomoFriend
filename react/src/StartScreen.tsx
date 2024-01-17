import { Box, Grid, Input, Slider } from "@mui/material";
import { useApp } from "./context";

export const StartScreen = () => {
  const { rest, setRest, study, setStudy, cycles, setCycles } = useApp();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: 250,
          background: "#ddd",
          borderRadius: "5px",
          padding: "5px",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item>Study Time:</Grid>
          <Grid item xs>
            <Slider
              value={study}
              onChange={(e, val) => {
                setStudy(val as number);
              }}
              step={1}
              min={0}
              max={60}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item>
            <Input
              value={study}
              size="small"
              onChange={(e) => {
                setStudy(
                  e.target.value === ""
                    ? 0
                    : Math.min(60, parseInt(e.target.value))
                );
              }}
              inputProps={{
                step: 1,
                min: 0,
                max: 60,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
          <Grid item>Break Time:</Grid>
          <Grid item xs>
            <Slider
              value={rest}
              onChange={(e, val) => {
                setRest(val as number);
              }}
              step={1}
              min={0}
              max={60}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item>
            <Input
              value={rest}
              size="small"
              onChange={(e) => {
                setRest(
                  e.target.value === ""
                    ? 0
                    : Math.min(60, parseInt(e.target.value))
                );
              }}
              inputProps={{
                step: 1,
                min: 0,
                max: 60,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Grid>
        </Grid>
        Cycles:{" "}
        <Input
          value={cycles}
          size="small"
          onChange={(e) => {
            setCycles(e.target.value === "" ? 0 : parseInt(e.target.value));
          }}
          inputProps={{
            step: 1,
            min: 0,
            type: "number",
          }}
        />
      </Box>
    </div>
  );
};
