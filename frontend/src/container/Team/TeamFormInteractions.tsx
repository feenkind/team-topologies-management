import * as React from 'react';
import { Grid } from '@mui/material';
import FormGroupWrapper from '../../components/Form/FormGroupWrapper';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import { ITeamFormInput } from './TeamForm';
import FieldAddButton from '../../components/Form/FieldAddButton';
import FieldSet from '../../components/Form/FieldSet';
import FieldRemoveButton from '../../components/Form/FieldRemoveButton';
import ControlledTextInput from '../../components/Form/ControlledTextInput';
import ControlledDateInput from '../../components/Form/ControlleDateInput';
import ControlledSelect from '../../components/Form/ControlledSelect';
import { interactionMode } from '../../constants/categories';
import { ITeam } from '../../store/slices/team/teamSlice';

interface ITeamFormInteractionsProps {
  register: UseFormRegister<ITeamFormInput>;
  control: Control<ITeamFormInput>;
  errors: FieldErrors<ITeamFormInput>;
  otherTeams: ITeam[];
}

const TeamFormInteractions: React.FC<ITeamFormInteractionsProps> = ({
  register,
  control,
  errors,
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

  return (
    <FormGroupWrapper caption="Team Interactions">
      {interactionFields.map((field, index) => (
        <FieldSet
          key={`interactions.${index}`}
          removeButton={
            <FieldRemoveButton
              onClick={() => removeInteraction(index)}
              tooltipText="Remove interaction"
            />
          }
        >
          <Grid item xs={12} md={6}>
            <ControlledSelect
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
              options={otherTeams.map((team) => ({
                label: team.name,
                value: team.id,
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledSelect
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
