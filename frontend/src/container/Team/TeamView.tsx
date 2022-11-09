import * as React from 'react';
import { useParams } from 'react-router-dom';
import Page404 from '../../components/Page404';
import { useAppSelector } from '../../hooks';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import Tabs from '../../components/Layout/Tabs';
import InformationGrid from '../../components/Layout/InformationGrid';
import TeamTopologyCategory from '../../components/Categories/TeamTopologyCategory';
import ButtonLink from '../../components/Buttons/ButtonLink';

const TeamView: React.FC = () => {
  const { teamId } = useParams<{
    teamId: string;
  }>();
  const team = useAppSelector((state) =>
    state.team.teams.find((team) => teamId && team.id === teamId),
  );
  const projects = useAppSelector((state) => state.project.projects);

  if (!teamId || !team) {
    return <Page404 />;
  }

  return (
    <>
      <PageHeadline text={`Team ${team.name}`} />
      <ContentWithHints>
        <Tabs
          tabContent={[
            {
              tabName: 'Information',
              content: (
                <InformationGrid
                  informationItems={[
                    {
                      label: 'Name',
                      content: team.name,
                    },
                    {
                      label: 'Team Topology',
                      content: (
                        <TeamTopologyCategory teamTopology={team.topology} />
                      ),
                    },
                    // TODO: maybe remove in team display for one specific
                    //  project
                    {
                      label: 'Projects',
                      content: team.projects?.map((teamProject) => {
                        const projectData = projects.find(
                          (project) => project.id === teamProject,
                        );
                        if (projectData) {
                          return (
                            <ButtonLink
                              key={projectData.id}
                              label={projectData.name}
                              url={`/project/${projectData.id}`}
                            />
                          );
                        }
                      }),
                    },
                  ]}
                />
              ),
            },
            { tabName: 'Work', content: 'coming soon' },
            { tabName: 'Interactions', content: 'coming soon' },
            { tabName: 'Dependencies', content: 'coming soon' },
            { tabName: 'Cognitive Load', content: 'coming soon' },
            { tabName: 'History', content: 'coming later' },
          ]}
        />
      </ContentWithHints>
    </>
  );
};

export default TeamView;
