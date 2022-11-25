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

export interface ITeamFormInput {
  changeNote: string;
  name: string;
  teamType: string;
  focus: string;
  domains: string[];
  fte: number;
  cognitiveLoad: number;
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
    serviceUrl?: string;
    repository?: string;
    versioningType: string;
  }[];

  expectedDuration: string;
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
    //TODO: extend also add number validation
    let invalid = false;
    if (data.name.length === 0) {
      setError('name', { type: 'required' });
      invalid = true;
    }
    if (data.teamType.length === 0) {
      setError('teamType', { type: 'required' });
      invalid = true;
    }

    if (invalid) {
      return;
    }
    console.log(data);
  };

  // TODO: extend
  const informationError = !!errors.name && !!errors.teamType && !!errors.focus;
  const interactionsError = !!errors.expectedDuration;

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
            { tabName: 'Work', content: '' },
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
            { tabName: 'Dependencies', content: '' },
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
