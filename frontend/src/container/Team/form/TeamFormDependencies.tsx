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
import FieldAddButton from '../../../components/Form/FieldAddButton';
import FieldSet from '../../../components/Form/FieldSet';
import FieldRemoveButton from '../../../components/Form/FieldRemoveButton';
import ControlledTextInput from '../../../components/Form/ControlledTextInput';
import ControlledSelect from '../../../components/Form/ControlledSelect';
import { dependencyType } from '../../../constants/categories';
import { ITeam } from '../../../store/slices/team/teamSlice';

interface ITeamFormDependenciesProps {
  register: UseFormRegister<ITeamFormInput>;
  control: Control<ITeamFormInput>;
  errors: FieldErrors<ITeamFormInput>;
  otherTeams: ITeam[];
}

const TeamFormDependencies: React.FC<ITeamFormDependenciesProps> = ({
  register,
  control,
  errors,
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

  return (
    <FormGroupWrapper caption="Team Dependencies">
      {dependencyFields.map((field, index) => (
        <FieldSet
          key={`dependencies.${index}`}
          removeButton={
            <FieldRemoveButton
              onClick={() => removeDependency(index)}
              tooltipText="Remove dependency"
            />
          }
        >
          <Grid item xs={12} md={6}>
            <ControlledSelect
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
              options={otherTeams.map((team) => ({
                label: team.name,
                value: team.id,
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <ControlledSelect
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
