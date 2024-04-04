/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createServiceDate = /* GraphQL */ `
  mutation CreateServiceDate(
    $input: CreateServiceDateInput!
    $condition: ModelServiceDateConditionInput
  ) {
    createServiceDate(input: $input, condition: $condition) {
      id
      Greased
      CheckedBelt
      CheckedBearings
      equipmentID
      dateOfService
      notes
      createdAt
      updatedAt
    }
  }
`;
export const updateServiceDate = /* GraphQL */ `
  mutation UpdateServiceDate(
    $input: UpdateServiceDateInput!
    $condition: ModelServiceDateConditionInput
  ) {
    updateServiceDate(input: $input, condition: $condition) {
      id
      Greased
      CheckedBelt
      CheckedBearings
      equipmentID
      dateOfService
      notes
      createdAt
      updatedAt
    }
  }
`;
export const deleteServiceDate = /* GraphQL */ `
  mutation DeleteServiceDate(
    $input: DeleteServiceDateInput!
    $condition: ModelServiceDateConditionInput
  ) {
    deleteServiceDate(input: $input, condition: $condition) {
      id
      Greased
      CheckedBelt
      CheckedBearings
      equipmentID
      dateOfService
      notes
      createdAt
      updatedAt
    }
  }
`;
export const createLocation = /* GraphQL */ `
  mutation CreateLocation(
    $input: CreateLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    createLocation(input: $input, condition: $condition) {
      id
      Name
      Equipment {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateLocation = /* GraphQL */ `
  mutation UpdateLocation(
    $input: UpdateLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    updateLocation(input: $input, condition: $condition) {
      id
      Name
      Equipment {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteLocation = /* GraphQL */ `
  mutation DeleteLocation(
    $input: DeleteLocationInput!
    $condition: ModelLocationConditionInput
  ) {
    deleteLocation(input: $input, condition: $condition) {
      id
      Name
      Equipment {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createEquipment = /* GraphQL */ `
  mutation CreateEquipment(
    $input: CreateEquipmentInput!
    $condition: ModelEquipmentConditionInput
  ) {
    createEquipment(input: $input, condition: $condition) {
      id
      name
      DriveBeltSize
      BearingSize
      GearBoxSize
      cupSize
      locationID
      ServiceDates {
        nextToken
      }
      Location {
        id
        Name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateEquipment = /* GraphQL */ `
  mutation UpdateEquipment(
    $input: UpdateEquipmentInput!
    $condition: ModelEquipmentConditionInput
  ) {
    updateEquipment(input: $input, condition: $condition) {
      id
      name
      DriveBeltSize
      BearingSize
      GearBoxSize
      cupSize
      locationID
      ServiceDates {
        nextToken
      }
      Location {
        id
        Name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteEquipment = /* GraphQL */ `
  mutation DeleteEquipment(
    $input: DeleteEquipmentInput!
    $condition: ModelEquipmentConditionInput
  ) {
    deleteEquipment(input: $input, condition: $condition) {
      id
      name
      DriveBeltSize
      BearingSize
      GearBoxSize
      cupSize
      locationID
      ServiceDates {
        nextToken
      }
      Location {
        id
        Name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
