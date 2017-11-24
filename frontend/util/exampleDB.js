import shortid from 'shortid';

export const docList = [
  { id: 1, title: 'WS1'}, { id: 2, title: 'WS2' }, { id: 3, title: 'WS3'}
];

const ws1 = {
  docName: 'WS1',
  course: 'ESL 301',
  docType: 'fill-in-the-blank',
  instructions: 'Fill in the blanks with the words in the bank.',
  probs: [
    {
      id: shortid.generate(),
      textPieces: [
        {
          text : "Three days was simply not a(n)",
          blank : false,
          id: shortid.generate(),
        },
        {
          text : "acceptable",
          blank : true,
          id: shortid.generate(),
        },
        {
          text : "amount of time to complete such a lot of work.",
          blank : false,
          id: shortid.generate(),
        },
      ]
    },
    {
      id: shortid.generate(),
      textPieces: [
        {
          text : "You don't need to be a(n)",
          blank : false,
          id: shortid.generate(),
        },
        {
          text : "genius",
          blank : true,
          id: shortid.generate(),
        },
        {
          text : "to see what the problem here is.",
          blank : false,
          id: shortid.generate(),
        },
      ]
    },
    {
      id: shortid.generate(),
      textPieces: [
        {
          text : "Make sure you read all the",
          blank : false,
          id: shortid.generate(),
        },
        {
          text : "instructions",
          blank : true,
          id: shortid.generate(),
        },
        {
          text : "carefully before setting up the device",
          blank : false,
          id: shortid.generate(),
        },
      ]
    },
  ]
};
