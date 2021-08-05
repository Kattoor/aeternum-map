export type FilterItem = {
  type: string;
  title: string;
  iconUrl: string;
};

export const mapFilters: {
  value: string;
  title: string;
  imgSrc: string;
  items: FilterItem[];
}[] = [
  {
    value: 'fishing',
    title: 'Fishing',
    imgSrc: '/filters/fishing.webp',
    items: [
      {
        type: 'fish_hotspot1',
        title: 'Fish Hotspot (Broad)',
        iconUrl: '/pois/fish_hotspot1.webp',
      },
      {
        type: 'fish_hotspot2',
        title: 'Fish Hotspot (Rare)',
        iconUrl: '/pois/fish_hotspot2.webp',
      },
      {
        type: 'fish_hotspot3',
        title: 'Fish Hotspot (Secret)',
        iconUrl: '/pois/fish_hotspot3.webp',
      },
    ],
  },
  {
    value: 'farming',
    title: 'Farming',
    imgSrc: '/filters/harvesting.webp',
    items: [
      {
        type: 'hemp',
        title: 'Hemp',
        iconUrl: '/pois/hemp_compass.webp',
      },
    ],
  },
  {
    value: 'logging',
    title: 'Logging',
    imgSrc: '/filters/logging.webp',
    items: [
      {
        type: 'ironwood',
        title: 'Ironwood Tree',
        iconUrl: '/pois/ironwood_compass.webp',
      },
      {
        type: 'wyrdwood',
        title: 'Wyrdwood Tree',
        iconUrl: '/pois/wyrdwood_compass.webp',
      },
    ],
  },
  {
    value: 'mining',
    title: 'Mining',
    imgSrc: '/filters/mining.webp',
    items: [],
  },
  {
    value: 'skinning',
    title: 'Skinning',
    imgSrc: '/filters/tracking.webp',
    items: [],
  },
];
