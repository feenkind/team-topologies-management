import * as React from 'react';
import { Box, Tab, Tabs as TabsComponent } from '@mui/material';
import { useState } from 'react';
import TabPanel from './TabPanel';

interface ITabProps {
  tabContent: {
    tabName: string;
    tabIcon?: React.ReactElement;
    content: React.ReactNode | React.ReactNode[];
  }[];
}

const Tabs: React.FC<ITabProps> = ({ tabContent }: ITabProps) => {
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
          {tabContent.map((tab, index) => (
            <Tab
              key={`content-tab-${index}`}
              label={tab.tabName}
              id={`content-tab-${index}`}
              aria-controls={`content-tabpanel-${index}`}
              icon={tab.tabIcon}
              iconPosition={tab.tabIcon ? 'end' : undefined}
            />
          ))}
        </TabsComponent>
      </Box>
      {tabContent.map((tab, index) => (
        <TabPanel
          key={`content-tabpanel-${index}`}
          value={tabValue}
          index={index}
        >
          {tab.content}
        </TabPanel>
      ))}
    </>
  );
};

export default Tabs;
