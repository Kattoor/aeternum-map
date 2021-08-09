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
  {
    category: 'chests',
    type: 'chests_ancient',
    title: 'Ancient',
    iconUrl: './pois/chests_ancient.webp',
  },
  {
    category: 'chests',
    type: 'chests_alchemy',
    title: 'Alchemy',
    iconUrl: './pois/chests_alchemy.webp',
  },
  {
    category: 'chests',
    type: 'chests_provisions',
    title: 'Provisions',
    iconUrl: './pois/chests_provisions.webp',
  },
  {
    category: 'chests',
    type: 'chests_supplies',
    title: 'Supplies',
    iconUrl: './pois/chests_supplies.webp',
  },
  {
    category: 'essences',
    type: 'essences_shockbulb',
    title: 'Shockbulb',
    iconUrl: './pois/essences_shockbulb.webp',
  },
  {
    category: 'essences',
    type: 'essences_shockspire',
    title: 'Shockspire',
    iconUrl: './pois/essences_shockspire.webp',
  },
  {
    category: 'essences',
    type: 'essences_ligthning_beetle',
    title: 'Ligthning Beetle',
    iconUrl: './pois/essences_ligthning_beetle.webp',
  },
  {
    category: 'essences',
    type: 'essences_blightroot',
    title: 'Blightroot',
    iconUrl: './pois/essences_blightroot.webp',
  },
  {
    category: 'essences',
    type: 'essences_blightcrag',
    title: 'Blightcrag',
    iconUrl: './pois/essences_blightcrag.webp',
  },
  {
    category: 'essences',
    type: 'essences_blightmoth',
    title: 'Blightmoth',
    iconUrl: './pois/essences_blightmoth.webp',
  },
  {
    category: 'essences',
    type: 'essences_earthspine',
    title: 'Earthspine',
    iconUrl: './pois/essences_earthspine.webp',
  },
  {
    category: 'essences',
    type: 'essences_earthcrag',
    title: 'Earthcrag',
    iconUrl: './pois/essences_earthcrag.webp',
  },
  {
    category: 'essences',
    type: 'essences_earthshell_turtle',
    title: 'Earthshell Turtle',
    iconUrl: './pois/essences_earthshell_turtle.webp',
  },
  {
    category: 'essences',
    type: 'essences_dragonglory',
    title: 'Dragonglory',
    iconUrl: './pois/essences_dragonglory.webp',
  },
  {
    category: 'essences',
    type: 'essences_scorchstone',
    title: 'Scorchstone',
    iconUrl: './pois/essences_scorchstone.webp',
  },
  {
    category: 'essences',
    type: 'essences_salamander_snail',
    title: 'Salamander Snail',
    iconUrl: './pois/essences_salamander_snail.webp',
  },
  {
    category: 'essences',
    type: 'essences_lifebloom',
    title: 'Lifebloom',
    iconUrl: './pois/essences_lifebloom.webp',
  },
  {
    category: 'essences',
    type: 'essences_lifejewel',
    title: 'Lifejewel',
    iconUrl: './pois/essences_lifejewel.webp',
  },
  {
    category: 'essences',
    type: 'essences_lifemoth',
    title: 'Lifemoth',
    iconUrl: './pois/essences_lifemoth.webp',
  },
  {
    category: 'essences',
    type: 'essences_soulsprout',
    title: 'Soulsprout',
    iconUrl: './pois/essences_soulsprout.webp',
  },
  {
    category: 'essences',
    type: 'essences_soulspire',
    title: 'Soulspire',
    iconUrl: './pois/essences_soulspire.webp',
  },
  {
    category: 'essences',
    type: 'essences_soulwyrm',
    title: 'Soulwyrm',
    iconUrl: './pois/essences_soulwyrm.webp',
  },
  {
    category: 'essences',
    type: 'essences_rivercress',
    title: 'Rivercress',
    iconUrl: './pois/essences_rivercress.webp',
  },
  {
    category: 'essences',
    type: 'essences_springstone',
    title: 'Springstone',
    iconUrl: './pois/essences_springstone.webp',
  },
  {
    category: 'essences',
    type: 'essences_floating_spinefish',
    title: 'Floating Spinefish',
    iconUrl: './pois/essences_floating_spinefish.webp',
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
  {
    value: 'chests',
    title: 'Chests',
    imgSrc: './filters/chests.webp',
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'chests'),
  },
  {
    value: 'essences',
    title: 'Essences',
    imgSrc: './filters/essences.webp',
    filters: mapFilters.filter(
      (mapFilter) => mapFilter.category === 'essences'
    ),
  },
];
