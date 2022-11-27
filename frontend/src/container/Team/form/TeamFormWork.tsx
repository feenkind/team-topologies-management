import * as React from 'react';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import { ITeamFormInput } from './TeamForm';
import FormGroupWrapper from '../../../components/Form/FormGroupWrapper';
import FieldAddButton from '../../../components/Form/FieldAddButton';
import { Grid } from '@mui/material';
import FieldRemoveButton from '../../../components/Form/FieldRemoveButton';
import FieldSet from '../../../components/Form/FieldSet';
import ControlledTextInput from '../../../components/Form/ControlledTextInput';
import ControlledSelect from '../../../components/Form/ControlledSelect';
import { versioningType } from '../../../constants/teamApi';

interface ITeamFormWorkProps {
  register: UseFormRegister<ITeamFormInput>;
  control: Control<ITeamFormInput>;
  errors: FieldErrors<ITeamFormInput>;
}

const TeamFormWork: React.FC<ITeamFormWorkProps> = ({
  register,
  control,
  errors,
}: ITeamFormWorkProps) => {
  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray({
    control,
    name: 'services',
  });

  const {
    fields: workInProgresFields,
    append: appendWorkInProgress,
    remove: removeWorkInProgress,
  } = useFieldArray({
    control,
    name: 'workInProgress',
  });

  const {
    fields: wayofWorkingFields,
    append: appendWayofWorking,
    remove: removeWayofWorking,
  } = useFieldArray({
    control,
    name: 'wayOfWorking',
  });

  return (
    <>
      <FormGroupWrapper caption="Services">
        {serviceFields.map((field, index) => (
          <FieldSet
            key={`services.${index}`}
            removeButton={
              <FieldRemoveButton
                onClick={() => removeService(index)}
                tooltipText="Remove service"
              />
            }
          >
            <Grid item xs={12} md={6}>
              <ControlledTextInput
                error={
                  errors.services
                    ? errors.services[index]?.serviceName
                    : undefined
                }
                required={true}
                control={control}
                register={register}
                name={`services.${index}.serviceName`}
                label="Service name"
                placeholder="Name of the service"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ControlledTextInput
                error={
                  errors.services
                    ? errors.services[index]?.serviceUrl
                    : undefined
                }
                control={control}
                register={register}
                name={`services.${index}.serviceUrl`}
                label="Service URL"
                placeholder="URL of the service"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ControlledTextInput
                error={
                  errors.services
                    ? errors.services[index]?.repository
                    : undefined
                }
                control={control}
                register={register}
                name={`services.${index}.repository`}
                label="Repository"
                placeholder="Repository URL of the service"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ControlledSelect
                error={
                  errors.services
                    ? errors.services[index]?.versioningType
                    : undefined
                }
                required={true}
                control={control}
                register={register}
                name={`services.${index}.versioningType`}
                label="Versioning Type"
                options={Object.values(versioningType).map((type) => ({
                  label: type,
                  value: type,
                }))}
              />
            </Grid>
          </FieldSet>
        ))}

        <Grid item xs={12} md={12}>
          <FieldAddButton
            onClick={() =>
              appendService({
                serviceName: '',
                serviceUrl: '',
                repository: '',
                versioningType: '',
              })
            }
            label={`Add ${
              serviceFields.length === 0 ? 'a' : 'another'
            } service`}
          />
        </Grid>
      </FormGroupWrapper>

      <FormGroupWrapper caption="Work in progress">
        {workInProgresFields.map((field, index) => (
          <FieldSet
            key={`workInProgress.${index}`}
            removeButton={
              <FieldRemoveButton
                onClick={() => removeWorkInProgress(index)}
                tooltipText="Remove work in progress"
              />
            }
          >
            <Grid item xs={12} md={6}>
              <ControlledTextInput
                error={
                  errors.workInProgress
                    ? errors.workInProgress[index]?.summary
                    : undefined
                }
                required={true}
                control={control}
                register={register}
                name={`workInProgress.${index}.summary`}
                label="Summary"
                placeholder="Short summary of the work in progress"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ControlledTextInput
                error={
                  errors.workInProgress
                    ? errors.workInProgress[index]?.repository
                    : undefined
                }
                control={control}
                register={register}
                name={`workInProgress.${index}.repository`}
                label="Repository"
                placeholder="Repository URL of the work in progress"
              />
            </Grid>
          </FieldSet>
        ))}

        <Grid item xs={12} md={12}>
          <FieldAddButton
            onClick={() =>
              appendWorkInProgress({
                summary: '',
                repository: '',
              })
            }
            label={`Add ${
              workInProgresFields.length === 0 ? 'a' : 'another'
            } work in progress`}
          />
        </Grid>
      </FormGroupWrapper>

      <FormGroupWrapper caption="Ways of working">
        {wayofWorkingFields.map((field, index) => (
          <FieldSet
            key={`wayOfWorking.${index}`}
            removeButton={
              <FieldRemoveButton
                onClick={() => removeWayofWorking(index)}
                tooltipText="Remove way of working"
              />
            }
          >
            <Grid item xs={12} md={6}>
              <ControlledTextInput
                error={
                  errors.wayOfWorking
                    ? errors.wayOfWorking[index]?.wayOfWorkingName
                    : undefined
                }
                required={true}
                control={control}
                register={register}
                name={`wayOfWorking.${index}.wayOfWorkingName`}
                label="Type of working"
                placeholder="e.g. Scrum"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ControlledTextInput
                error={
                  errors.wayOfWorking
                    ? errors.wayOfWorking[index]?.additionalInformation
                    : undefined
                }
                control={control}
                register={register}
                name={`wayOfWorking.${index}.additionalInformation`}
                label="Additional information (URL)"
                placeholder="URL to more information"
              />
            </Grid>
          </FieldSet>
        ))}

        <Grid item xs={12} md={12}>
          <FieldAddButton
            onClick={() =>
              appendWayofWorking({
                wayOfWorkingName: '',
                additionalInformation: '',
              })
            }
            label={`Add ${
              workInProgresFields.length === 0 ? 'a' : 'another'
            } way of working`}
          />
        </Grid>
      </FormGroupWrapper>
    </>
  );
};

export default TeamFormWork;
