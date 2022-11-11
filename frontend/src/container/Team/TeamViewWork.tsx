import * as React from 'react';
import { ITeam } from '../../store/slices/teamSlice';
import { Link, Paper, Typography } from '@mui/material';
import Table from '../../components/Table/Table';

interface ITeamViewWorkProps {
  team: ITeam;
}

const TeamViewWork: React.FC<ITeamViewWorkProps> = ({
  team,
}: ITeamViewWorkProps) => {
  return (
    <>
      <Typography variant="button" component="h3" marginBottom={4}>
        Services
      </Typography>
      <Paper variant="outlined">
        {team.services && team.services.length > 0 ? (
          <Table
            headerItems={['Name', 'URL', 'Repository', 'Versioning Type']}
            headerItemWidthsInPercentage={[25, 25, 30, 20]}
            contentItems={team.services.map((service, index) => [
              service.name,
              <Link key={`serviceUrl${index}`} href={service.url}>
                {service.name}
              </Link>,
              <Link key={`serviceRepository${index}`} href={service.repository}>
                {service.name} repository
              </Link>,
              service.versioningType,
            ])}
          />
        ) : (
          <Typography p={2}>
            This team does not provide any services.
          </Typography>
        )}
      </Paper>

      <Typography
        variant="button"
        component="h3"
        marginTop={9}
        marginBottom={4}
      >
        Work in Progress
      </Typography>
      <Paper variant="outlined">
        {team.workInProgress && team.workInProgress.length > 0 ? (
          <Table
            headerItems={['Summary', 'Repository']}
            headerItemWidthsInPercentage={[50, 50]}
            contentItems={team.workInProgress.map((work, index) => [
              work.summary,
              work.repository && (
                <Link key={`wipUrl${index}`} href={work.repository}>
                  See the repository
                </Link>
              ),
            ])}
          />
        ) : (
          <Typography p={2}>
            This team is currently not working on anything.
          </Typography>
        )}
      </Paper>

      <Typography
        variant="button"
        component="h3"
        marginTop={9}
        marginBottom={4}
      >
        Ways of working
      </Typography>
      <Paper variant="outlined">
        {team.waysOfWorking && team.waysOfWorking.length > 0 ? (
          <Table
            headerItems={['Name', 'More information']}
            headerItemWidthsInPercentage={[50, 50]}
            contentItems={team.waysOfWorking.map((way, index) => [
              way.name,
              way.url && (
                <Link key={`wayOfWorkingUrl${index}`} href={way.url}>
                  {way.url}
                </Link>
              ),
            ])}
          />
        ) : (
          <Typography p={2}>
            This team has no specific way of working.
          </Typography>
        )}
      </Paper>
    </>
  );
};

export default TeamViewWork;
