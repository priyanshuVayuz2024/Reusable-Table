const facilityNameActions = [
  {
    label: "lowerCase",
  },
  {
    label: "upperCase",
  },
  { label: "captalize" },
];

// export const header = [
//   {
//     title: "facility name",
//     sortKey: "facilityName",
//     action: facilityNameActions,
//   },
//   {
//     title: "facility category",
//     sortKey: "facilityCategory",
//     action: facilityNameActions,
//   },
//   {
//     title: "intercom",
//     sortKey: "intercom",
//     action: facilityNameActions,
//   },
//   {
//     title: "Approval Needed",
//     sortKey: "approvalNeeded",
//     action: facilityNameActions,
//   },
//   {
//     title: "is Chargeable",
//     sortKey: "isChargeable",
//     action: facilityNameActions,
//   },
//   {
//     title: "is Fixed Time Slot",
//     sortKey: "isFixedTimeSlot",
//     action: facilityNameActions,
//   },
//   {
//     title: "usage Instruction",
//     sortKey: "usageInstruction",
//     action: facilityNameActions,
//   },
// ];
export const header = [
  {
    title: " title",
    sortKey: "title",
    action: facilityNameActions,
    isSearchAble: true,
  },
  {
    title: "brand",
    sortKey: "brand",
    action: facilityNameActions,
    isSearchAble: false,
  },
  {
    title: "category",
    sortKey: "category",
    action: facilityNameActions,
    isSearchAble: true,
  },
  {
    title: "price",
    sortKey: "price",
    action: facilityNameActions,
    isSearchAble: false,
  },
  {
    title: "rating",
    sortKey: "rating",
    action: facilityNameActions,
    isSearchAble: true,
  },
];

// export const dummyData = [
//     {
//         sno:
//     }
// ]

export const dummyTableData = [
  {
    name: {
      text: "Alice Johnson",
      url: "https://example.com/users/alice",
      link: true,
      id: "user1",
    },
    gender: {
      text: "Female",
      url: "",
      link: false,
      id: "gender1",
    },
    age: {
      text: "29",
      url: "",
      link: false,
      id: "age1",
    },
    place: {
      text: "New York",
      url: "https://maps.example.com/new-york",
      link: true,
      id: "place1",
    },
  },
  {
    name: {
      text: "Bob Smith",
      url: "https://example.com/users/bob",
      link: true,
      id: "user2",
    },
    gender: {
      text: "Male",
      url: "",
      link: false,
      id: "gender2",
    },
    age: {
      text: "35",
      url: "",
      link: false,
      id: "age2",
    },
    place: {
      text: "San Francisco",
      url: "https://maps.example.com/sf",
      link: true,
      id: "place2",
    },
  },
  {
    name: {
      text: "Charlie Lee",
      url: "https://example.com/users/charlie",
      link: true,
      id: "user3",
    },
    gender: {
      text: "Non-binary",
      url: "",
      link: false,
      id: "gender3",
    },
    age: {
      text: "22",
      url: "",
      link: false,
      id: "age3",
    },
    place: {
      text: "Chicago",
      url: "https://maps.example.com/chicago",
      link: true,
      id: "place3",
    },
  },
];
