import * as React from 'react';
import PriorityCategory from '../../components/Categories/PriorityCategory';
import ComplexityCategory from '../../components/Categories/ComplexityCategory';
import TeamLink from '../../components/Buttons/TeamLink';
import InformationGrid from '../../components/Layout/InformationGrid';
import { IDomain } from '../../store/slices/domainSlice';
import { useAppSelector } from '../../hooks';

interface IDomainViewInformationProps {
  domain: IDomain;
}

const DomainViewInformation: React.FC<IDomainViewInformationProps> = ({
  domain,
}: IDomainViewInformationProps) => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const teams = useAppSelector((state) => state.team.teams[currentProject.id]);
  const domainTeams =
    teams && teams.filter((team) => team.domains?.includes(domain.id));

  return (
    <InformationGrid
      informationItems={[
        {
          label: 'Name',
          content: domain.name,
        },
        {
          label: 'Priority',
          content: <PriorityCategory priority={domain.priority} />,
        },
        {
          label: 'Complexity',
          content: <ComplexityCategory complexity={domain.complexity} />,
        },
        {
          label: 'FTE sum of all teams',
          content: domainTeams
            ? domainTeams.reduce((fteSum, team) => fteSum + team.fte, 0)
            : 0,
        },
        {
          label: 'Responsible team(s)',
          content:
            domainTeams &&
            domainTeams.map((team) => (
              <TeamLink
                key={team.id}
                teamType={team.type}
                url={`/project/${currentProject.id}/team/${team.id}`}
                label={team.name}
              />
            )),
        },
        {
          label: 'Description',
          content: domain.description,
        },
      ]}
    />
  );
};

export default DomainViewInformation;
