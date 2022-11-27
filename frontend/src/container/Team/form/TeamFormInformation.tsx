import * as React from 'react';
import { Grid } from '@mui/material';
import FormGroupWrapper from '../../../components/Form/FormGroupWrapper';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import { ITeamFormInput } from './TeamForm';
import { useAppSelector } from '../../../hooks';
import ControlledTextInput from '../../../components/Form/ControlledTextInput';
import ControlledSelect from '../../../components/Form/ControlledSelect';
import FieldRemoveButton from '../../../components/Form/FieldRemoveButton';
import FieldSet from '../../../components/Form/FieldSet';
import FieldAddButton from '../../../components/Form/FieldAddButton';
import { teamType } from '../../../types/teamTypes';
import { meetingsDay } from '../../../types/meetingTypes';
import { channelType } from '../../../types/channelTypes';

interface ITeamFormInformationProps {
  register: UseFormRegister<ITeamFormInput>;
  control: Control<ITeamFormInput>;
  errors: FieldErrors<ITeamFormInput>;
}

const TeamFormInformation: React.FC<ITeamFormInformationProps> = ({
  register,
  control,
  errors,
}: ITeamFormInformationProps) => {
  const currentProject = useAppSelector(
    (state) => state.project.currentProject,
  );
  const projectDomains = useAppSelector(
    (state) => state.domain.domains[currentProject.id] || [],
  );

  const {
    fields: channelFields,
    append: appendChannel,
    remove: removeChannel,
  } = useFieldArray({
    control,
    name: 'channels',
  });

  const {
    fields: meetingFields,
    append: appendMeeting,
    remove: removeMeeting,
  } = useFieldArray({
    control,
    name: 'meetings',
  });

  return (
    <>
      <FormGroupWrapper caption="Basic">
        <Grid item xs={12} md={8}>
          <ControlledTextInput
            error={errors.name}
            control={control}
            register={register}
            name="name"
            label="Team name"
            placeholder="The name of the team"
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <ControlledSelect
            error={errors.teamType}
            control={control}
            register={register}
            name="teamType"
            label="Team Type"
            required
            options={Object.values(teamType).map((type) => {
              let label = type.toString();
              if (type === teamType.STREAM_ALIGNED) {
                label = 'stream-aligned';
              }
              if (type === teamType.COMPLICATED_SUBSYSTEM) {
                label = 'complicated subsystem';
              }
              return {
                label: label,
                value: type,
              };
            })}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <ControlledTextInput
            error={errors.focus}
            control={control}
            register={register}
            name="focus"
            label="Focus"
            placeholder="The focus of this team"
            required
            multiline={true}
          />
        </Grid>
      </FormGroupWrapper>

      <FormGroupWrapper caption="Additional">
        <Grid item xs={12} md={8}>
          <ControlledSelect
            error={errors.domains}
            control={control}
            register={register}
            name="domains"
            label="Domains"
            required
            options={projectDomains.map((domain) => ({
              label: domain.name,
              value: domain.id,
            }))}
            multiple={true}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <ControlledTextInput
            error={errors.fte}
            control={control}
            register={register}
            name="fte"
            required
            label="Full Time Equivalent"
            placeholder="Only full FTE allowed for now"
            isNumberField={true}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <ControlledTextInput
            error={errors.cognitiveLoad}
            control={control}
            register={register}
            required
            name="cognitiveLoad"
            label="Cognitive Load"
            placeholder="Cognitive load of this team"
            isNumberField={true}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <ControlledTextInput
            error={errors.platform}
            control={control}
            register={register}
            name="platform"
            label="Platform (if applicable)"
            placeholder="Platform this team is part of"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <ControlledTextInput
            error={errors.wikiSearchTerms}
            control={control}
            register={register}
            name="wikiSearchTerms"
            label="Wiki search terms"
            placeholder="Separate by comma"
          />
        </Grid>
      </FormGroupWrapper>

      <FormGroupWrapper caption="Meetings">
        {meetingFields.map((field, index) => (
          <FieldSet
            key={`meetings.${index}`}
            removeButton={
              <FieldRemoveButton
                onClick={() => removeMeeting(index)}
                tooltipText="Remove meeting"
              />
            }
          >
            <Grid item xs={12} md={4}>
              <ControlledTextInput
                key={field.id}
                error={
                  errors.meetings ? errors.meetings[index]?.purpose : undefined
                }
                required={true}
                control={control}
                register={register}
                name={`meetings.${index}.purpose`}
                label="Meeting purpose"
                placeholder="The purpose of this meeting"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <ControlledSelect
                key={field.id}
                error={
                  errors.meetings
                    ? errors.meetings[index]?.dayOfWeek
                    : undefined
                }
                required={true}
                control={control}
                register={register}
                name={`meetings.${index}.dayOfWeek`}
                label="Day of the week"
                options={Object.values(meetingsDay).map((type) => ({
                  label: type.charAt(0).toUpperCase() + type.slice(1),
                  value: type,
                }))}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <ControlledTextInput
                key={field.id}
                error={
                  errors.meetings ? errors.meetings[index]?.time : undefined
                }
                required={true}
                control={control}
                register={register}
                name={`meetings.${index}.time`}
                label="Time"
                placeholder="The hour of the meeting"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <ControlledTextInput
                key={field.id}
                error={
                  errors.meetings ? errors.meetings[index]?.duration : undefined
                }
                required={true}
                control={control}
                register={register}
                name={`meetings.${index}.duration`}
                label="Duration (in minutes)"
                placeholder="The duration of this meeting"
                isNumberField={true}
              />
            </Grid>
          </FieldSet>
        ))}
        <Grid item xs={12} md={12}>
          <FieldAddButton
            onClick={() =>
              appendMeeting({
                purpose: '',
                duration: '',
                dayOfWeek: '',
                time: '',
              })
            }
            label={`Add ${
              meetingFields.length === 0 ? 'a' : 'another'
            } meeting`}
          />
        </Grid>
      </FormGroupWrapper>

      <FormGroupWrapper caption="Contact">
        {channelFields.map((field, index) => (
          <FieldSet
            key={`channels.${index}`}
            removeButton={
              <FieldRemoveButton
                onClick={() => removeChannel(index)}
                tooltipText="Remove channel"
              />
            }
          >
            <Grid item xs={12} md={4}>
              <ControlledSelect
                key={field.id}
                error={
                  errors.channels
                    ? errors.channels[index]?.channelType
                    : undefined
                }
                required={true}
                control={control}
                register={register}
                name={`channels.${index}.channelType`}
                label="Channel type"
                options={Object.values(channelType).map((type) => ({
                  label: type,
                  value: type,
                }))}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <ControlledTextInput
                key={field.id}
                error={
                  errors.channels
                    ? errors.channels[index]?.channelName
                    : undefined
                }
                required={true}
                control={control}
                register={register}
                name={`channels.${index}.channelName`}
                label="Channel name"
                placeholder="e.g. #platform-team-xy"
              />
            </Grid>
          </FieldSet>
        ))}
        <Grid item xs={12} md={12}>
          <FieldAddButton
            onClick={() => appendChannel({ channelType: '', channelName: '' })}
            label={`Add ${
              channelFields.length === 0 ? 'a' : 'another'
            } contact channel`}
          />
        </Grid>
      </FormGroupWrapper>
    </>
  );
};

export default TeamFormInformation;
