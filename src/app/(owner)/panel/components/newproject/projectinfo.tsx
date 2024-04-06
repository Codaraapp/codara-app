import { BoxList } from "@/app/core/components/boxlist/boxlist";
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";

const ProjectInfo = (props: any) => {
  const { data, handleChange } = props;

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Typography variant="subtitle1">Step2</Typography>
      <Typography variant="h3">Project Info</Typography>
      <Stack direction="column" spacing={3} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Project Name*"
          variant="outlined"
          margin="normal"
          name="project_name"
          value={data.project_name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Project Description*"
          variant="outlined"
          margin="normal"
          multiline
          minRows={3}
          name="project_desc"
          value={data.project_desc}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          variant="outlined"
          label="Project Prize Amount*"
          name="amount"
          type="number"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">USDC</InputAdornment>
            ),
          }}
          value={data.amount}
          onChange={handleChange}
        />
      </Stack>
    </Box>
  );
};

export default ProjectInfo;
