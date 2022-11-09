import * as React from 'react';
import TeamTopologyCategory from '../../components/Categories/TeamTopologyCategory';
import InformationGrid from '../../components/Layout/InformationGrid';
import { ITeam } from '../../store/slices/teamSlice';

interface ITeamViewInformationProps {
  team: ITeam;
}

const TeamViewInformation: React.FC<ITeamViewInformationProps> = ({
  team,
}: ITeamViewInformationProps) => {
  return (
    <InformationGrid
      informationItems={[
        {
          label: 'Name',
          content: team.name,
        },
        {
          label: 'Team Topology',
          content: <TeamTopologyCategory teamTopology={team.topology} />,
        },
      ]}
    />
  );
};

export default TeamViewInformation;
