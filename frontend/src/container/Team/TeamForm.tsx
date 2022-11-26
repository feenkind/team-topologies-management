import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Tabs from '../../components/Layout/Tabs';
import TeamFormInformation from './TeamFormInformation';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TeamFormInteractions from './TeamFormInteractions';
import ControlledTextInput from '../../components/Form/ControlledTextInput';
import FormActions from '../../components/Form/FormActions';
import TeamFormWork from './TeamFormWork';
import TeamFormDependencies from './TeamFormDependencies';
import { getInvalidFieldNames } from './validateTeamFormSubmit';
import axiosInstance from '../../axios';
import { setDataLoaded, setNetworkError } from '../../store/slices/globalSlice';
import {
  IDomainOnTeams,
  ITeamImportWithAllData,
} from '../../store/slices/team/interfacesTeamImport';

export interface ITeamFormInput {
  changeNote: string;
  name: string;
  teamType: string;
  focus: string;
  domains: string[];
  fte: string;
  cognitiveLoad: string;
  platform: string;
  wikiSearchTerms: string;
  channels: { channelType: string; channelName: string }[];
  meetings: {
    purpose: string;
    dayOfWeek: string;
    duration: string;
    time: string;
  }[];

  services: {
    serviceName: string;
    serviceUrl: string;
    repository: string;
    versioningType: string;
  }[];
  workInProgress: { summary: string; repository: string }[];
  wayOfWorking: { wayOfWorkingName: string; additionalInformation: string }[];

  interactions: {
    otherTeamId: string;
    interactionMode: string;
    startDate: string;
    expectedDuration: string;
    interactionPurpose: string;
    additionalInformation?: string;
  }[];

  dependencies: {
    otherTeamId: string;
    dependencyType: string;
    dependencyDescription: string;
  }[];
}

const TeamForm: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { projectId, teamId } = useParams<{
    projectId: string;
    teamId: string;
  }>();

  const [teamData, setTeamData] = useState<ITeamImportWithAllData>();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<ITeamFormInput>();

  useEffect(() => {
    // make sure to always work with the newest data when editing
    if (teamId) {
      axiosInstance
        .get(`/teams/${teamId}`)
        .then((response) => {
          const data: ITeamImportWithAllData = response.data;
          setTeamData(data);
          reset({
            name: data.name,
            teamType: data.type,
            focus: data.focus,
            domains: data.DomainsOnTeams
              ? data.DomainsOnTeams.map(
                  (domain: IDomainOnTeams) => domain.domainId,
                )
              : [],
            fte: data.fte.toString(),
            cognitiveLoad: data.cognitiveLoad.toString(),
            platform: data.platform || '',
            wikiSearchTerms: data.wikiSearchTerms.join(', '),
            meetings: data.Meeting.map((meeting) => ({
              purpose: meeting.purpose,
              dayOfWeek: meeting.day,
              duration: meeting.durationMinutes.toString(),
              time: meeting.time,
            })),
            channels: data.CommunicationChannel.map((channel) => ({
              channelName: channel.name,
              channelType: channel.type,
            })),
            services: data.Service.map((service) => ({
              serviceName: service.name,
              serviceUrl: service.url || '',
              repository: service.repository || '',
              versioningType: service.versioning,
            })),
            workInProgress: data.Work.map((work) => ({
              summary: work.summary,
              repository: work.repository || '',
            })),
            wayOfWorking: data.WayOfWorking.map((way) => ({
              wayOfWorkingName: way.name,
              additionalInformation: way.url || '',
            })),
            interactions: data.interactionTeamTwo.map((interaction) => ({
              otherTeamId: interaction.teamIdTwo,
              interactionMode: interaction.interactionMode,
              startDate: interaction.startDate,
              interactionPurpose: interaction.purpose,
              expectedDuration: interaction.expectedDuration.toString(),
              additionalInformation: interaction.additionalInformation || '',
            })),
            dependencies: data.dependency.map((dependeny) => ({
              otherTeamId: dependeny.teamIdTo,
              dependencyType: dependeny.dependencyType,
              dependencyDescription: dependeny.description,
            })),
          });
        })
        .catch(() => {
          dispatch(setNetworkError(true));
        });
    } else {
      reset({
        name: '',
        teamType: '',
        focus: '',
        domains: [],
        fte: '',
        cognitiveLoad: '',
        platform: '',
        wikiSearchTerms: '',
        meetings: [],
        channels: [],
        services: [],
        workInProgress: [],
        wayOfWorking: [],
        interactions: [],
        dependencies: [],
      });
      setTeamData(undefined);
    }
  }, [teamId, setValue, setTeamData, teamData, dispatch, reset]);

  const onSubmit: SubmitHandler<ITeamFormInput> = async (data) => {
    // custom validation needed, for some reason react hook form does not
    // validate on submit if a form is hidden in a tab
    const invalidFieldNames = getInvalidFieldNames(data);
    if (invalidFieldNames.length > 0) {
      // any because react hook form uses string literal types and will not
      // match them to the strings of the array
      invalidFieldNames.forEach((name: any) => {
        setError(name, { type: 'required' });
      });
      return;
    }

    const team = {
      projectId: projectId,
      name: data.name,
      cognitiveLoad: parseInt(data.cognitiveLoad),
      fte: parseInt(data.fte),
      focus: data.focus,
      type: data.teamType,
      platform: data.platform || null,
      wikiSearchTearms: data.wikiSearchTerms
        ? data.wikiSearchTerms.split(',').map((term) => term.trim())
        : [],
      communicationChannels: data.channels.map((channel) => ({
        type: channel.channelType,
        name: channel.channelName,
      })),
      meetings: data.meetings
        ? data.meetings.map((meeting) => ({
            day: meeting.dayOfWeek,
            purpose: meeting.purpose,
            time: meeting.time,
            durationMinutes: parseInt(meeting.duration),
          }))
        : [],
      services: data.services
        ? data.services.map((service) => ({
            versioning: service.versioningType,
            name: service.serviceName,
            url: service.serviceUrl || null,
            repository: service.repository || null,
          }))
        : [],
      waysOfWorking: data.wayOfWorking
        ? data.wayOfWorking.map((way) => ({
            name: way.wayOfWorkingName,
            url: way.additionalInformation || null,
          }))
        : [],
      domainIds: data.domains || [],
      work: data.workInProgress
        ? data.workInProgress.map((work) => ({
            summary: work.summary,
            repository: work.repository || null,
          }))
        : [],
      dependencies: data.dependencies
        ? data.dependencies.map((dependency) => ({
            teamIdTo: dependency.otherTeamId,
            dependencyType: dependency.dependencyType,
            description: dependency.dependencyDescription,
          }))
        : [],
      interactions: data.interactions
        ? data.interactions.map((interaction) => ({
            teamTwo: interaction.otherTeamId,
            interactionMode: interaction.interactionMode,
            purpose: interaction.interactionPurpose,
            startDate: new Date(interaction.startDate),
            expectedDuration: parseInt(interaction.expectedDuration),
            additionalInformation: interaction.additionalInformation || null,
          }))
        : [],
    };

    if (!teamData) {
      axiosInstance
        .post('/teams', team)
        .then((response) => {
          // trigger new data loading from backend to refresh all data
          dispatch(setDataLoaded(false));
          // go to view after adding
          navigate(`/project/${projectId}/team/${response.data.id}`);
        })
        .catch(() => {
          dispatch(setNetworkError(true));
        });
    }
  };

  const informationError =
    !!errors.name ||
    !!errors.teamType ||
    !!errors.focus ||
    !!errors.domains ||
    !!errors.fte ||
    !!errors.cognitiveLoad ||
    !!errors.platform ||
    !!errors.wikiSearchTerms ||
    !!errors.channels ||
    !!errors.meetings;
  const workError =
    !!errors.services || !!errors.workInProgress || !!errors.wayOfWorking;
  const interactionsError = !!errors.interactions;
  const dependenciesError = !!errors.dependencies;

  return (
    <>
      <PageHeadline
        text={
          teamData
            ? `Edit team ${teamData.name}`
            : `Add a new new team to project ${currentProject.name}`
        }
      />
      <ContentWithHints isForm>
        <Tabs
          tabContent={[
            {
              tabName: 'Information',
              tabIcon: informationError ? (
                <ErrorOutlineIcon color="error" />
              ) : undefined,
              content: (
                <TeamFormInformation
                  register={register}
                  control={control}
                  errors={errors}
                />
              ),
            },
            {
              tabName: 'Work',
              tabIcon: workError ? (
                <ErrorOutlineIcon color="error" />
              ) : undefined,
              content: (
                <TeamFormWork
                  register={register}
                  control={control}
                  errors={errors}
                />
              ),
            },
            {
              tabName: 'Interactions',
              tabIcon: interactionsError ? (
                <ErrorOutlineIcon color="error" />
              ) : undefined,
              content: (
                <TeamFormInteractions
                  register={register}
                  control={control}
                  errors={errors}
                />
              ),
            },
            {
              tabName: 'Dependencies',
              tabIcon: dependenciesError ? (
                <ErrorOutlineIcon color="error" />
              ) : undefined,
              content: (
                <TeamFormDependencies
                  register={register}
                  control={control}
                  errors={errors}
                />
              ),
            },
          ]}
        />
        <FormActions
          onCancel={() => {
            navigate(-1);
          }}
          onSubmit={handleSubmit(onSubmit)}
          submitLabel={teamData ? 'Save changes to team' : 'Create new team'}
          changeNote={
            teamData && (
              <ControlledTextInput
                error={errors.changeNote}
                control={control}
                register={register}
                name="changeNote"
                label="Note"
                placeholder="The reason for your changes"
                required={true}
              />
            )
          }
        />
      </ContentWithHints>
    </>
  );
};

export default TeamForm;
