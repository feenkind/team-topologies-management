import * as React from 'react';
import PageHeadline from '../../components/Layout/PageHeadline';
import ContentWithHints from '../../components/Layout/ContentWithHints';
import { useAppSelector } from '../../hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { IProject } from '../../store/slices/projectSlice';
import { useNavigate } from 'react-router-dom';
import Tabs from '../../components/Layout/Tabs';
import TeamFormInformation from './TeamFormInformation';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TeamFormInteractions from './TeamFormInteractions';
import ControlledTextInput from '../../components/Form/ControlledTextInput';
import FormActions from '../../components/Form/FormActions';
import TeamFormWork from './TeamFormWork';
import TeamFormDependencies from './TeamFormDependencies';
import { getInvalidFieldNames } from './validateTeamFormSubmit';

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
  wayofWorking: { wayofWorkingName: string; additionalInformation: string }[];

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
    additionalInformation: string;
  }[];
}

const TeamForm: React.FC = () => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );

  const [teamData, setTeamData] = useState<IProject>();

  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ITeamFormInput>();

  useEffect(() => {
    // setValue(`channels.0.channelType`, channelType.SLACK);
  }, [setValue]);

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
    console.log(data);
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
    !!errors.services || !!errors.workInProgress || !!errors.wayofWorking;
  const interactionsError = !!errors.interactions;
  const dependenciesError = !!errors.dependencies;

  return (
    <>
      <PageHeadline text={`Add a new team to project ${currentProject.name}`} />
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
