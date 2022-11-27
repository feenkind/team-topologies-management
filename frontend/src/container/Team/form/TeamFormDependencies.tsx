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
import ControlledSelect from '../../../components/Form/ControlledSelect';
import { ITeam } from '../../../store/slices/team/teamSlice';
import { useEffect, useState } from 'react';
import { dependencyType } from '../../../types/dependencyType';

interface ITeamFormDependenciesProps {
  register: UseFormRegister<ITeamFormInput>;
  control: Control<ITeamFormInput>;
  errors: FieldErrors<ITeamFormInput>;
  getValues: UseFormGetValues<ITeamFormInput>;
  otherTeams: ITeam[];
}

const TeamFormDependencies: React.FC<ITeamFormDependenciesProps> = ({
  register,
  control,
  errors,
  getValues,
  otherTeams,
}: ITeamFormDependenciesProps) => {
  const {
    fields: dependencyFields,
    append: appendDependency,
    remove: removeDependency,
  } = useFieldArray({
    control,
    name: 'dependencies',
  });

  const [availableTeams, setAvailableTeams] = useState<ITeam[]>(otherTeams);
  const [
    selectedDependencyOptionForDependencyField,
    setSelectedDependencyOptionForDependencyField,
  ] = useState<{ label: string; value: string }[][]>([]);
  const [recalculateTeamOptions, setRecalculateTeamOptions] =
    useState<boolean>(true);

  useEffect(() => {
    if (recalculateTeamOptions) {
      const selectedTeams = getValues().dependencies.map(
        (dependency) => dependency.otherTeamId,
      );
      setAvailableTeams(
        otherTeams.filter((team) => !selectedTeams.includes(team.id)),
      );

      setSelectedDependencyOptionForDependencyField(
        getValues().dependencies.map((values) => {
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
    setSelectedDependencyOptionForDependencyField,
    otherTeams,
    getValues,
  ]);

  return (
    <FormGroupWrapper caption="Team Dependencies">
      {dependencyFields.map((field, index) => (
        <FieldSet
          key={`dependencies.${index}`}
          removeButton={
            <FieldRemoveButton
              onClick={() => {
                // set available teams to all other teams is needed to prevent
                // out of range warnings - available teams will be filtered
                // again directly after removing
                setAvailableTeams(otherTeams);
                removeDependency(index);
                setRecalculateTeamOptions(true);
              }}
              tooltipText="Remove dependency"
            />
          }
        >
          <Grid item xs={12} md={6}>
            <ControlledSelect
              key={field.id}
              error={
                errors.dependencies
                  ? errors.dependencies[index]?.otherTeamId
                  : undefined
              }
              control={control}
              register={register}
              name={`dependencies.${index}.otherTeamId`}
              label="Dependency to"
              required={true}
              options={[
                ...availableTeams.map((team) => ({
                  label: team.name,
                  value: team.id,
                })),
                ...(selectedDependencyOptionForDependencyField[index] || []),
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
                errors.dependencies
                  ? errors.dependencies[index]?.dependencyType
                  : undefined
              }
              control={control}
              register={register}
              name={`dependencies.${index}.dependencyType`}
              label="Dependency type"
              required={true}
              options={Object.values(dependencyType).map((type) => ({
                label: type,
                value: type,
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledTextInput
              key={field.id}
              error={
                errors.dependencies
                  ? errors.dependencies[index]?.dependencyDescription
                  : undefined
              }
              required={true}
              control={control}
              register={register}
              name={`dependencies.${index}.dependencyDescription`}
              label="Description"
              placeholder="Description of the dependency"
              multiline
            />
          </Grid>
        </FieldSet>
      ))}

      <Grid item xs={12} md={12}>
        <FieldAddButton
          onClick={() =>
            appendDependency({
              otherTeamId: '',
              dependencyType: '',
              dependencyDescription: '',
            })
          }
          label={`Add ${
            dependencyFields.length === 0 ? 'a' : 'another'
          } dependency`}
        />
      </Grid>
    </FormGroupWrapper>
  );
};

export default TeamFormDependencies;
