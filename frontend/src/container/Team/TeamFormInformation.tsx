import * as React from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import FormGroupWrapper from '../../components/Form/FormGroupWrapper';
import FormElementWrapper from '../../components/Form/FormElementWrapper';
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import { ITeamFormInput } from './TeamForm';
import { teamType } from '../../constants/categories';
import { useAppSelector } from '../../hooks';
import { channelType } from '../../constants/teamApi';
import ControlledTextInput from '../../components/Form/ControlledTextInput';
import ControlledSelect from '../../components/Form/ControlledSelect';

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
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'channels',
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
            required={true}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <ControlledSelect
            error={errors.teamType}
            control={control}
            register={register}
            name="teamType"
            label="Team Type"
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
            required={true}
            multiline={true}
          />
        </Grid>
      </FormGroupWrapper>

      <FormGroupWrapper caption="Additional">
        <Grid item xs={12} md={4}>
          <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!errors.domains}
          >
            <InputLabel id="domains-select">Domains</InputLabel>
            <Controller
              name="domains"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <FormElementWrapper errors={errors.domains}>
                  <Select
                    {...field}
                    fullWidth
                    labelId="domains-select"
                    label="Domains"
                    multiple
                  >
                    {projectDomains.map((domain) => (
                      <MenuItem key={domain.id} value={domain.id}>
                        {domain.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormElementWrapper>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <ControlledTextInput
            error={errors.fte}
            control={control}
            register={register}
            name="fte"
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            Meetings
          </Grid>
        </Grid>
      </FormGroupWrapper>

      <FormGroupWrapper caption="Contact">
        <>
          {channelFields.map((field, index) => {
            return (
              <React.Fragment key={`channels.${index}`}>
                <Grid item xs={12} md={4}>
                  <ControlledSelect
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
                <Grid item xs={12} md={4}>
                  <ControlledTextInput
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
                <Grid item xs={12} md={4}>
                  <Button onClick={() => remove(index)}>Remove</Button>
                </Grid>
              </React.Fragment>
            );
          })}
          <Grid item xs={12} md={12}>
            <Button
              variant="outlined"
              onClick={() => append({ channelType: '', channelName: '' })}
            >
              {`Add ${
                channelFields.length === 0 ? 'a' : 'another'
              } contact channel`}
            </Button>
          </Grid>
        </>
      </FormGroupWrapper>
    </>
  );
};

export default TeamFormInformation;
