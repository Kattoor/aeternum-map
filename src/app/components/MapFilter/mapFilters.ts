import { i18n } from '../../i18n/i18n';

export type FilterItem = {
  type: string;
  category: string;
  title: string;
  iconUrl: string;
  hasName?: boolean;
  hasLevel?: boolean;
};

export const mapFilters: FilterItem[] = [
  {
    category: 'locations',
    type: 'expedition',
    title: i18n('Expedition'),
    iconUrl: '/pois/expedition.webp',
  },
  {
    category: 'locations',
    type: 'fort',
    title: i18n('Fort'),
    iconUrl: '/pois/fort.webp',
  },
  {
    category: 'locations',
    type: 'outpost',
    title: i18n('Outpost'),
    iconUrl: '/pois/outpost.webp',
  },
  {
    category: 'locations',
    type: 'settlement',
    title: i18n('Settlement'),
    iconUrl: '/pois/settlement.webp',
  },
  {
    category: 'locations',
    type: 'spiritShrine',
    title: i18n('Spirit Shrine'),
    iconUrl: '/pois/spiritShrine.webp',
  },
  {
    category: 'chests',
    type: 'chests_t1',
    title: i18n('Chest T1'),
    iconUrl: '/pois/chest.webp',
  },
  {
    category: 'chests',
    type: 'chests_t2',
    title: i18n('Chest T2'),
    iconUrl: '/pois/chest.webp',
  },
  {
    category: 'chests',
    type: 'chests_t3',
    title: i18n('Chest T3'),
    iconUrl: '/pois/chest.webp',
  },
  {
    category: 'chests',
    type: 'chests_t4',
    title: i18n('Chest T4'),
    iconUrl: '/pois/chest.webp',
  },
  {
    category: 'chests',
    type: 'chests_t5',
    title: i18n('Chest T5'),
    iconUrl: '/pois/chest.webp',
  },
  {
    category: 'enemies',
    type: 'boss',
    title: 'Boss',
    iconUrl: '/pois/boss.webp',
    hasName: true,
    hasLevel: true,
  },
  {
    category: 'enemies',
    type: 'boss_elite',
    title: 'Elite Boss',
    iconUrl: '/pois/boss.webp',
    hasName: true,
    hasLevel: true,
  },
  {
    category: 'fishing',
    type: 'fish_hotspot1',
    title: i18n('Fishing (Broad)'),
    iconUrl: '/pois/fish_hotspot1.webp',
  },
  {
    category: 'fishing',
    type: 'fish_hotspot2',
    title: 'Fishing (Rare)',
    iconUrl: '/pois/fish_hotspot2.webp',
  },
  {
    category: 'fishing',
    type: 'fish_hotspot3',
    title: 'Fishing (Secret)',
    iconUrl: '/pois/fish_hotspot3.webp',
  },
  {
    category: 'farming',
    type: 'broccoli',
    title: 'Broccoli',
    iconUrl: '/pois/broccoli.webp',
  },
  {
    category: 'farming',
    type: 'azoth_spring',
    title: 'Azoth Spring',
    iconUrl: '/pois/azoth_spring.webp',
  },
  {
    category: 'farming',
    type: 'hemp',
    title: 'Hemp',
    iconUrl: '/pois/hemp_compass.webp',
  },
  {
    category: 'farming',
    type: 'herb',
    title: 'Herb',
    iconUrl: '/pois/herbs.webp',
  },
  {
    category: 'farming',
    type: 'silkweed',
    title: 'Silkweed',
    iconUrl: '/pois/silkweed.webp',
  },
  {
    category: 'farming',
    type: 'wirefiber',
    title: 'Wirefiber',
    iconUrl: '/pois/wirefiber.webp',
  },
  {
    category: 'farming',
    type: 'fruit',
    title: 'Fruit',
    iconUrl: '/pois/fruit.webp',
  },
  {
    category: 'farming',
    type: 'honey',
    title: 'Honey',
    iconUrl: '/pois/honey.webp',
  },
  {
    category: 'farming',
    type: 'vegetable',
    title: 'Vegetable',
    iconUrl: '/pois/vegetable.webp',
  },
  {
    category: 'farming',
    type: 'squash',
    title: 'Squash',
    iconUrl: '/pois/squash.webp',
  },
  {
    category: 'farming',
    type: 'barley',
    title: 'Barley',
    iconUrl: '/pois/barley.webp',
  },
  {
    category: 'farming',
    type: 'potato',
    title: 'Potato',
    iconUrl: '/pois/potato.webp',
  },
  {
    category: 'farming',
    type: 'grain',
    title: 'Grain',
    iconUrl: '/pois/grain.webp',
  },
  {
    category: 'farming',
    type: 'carrot',
    title: 'Carrot',
    iconUrl: '/pois/carrot.webp',
  },
  {
    category: 'farming',
    type: 'cabbage',
    title: 'Cabbage',
    iconUrl: '/pois/cabbage.webp',
  },
  {
    category: 'farming',
    type: 'fungi',
    title: 'Fungi',
    iconUrl: '/pois/fungi.webp',
  },
  {
    category: 'logging',
    type: 'ironwood',
    title: 'Ironwood Tree',
    iconUrl: '/pois/ironwood_compass.webp',
  },
  {
    category: 'logging',
    type: 'wyrdwood',
    title: 'Wyrdwood Tree',
    iconUrl: '/pois/wyrdwood_compass.webp',
  },
  {
    category: 'npc',
    type: 'npc_generic',
    title: 'Generic',
    iconUrl: '/pois/npc_generic.webp',
    hasName: true,
  },
  {
    category: 'npc',
    type: 'npc_inn',
    title: 'Inn',
    iconUrl: '/pois/npc_inn.webp',
    hasName: true,
  },
  {
    category: 'npc',
    type: 'npc_convenant',
    title: 'Convenant',
    iconUrl: '/pois/npc_convenant.webp',
    hasName: true,
  },
  {
    category: 'npc',
    type: 'npc_marauder',
    title: 'Marauder',
    iconUrl: '/pois/npc_marauder.webp',
    hasName: true,
  },
  {
    category: 'npc',
    type: 'npc_syndicate',
    title: 'Syndicate',
    iconUrl: '/pois/npc_syndicate.webp',
    hasName: true,
  },
  {
    category: 'lore',
    type: 'lore_note',
    title: 'Lore Note',
    iconUrl: '/pois/lore_note.webp',
    hasName: true,
  },

  {
    category: 'essences',
    type: 'essences_shockbulb',
    title: 'Shockbulb',
    iconUrl: '/pois/wind_plant.webp',
  },
  {
    category: 'essences',
    type: 'essences_shockspire',
    title: 'Shockspire',
    iconUrl: '/pois/wind_stone.webp',
  },
  {
    category: 'essences',
    type: 'essences_lightning_beetle',
    title: 'Ligthning Beetle',
    iconUrl: '/pois/wind_boid.webp',
  },
  {
    category: 'essences',
    type: 'essences_blightroot',
    title: 'Blightroot',
    iconUrl: '/pois/death_plant.webp',
  },
  {
    category: 'essences',
    type: 'essences_blightcrag',
    title: 'Blightcrag',
    iconUrl: '/pois/death_stone.webp',
  },
  {
    category: 'essences',
    type: 'essences_blightmoth',
    title: 'Blightmoth',
    iconUrl: '/pois/death_boid.webp',
  },
  {
    category: 'essences',
    type: 'essences_earthspine',
    title: 'Earthspine',
    iconUrl: '/pois/earth_plant.webp',
  },
  {
    category: 'essences',
    type: 'essences_earthcrag',
    title: 'Earthcrag',
    iconUrl: '/pois/earth_stone.webp',
  },
  {
    category: 'essences',
    type: 'essences_earthshell_turtle',
    title: 'Earthshell Turtle',
    iconUrl: '/pois/earth_boid.webp',
  },
  {
    category: 'essences',
    type: 'essences_dragonglory',
    title: 'Dragonglory',
    iconUrl: '/pois/fire_plant.webp',
  },
  {
    category: 'essences',
    type: 'essences_scorchstone',
    title: 'Scorchstone',
    iconUrl: '/pois/fire_stone.webp',
  },
  {
    category: 'essences',
    type: 'essences_salamander_snail',
    title: 'Salamander Snail',
    iconUrl: '/pois/fire_boid.webp',
  },
  {
    category: 'essences',
    type: 'essences_lifebloom',
    title: 'Lifebloom',
    iconUrl: '/pois/life_plant.webp',
  },
  {
    category: 'essences',
    type: 'essences_lifejewel',
    title: 'Lifejewel',
    iconUrl: '/pois/life_stone.webp',
  },
  {
    category: 'essences',
    type: 'essences_lifemoth',
    title: 'Lifemoth',
    iconUrl: '/pois/life_boid.webp',
  },
  {
    category: 'essences',
    type: 'essences_soulsprout',
    title: 'Soulsprout',
    iconUrl: '/pois/spirit_plant.webp',
  },
  {
    category: 'essences',
    type: 'essences_soulspire',
    title: 'Soulspire',
    iconUrl: '/pois/spirit_stone.webp',
  },
  {
    category: 'essences',
    type: 'essences_soulwyrm',
    title: 'Soulwyrm',
    iconUrl: '/pois/spirit_boid.webp',
  },
  {
    category: 'essences',
    type: 'essences_rivercress',
    title: 'Rivercress',
    iconUrl: '/pois/water_plant.webp',
  },
  {
    category: 'essences',
    type: 'essences_springstone',
    title: 'Springstone',
    iconUrl: '/pois/water_stone.webp',
  },
  {
    category: 'essences',
    type: 'essences_floating_spinefish',
    title: 'Floating Spinefish',
    iconUrl: '/pois/water_boid.webp',
  },
  {
    category: 'mining',
    type: 'crystal',
    title: 'Crystal',
    iconUrl: '/pois/crystal.webp',
  },
  {
    category: 'mining',
    type: 'gold',
    title: 'Gold',
    iconUrl: '/pois/gold.webp',
  },
  {
    category: 'mining',
    type: 'iron',
    title: 'Iron',
    iconUrl: '/pois/iron.webp',
  },
  {
    category: 'mining',
    type: 'lodestone',
    title: 'Lodestone',
    iconUrl: '/pois/lodestone.webp',
  },
  {
    category: 'mining',
    type: 'orichalcum',
    title: 'Orichalcum',
    iconUrl: '/pois/orichalcum.webp',
  },
  {
    category: 'mining',
    type: 'platinum',
    title: 'Platinum',
    iconUrl: '/pois/platinum.webp',
  },
  {
    category: 'mining',
    type: 'saltpeter',
    title: 'Saltpeter',
    iconUrl: '/pois/saltpeter.webp',
  },
  {
    category: 'mining',
    type: 'oil',
    title: 'Oil',
    iconUrl: '/pois/oil.webp',
  },
  {
    category: 'mining',
    type: 'silver',
    title: 'Silver',
    iconUrl: '/pois/silver.webp',
  },
  {
    category: 'mining',
    type: 'starmetal',
    title: 'Starmetal',
    iconUrl: '/pois/starmetal.webp',
  },
  {
    category: 'skinning',
    type: 'turkey',
    title: 'Turkey',
    iconUrl: '/pois/turkey.webp',
  },
  {
    category: 'skinning',
    type: 'hare',
    title: 'Hare',
    iconUrl: '/pois/hare.webp',
  },
  {
    category: 'skinning',
    type: 'pig',
    title: 'Pig',
    iconUrl: '/pois/pig.webp',
  },
  {
    category: 'skinning',
    type: 'elk',
    title: 'Elk',
    iconUrl: '/pois/elk.webp',
  },
  {
    category: 'skinning',
    type: 'bear',
    title: 'Bear',
    iconUrl: '/pois/bear.webp',
  },
  {
    category: 'skinning',
    type: 'wolf',
    title: 'Wolf',
    iconUrl: '/pois/wolf.webp',
  },
  {
    category: 'skinning',
    type: 'boar',
    title: 'Boar',
    iconUrl: '/pois/boar.webp',
  },
  {
    category: 'skinning',
    type: 'bison',
    title: 'Bison',
    iconUrl: '/pois/bison.webp',
  },
  {
    category: 'skinning',
    type: 'elkbuck',
    title: 'Elkbuck',
    iconUrl: '/pois/elkbuck.webp',
  },
  {
    category: 'skinning',
    type: 'puma',
    title: 'Puma',
    iconUrl: '/pois/puma.webp',
  },
  {
    category: 'skinning',
    type: 'lynx',
    title: 'Lynx',
    iconUrl: '/pois/lynx.webp',
  },
  {
    category: 'skinning',
    type: 'peacock',
    title: 'Peacock',
    iconUrl: '/pois/peacock.webp',
  },
  {
    category: 'skinning',
    type: 'sheep',
    title: 'Sheep',
    iconUrl: '/pois/sheep.webp',
  },
  {
    category: 'skinning',
    type: 'goat',
    title: 'Goat',
    iconUrl: '/pois/sheep.webp',
  },
  {
    category: 'skinning',
    type: 'alligator',
    title: 'Alligator',
    iconUrl: '/pois/alligator.webp',
  },
  {
    category: 'skinning',
    type: 'cow',
    title: 'Cow',
    iconUrl: '/pois/cow.webp',
  },

  {
    category: 'other',
    type: 'other',
    title: 'Other',
    iconUrl: '/pois/other.webp',
  },
  {
    category: 'farming',
    type: 'tendrilspine',
    title: 'Tendrilspine',
    iconUrl: '/pois/tendrilspine.webp',
  },
  {
    category: 'pigment',
    type: 'pigment_black_primsabloom',
    title: 'Black Prismabloom',
    iconUrl: '/pois/pigment_black.webp',
  },
  {
    category: 'pigment',
    type: 'pigment_blue_primsabloom',
    title: 'Blue Prismabloom',
    iconUrl: '/pois/pigment_blue.webp',
  },
  {
    category: 'pigment',
    type: 'pigment_brown_primsabloom',
    title: 'Brown Prismabloom',
    iconUrl: '/pois/pigment_brown.webp',
  },
  {
    category: 'pigment',
    type: 'pigment_green_primsabloom',
    title: 'Green Prismabloom',
    iconUrl: '/pois/pigment_green.webp',
  },
  {
    category: 'pigment',
    type: 'pigment_orange_primsabloom',
    title: 'Orange Prismabloom',
    iconUrl: '/pois/pigment_orange.webp',
  },
  {
    category: 'pigment',
    type: 'pigment_purple_primsabloom',
    title: 'Purple Prismabloom',
    iconUrl: '/pois/pigment_purple.webp',
  },
  {
    category: 'pigment',
    type: 'pigment_red_primsabloom',
    title: 'Red Prismabloom',
    iconUrl: '/pois/pigment_red.webp',
  },
  {
    category: 'pigment',
    type: 'pigment_white_primsabloom',
    title: 'White Prismabloom',
    iconUrl: '/pois/pigment_white.webp',
  },
  {
    category: 'pigment',
    type: 'pigment_yellow_primsabloom',
    title: 'Yellow Prismabloom',
    iconUrl: '/pois/pigment_yellow.webp',
  },
];

export type MapFiltersCategory = {
  value: string;
  title: string;
  filters: FilterItem[];
};

export const mapFiltersCategories: MapFiltersCategory[] = [
  {
    value: 'locations',
    title: i18n('Locations'),
    filters: mapFilters.filter(
      (mapFilter) => mapFilter.category === 'locations'
    ),
  },
  {
    value: 'chests',
    title: i18n('Chests'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'chests'),
  },
  {
    value: 'enemies',
    title: i18n('Enemies'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'enemies'),
  },
  {
    value: 'fishing',
    title: i18n('Fishing'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'fishing'),
  },
  {
    value: 'farming',
    title: i18n('Farming'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'farming'),
  },
  {
    value: 'logging',
    title: i18n('Logging'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'logging'),
  },
  {
    value: 'mining',
    title: i18n('Mining'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'mining'),
  },
  {
    value: 'skinning',
    title: i18n('Skinning'),
    filters: mapFilters.filter(
      (mapFilter) => mapFilter.category === 'skinning'
    ),
  },
  {
    value: 'npc',
    title: i18n('NPC'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'npc'),
  },
  {
    value: 'lore',
    title: i18n('Lore'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'lore'),
  },
  {
    value: 'essences',
    title: i18n('Essences'),
    filters: mapFilters.filter(
      (mapFilter) => mapFilter.category === 'essences'
    ),
  },

  {
    value: 'pigment',
    title: i18n('Pigment'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'pigment'),
  },
  {
    value: 'other',
    title: i18n('Other'),
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'other'),
  },
];
