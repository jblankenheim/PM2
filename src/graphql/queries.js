/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getServiceDate = /* GraphQL */ `
  query GetServiceDate($id: ID!) {
    getServiceDate(id: $id) {
      id
      Greased
      CheckedBelt
      CheckedBearings
      equipmentID
      createdAt
      updatedAt
    }
  }
`;
export const listServiceDates = /* GraphQL */ `
  query ListServiceDates(
    $filter: ModelServiceDateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServiceDates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Greased
        CheckedBelt
        CheckedBearings
        equipmentID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const serviceDatesByEquipmentID = /* GraphQL */ `
  query ServiceDatesByEquipmentID(
    $equipmentID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelServiceDateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    serviceDatesByEquipmentID(
      equipmentID: $equipmentID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        Greased
        CheckedBelt
        CheckedBearings
        equipmentID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLocation = /* GraphQL */ `
  query GetLocation($id: ID!) {
    getLocation(id: $id) {
      id
      Name
      Equipment {
        items {
          name
          id
          GearBoxSize
          DriveBeltSize
          BearingSize
          locationID
          ServiceDates(sortDirection: DESC) {
            items {
              id
              ServiceDate
              equipmentID
              createdAt
              Greased
              CheckedBelt
              CheckedBearings
            }
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const listLocations = /* GraphQL */ `
  query ListLocations(
    $filter: ModelLocationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLocations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEquipment = /* GraphQL */ `
  query GetEquipment($id: ID!) {
    getEquipment(id: $id) {
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
      createdAt
      updatedAt
    }
  }
`;
export const listEquipment = /* GraphQL */ `
  query ListEquipment(
    $filter: ModelEquipmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEquipment(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        DriveBeltSize
        BearingSize
        GearBoxSize
        cupSize
        locationID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const equipmentByLocationID = /* GraphQL */ `
  query EquipmentByLocationID(
    $locationID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEquipmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    equipmentByLocationID(
      locationID: $locationID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        DriveBeltSize
        BearingSize
        GearBoxSize
        cupSize
        locationID
        createdAt
        updatedAt
        ServiceDates(sortDirection: DESC) {
          items {
            id
            ServiceDate
            equipmentID
            createdAt
            Greased
            CheckedBelt
            CheckedBearings
          }
        }
      }
      nextToken
    }
  }
`;
