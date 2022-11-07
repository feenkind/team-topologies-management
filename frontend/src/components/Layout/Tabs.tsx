import * as React from 'react';
import { Box, Tab, Tabs as TabsComponent } from '@mui/material';
import { useState } from 'react';

interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<ITabPanelProps> = ({
  children,
  value,
  index,
}: ITabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}
    >
      {value === index && <Box sx={{ py: 3, px: 1 }}>{children}</Box>}
    </div>
  );
};

const Tabs: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabsComponent
          value={tabValue}
          onChange={(event, value) => {
            setTabValue(value);
          }}
        >
          <Tab
            label="Dummy Tab 1"
            id="simple-tab-0"
            aria-controls="simple-tabpanel-0"
          />
          <Tab
            label="Dummy Tab 2"
            id="simple-tab-1"
            aria-controls="simple-tabpanel-1"
          />
        </TabsComponent>
      </Box>
      <TabPanel value={tabValue} index={0}>
        Dummy Data for Tab 1
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        Dummy Data for Tab 2
      </TabPanel>
    </>
  );
};

export default Tabs;
