import * as React from 'react';
import { Grid } from '@mui/material';
import FormGroupWrapper from '../../../components/Form/FormGroupWrapper';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';
import { ITeamFormInput } from './TeamForm';
import FieldAddButton from '../../../components/Form/FieldAddButton';
import FieldSet from '../../../components/Form/FieldSet';
import FieldRemoveButton from '../../../components/Form/FieldRemoveButton';
import ControlledTextInput from '../../../components/Form/ControlledTextInput';
import ControlledDateInput from '../../../components/Form/ControlledDateInput';
import ControlledSelect from '../../../components/Form/ControlledSelect';
import { interactionMode } from '../../../constants/categories';
import { ITeam } from '../../../store/slices/team/teamSlice';
import { useEffect, useState } from 'react';

interface ITeamFormInteractionsProps {
  register: UseFormRegister<ITeamFormInput>;
  control: Control<ITeamFormInput>;
  errors: FieldErrors<ITeamFormInput>;
  getValues: UseFormGetValues<ITeamFormInput>;
  otherTeams: ITeam[];
}

const TeamFormInteractions: React.FC<ITeamFormInteractionsProps> = ({
  register,
  control,
  errors,
  getValues,
  otherTeams,
}: ITeamFormInteractionsProps) => {
  const {
    fields: interactionFields,
    append: appendInteraction,
    remove: removeInteraction,
  } = useFieldArray({
    control,
    name: 'interactions',
  });

  const [availableTeams, setAvailableTeams] = useState<ITeam[]>(otherTeams);
  const [
    selectedInteractionOptionForInteractionField,
    setSelectedInteractionOptionForInteractionField,
  ] = useState<{ label: string; value: string }[][]>([]);
  const [recalculateTeamOptions, setRecalculateTeamOptions] =
    useState<boolean>(true);

  useEffect(() => {
    if (recalculateTeamOptions) {
      const selectedTeams = getValues().interactions.map(
        (interaction) => interaction.otherTeamId,
      );
      setAvailableTeams(
        otherTeams.filter((team) => !selectedTeams.includes(team.id)),
      );

      setSelectedInteractionOptionForInteractionField(
        getValues().interactions.map((values) => {
          const teamId = values.otherTeamId;
          const team = otherTeams.find((team) => team.id === teamId);
          if (team) {
            return [{ label: team.name, value: teamId }];
          }
          return [];
        }),
      );

      setRecalculateTeamOptions(false);
    }
  }, [
    recalculateTeamOptions,
    setRecalculateTeamOptions,
    setAvailableTeams,
    setSelectedInteractionOptionForInteractionField,
    otherTeams,
    getValues,
  ]);

  return (
    <FormGroupWrapper caption="Team Interactions">
      {interactionFields.map((field, index) => (
        <FieldSet
          key={`interactions.${index}`}
          removeButton={
            <FieldRemoveButton
              onClick={() => {
                // set available teams to all other teams is needed to prevent
                // out of range warnings - available teams will be filtered
                // again directly after removing
                setAvailableTeams(otherTeams);
                removeInteraction(index);
                setRecalculateTeamOptions(true);
              }}
              tooltipText="Remove interaction"
            />
          }
        >
          <Grid item xs={12} md={6}>
            <ControlledSelect
              key={field.id}
              error={
                errors.interactions
                  ? errors.interactions[index]?.otherTeamId
                  : undefined
              }
              control={control}
              register={register}
              name={`interactions.${index}.otherTeamId`}
              label="Interaction with"
              required={true}
              options={[
                ...availableTeams.map((team) => ({
                  label: team.name,
                  value: team.id,
                })),
                ...(selectedInteractionOptionForInteractionField[index] || []),
              ]}
              additionalOnSelect={() => {
                setRecalculateTeamOptions(true);
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledSelect
              key={field.id}
              error={
                errors.interactions
                  ? errors.interactions[index]?.interactionMode
                  : undefined
              }
              control={control}
              register={register}
              name={`interactions.${index}.interactionMode`}
              label="Interaction mode"
              required={true}
              options={Object.values(interactionMode).map((mode) => {
                let label = mode.toString();
                if (mode === interactionMode.X_AS_A_SERVICE) {
                  label = 'x-as-a-service';
                }
                return {
                  label: label,
                  value: mode,
                };
              })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledDateInput
              key={field.id}
              error={
                errors.interactions
                  ? errors.interactions[index]?.startDate
                  : undefined
              }
              control={control}
              register={register}
              name={`interactions.${index}.startDate`}
              label="Start date"
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledTextInput
              key={field.id}
              error={
                errors.interactions
                  ? errors.interactions[index]?.expectedDuration
                  : undefined
              }
              required={true}
              control={control}
              register={register}
              name={`interactions.${index}.expectedDuration`}
              label="Expected duration (in weeks)"
              placeholder="Expected interaction duration"
              isNumberField
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledTextInput
              key={field.id}
              error={
                errors.interactions
                  ? errors.interactions[index]?.interactionPurpose
                  : undefined
              }
              required={true}
              control={control}
              register={register}
              name={`interactions.${index}.interactionPurpose`}
              label="Purpose"
              placeholder="Purpose of the interaction"
              multiline
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledTextInput
              key={field.id}
              error={
                errors.interactions
                  ? errors.interactions[index]?.additionalInformation
                  : undefined
              }
              control={control}
              register={register}
              name={`interactions.${index}.additionalInformation`}
              label="Additional information"
              placeholder="Additional notes to this interaction"
              multiline
            />
          </Grid>
        </FieldSet>
      ))}

      <Grid item xs={12} md={12}>
        <FieldAddButton
          onClick={() =>
            appendInteraction({
              otherTeamId: '',
              interactionMode: '',
              startDate: '',
              expectedDuration: '',
              interactionPurpose: '',
              additionalInformation: '',
            })
          }
          label={`Add ${
            interactionFields.length === 0 ? 'an' : 'another'
          } interaction`}
        />
      </Grid>
    </FormGroupWrapper>
  );
};

export default TeamFormInteractions;
