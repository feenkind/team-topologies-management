import * as React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

const CurrentProjectSelect: React.FC = () => {
  const navigate = useNavigate();
  const currentProjectId = useAppSelector(
    (state) => state.project.currentProject.id,
  );
  const projects = useAppSelector((state) => state.project.projects);

  return (
    <Box sx={{ my: 3, mx: 1, color: 'background.paper' }}>
      <FormControl fullWidth>
        <InputLabel
          id="projectSelectInput"
          sx={{
            color: 'primary.main',
            '& div': {
              borderColor: 'background.paper',
            },
          }}
        >
          Active Project
        </InputLabel>
        <Select
          sx={{
            color: 'background.paper',
            '& svg': {
              color: 'primary.main',
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
          }}
          labelId="projectSelectLabel"
          id="projectSelect"
          value={
            projects.find((project) => project.id === currentProjectId)
              ? currentProjectId
              : ''
          }
          label="Active project"
          onChange={(selectedOption) => {
            navigate(`/project/${selectedOption.target.value}`);
          }}
        >
          {projects.map((project) => (
            <MenuItem key={project.id} value={project.id}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CurrentProjectSelect;
