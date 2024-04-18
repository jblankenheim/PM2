/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getLocation } from "../graphql/queries";
import { updateLocation } from "../graphql/mutations";
const client = generateClient();
export default function LocationUpdateForm(props) {
  const {
    id: idProp,
    location: locationModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    locationName: "",
    Lat: "",
    Long: "",
    pictureKeys: "",
  };
  const [locationName, setLocationName] = React.useState(
    initialValues.locationName
  );
  const [Lat, setLat] = React.useState(initialValues.Lat);
  const [Long, setLong] = React.useState(initialValues.Long);
  const [pictureKeys, setPictureKeys] = React.useState(
    initialValues.pictureKeys
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = locationRecord
      ? { ...initialValues, ...locationRecord }
      : initialValues;
    setLocationName(cleanValues.locationName);
    setLat(cleanValues.Lat);
    setLong(cleanValues.Long);
    setPictureKeys(cleanValues.pictureKeys);
    setErrors({});
  };
  const [locationRecord, setLocationRecord] = React.useState(locationModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getLocation.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getLocation
        : locationModelProp;
      setLocationRecord(record);
    };
    queryData();
  }, [idProp, locationModelProp]);
  React.useEffect(resetStateValues, [locationRecord]);
  const validations = {
    locationName: [],
    Lat: [],
    Long: [],
    pictureKeys: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          locationName: locationName ?? null,
          Lat: Lat ?? null,
          Long: Long ?? null,
          pictureKeys: pictureKeys ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateLocation.replaceAll("__typename", ""),
            variables: {
              input: {
                id: locationRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "LocationUpdateForm")}
      {...rest}
    >
      <TextField
        label="Location name"
        isRequired={false}
        isReadOnly={false}
        value={locationName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              locationName: value,
              Lat,
              Long,
              pictureKeys,
            };
            const result = onChange(modelFields);
            value = result?.locationName ?? value;
          }
          if (errors.locationName?.hasError) {
            runValidationTasks("locationName", value);
          }
          setLocationName(value);
        }}
        onBlur={() => runValidationTasks("locationName", locationName)}
        errorMessage={errors.locationName?.errorMessage}
        hasError={errors.locationName?.hasError}
        {...getOverrideProps(overrides, "locationName")}
      ></TextField>
      <TextField
        label="Lat"
        isRequired={false}
        isReadOnly={false}
        value={Lat}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              locationName,
              Lat: value,
              Long,
              pictureKeys,
            };
            const result = onChange(modelFields);
            value = result?.Lat ?? value;
          }
          if (errors.Lat?.hasError) {
            runValidationTasks("Lat", value);
          }
          setLat(value);
        }}
        onBlur={() => runValidationTasks("Lat", Lat)}
        errorMessage={errors.Lat?.errorMessage}
        hasError={errors.Lat?.hasError}
        {...getOverrideProps(overrides, "Lat")}
      ></TextField>
      <TextField
        label="Long"
        isRequired={false}
        isReadOnly={false}
        value={Long}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              locationName,
              Lat,
              Long: value,
              pictureKeys,
            };
            const result = onChange(modelFields);
            value = result?.Long ?? value;
          }
          if (errors.Long?.hasError) {
            runValidationTasks("Long", value);
          }
          setLong(value);
        }}
        onBlur={() => runValidationTasks("Long", Long)}
        errorMessage={errors.Long?.errorMessage}
        hasError={errors.Long?.hasError}
        {...getOverrideProps(overrides, "Long")}
      ></TextField>
      <TextField
        label="Picture keys"
        isRequired={false}
        isReadOnly={false}
        value={pictureKeys}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              locationName,
              Lat,
              Long,
              pictureKeys: value,
            };
            const result = onChange(modelFields);
            value = result?.pictureKeys ?? value;
          }
          if (errors.pictureKeys?.hasError) {
            runValidationTasks("pictureKeys", value);
          }
          setPictureKeys(value);
        }}
        onBlur={() => runValidationTasks("pictureKeys", pictureKeys)}
        errorMessage={errors.pictureKeys?.errorMessage}
        hasError={errors.pictureKeys?.hasError}
        {...getOverrideProps(overrides, "pictureKeys")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || locationModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || locationModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
