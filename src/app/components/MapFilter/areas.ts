export type Area = {
  title: string;
  items?: Area[];
  position?: [number, number];
};

export const areas: Area[] = [
  {
    title: 'Aeternum',
    items: [
      {
        title: 'First Light',
        items: [
          { title: 'First Light Town', position: [8833, 751] },
          { title: 'Fort First Light', position: [9964, 1297] },
        ],
      },
      {
        title: 'Cutlass Keys',
        items: [
          { title: 'Fort Ramos', position: [7242, 938] },
          { title: 'Pond Scum Fort', position: [6868, 376] },
        ],
      },
    ],
  },
];
