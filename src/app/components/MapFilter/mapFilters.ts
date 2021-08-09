export type FilterItem = {
  type: string;
  category: string;
  title: string;
  iconUrl: string;
  hasName?: boolean;
};

export const mapFilters: FilterItem[] = [
  {
    category: 'fishing',
    type: 'fish_hotspot1',
    title: 'Fish Hotspot (Broad)',
    iconUrl: './pois/fish_hotspot1.webp',
  },
  {
    category: 'fishing',
    type: 'fish_hotspot2',
    title: 'Fish Hotspot (Rare)',
    iconUrl: './pois/fish_hotspot2.webp',
  },
  {
    category: 'fishing',
    type: 'fish_hotspot3',
    title: 'Fish Hotspot (Secret)',
    iconUrl: './pois/fish_hotspot3.webp',
  },
  {
    category: 'farming',
    type: 'hemp',
    title: 'Hemp',
    iconUrl: './pois/hemp_compass.webp',
  },
  {
    category: 'logging',
    type: 'ironwood',
    title: 'Ironwood Tree',
    iconUrl: './pois/ironwood_compass.webp',
  },
  {
    category: 'logging',
    type: 'wyrdwood',
    title: 'Wyrdwood Tree',
    iconUrl: './pois/wyrdwood_compass.webp',
  },
  {
    category: 'npc',
    type: 'npc_generic',
    title: 'Generic',
    iconUrl: './pois/npc_generic.webp',
    hasName: true,
  },
  {
    category: 'npc',
    type: 'npc_inn',
    title: 'Inn',
    iconUrl: './pois/npc_inn.webp',
    hasName: true,
  },
  {
    category: 'npc',
    type: 'npc_convenant',
    title: 'Convenant',
    iconUrl: './pois/npc_convenant.webp',
    hasName: true,
  },
  {
    category: 'npc',
    type: 'npc_marauder',
    title: 'Marauder',
    iconUrl: './pois/npc_marauder.webp',
    hasName: true,
  },
  {
    category: 'npc',
    type: 'npc_syndicate',
    title: 'Syndicate',
    iconUrl: './pois/npc_syndicate.webp',
    hasName: true,
  },
  {
    category: 'lore',
    type: 'lore_note',
    title: 'Lore Note',
    iconUrl: './pois/lore_note.webp',
    hasName: true,
  },
];

export type MapFiltersCategory = {
  value: string;
  title: string;
  imgSrc: string;
  filters: FilterItem[];
};

export const mapFiltersCategories: MapFiltersCategory[] = [
  {
    value: 'fishing',
    title: 'Fishing',
    imgSrc: './filters/fishing.webp',
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'fishing'),
  },
  {
    value: 'farming',
    title: 'Farming',
    imgSrc: './filters/harvesting.webp',
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'farming'),
  },
  {
    value: 'logging',
    title: 'Logging',
    imgSrc: './filters/logging.webp',
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'logging'),
  },
  {
    value: 'mining',
    title: 'Mining',
    imgSrc: './filters/mining.webp',
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'mining'),
  },
  {
    value: 'skinning',
    title: 'Skinning',
    imgSrc: './filters/tracking.webp',
    filters: mapFilters.filter(
      (mapFilter) => mapFilter.category === 'skinning'
    ),
  },
  {
    value: 'npc',
    title: 'NPC',
    imgSrc: './filters/npc.webp',
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'npc'),
  },
  {
    value: 'lore',
    title: 'Lore',
    imgSrc: './filters/lore.webp',
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'lore'),
  },
];
