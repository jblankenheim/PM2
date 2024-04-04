/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateServiceDate = /* GraphQL */ `
  subscription OnCreateServiceDate(
    $filter: ModelSubscriptionServiceDateFilterInput
  ) {
    onCreateServiceDate(filter: $filter) {
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
export const onUpdateServiceDate = /* GraphQL */ `
  subscription OnUpdateServiceDate(
    $filter: ModelSubscriptionServiceDateFilterInput
  ) {
    onUpdateServiceDate(filter: $filter) {
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
export const onDeleteServiceDate = /* GraphQL */ `
  subscription OnDeleteServiceDate(
    $filter: ModelSubscriptionServiceDateFilterInput
  ) {
    onDeleteServiceDate(filter: $filter) {
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
export const onCreateLocation = /* GraphQL */ `
  subscription OnCreateLocation($filter: ModelSubscriptionLocationFilterInput) {
    onCreateLocation(filter: $filter) {
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
export const onUpdateLocation = /* GraphQL */ `
  subscription OnUpdateLocation($filter: ModelSubscriptionLocationFilterInput) {
    onUpdateLocation(filter: $filter) {
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
export const onDeleteLocation = /* GraphQL */ `
  subscription OnDeleteLocation($filter: ModelSubscriptionLocationFilterInput) {
    onDeleteLocation(filter: $filter) {
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
export const onCreateEquipment = /* GraphQL */ `
  subscription OnCreateEquipment(
    $filter: ModelSubscriptionEquipmentFilterInput
  ) {
    onCreateEquipment(filter: $filter) {
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
export const onUpdateEquipment = /* GraphQL */ `
  subscription OnUpdateEquipment(
    $filter: ModelSubscriptionEquipmentFilterInput
  ) {
    onUpdateEquipment(filter: $filter) {
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
export const onDeleteEquipment = /* GraphQL */ `
  subscription OnDeleteEquipment(
    $filter: ModelSubscriptionEquipmentFilterInput
  ) {
    onDeleteEquipment(filter: $filter) {
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
