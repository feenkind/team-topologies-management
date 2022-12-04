import * as React from 'react';
import { Box, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import theme from '../../theme';

interface IQuestionBoxProps {
  headline: string;
  children: React.ReactNode | React.ReactNode[];
}

const QuestionBox: React.FC<IQuestionBoxProps> = ({
  headline,
  children,
}: IQuestionBoxProps) => {
  return (
    <Box my={4}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <HelpIcon
          fontSize="small"
          sx={{ color: theme.palette.secondary.dark, mr: 1 }}
        />
        <Typography
          variant="button"
          sx={{ color: theme.palette.secondary.dark }}
        >
          {headline}
        </Typography>
      </Box>
      <Typography variant="body2" mt={1}>
        {children}
      </Typography>
    </Box>
  );
};

export default QuestionBox;
