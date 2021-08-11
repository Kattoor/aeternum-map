import { i18n } from '../../i18n/i18n';

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
    title: i18n('Fish Hotspot (Broad)'),
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
    type: 'azoth_spring',
    title: 'Azoth Spring',
    iconUrl: './pois/azoth_spring.webp',
  },
  {
    category: 'farming',
    type: 'hemp',
    title: 'Hemp',
    iconUrl: './pois/hemp_compass.webp',
  },
  {
    category: 'farming',
    type: 'herbs',
    title: 'Herbs',
    iconUrl: './pois/herbs.webp',
  },
  {
    category: 'farming',
    type: 'silkweed',
    title: 'Silkweed',
    iconUrl: './pois/silkweed.webp',
  },
  {
    category: 'farming',
    type: 'wirefiber',
    title: 'Wirefiber',
    iconUrl: './pois/wirefiber.webp',
  },
  {
    category: 'farming',
    type: 'fruit',
    title: 'Fruit',
    iconUrl: './pois/fruit.webp',
  },
  {
    category: 'farming',
    type: 'honey',
    title: 'Honey',
    iconUrl: './pois/honey.webp',
  },
  {
    category: 'farming',
    type: 'brocoli',
    title: 'Brocoli',
    iconUrl: './pois/brocoli.webp',
  },
  {
    category: 'farming',
    type: 'squash',
    title: 'Squash',
    iconUrl: './pois/squash.webp',
  },
  {
    category: 'farming',
    type: 'barley',
    title: 'Barley',
    iconUrl: './pois/barley.webp',
  },
  {
    category: 'farming',
    type: 'potato',
    title: 'Potato',
    iconUrl: './pois/potato.webp',
  },
  {
    category: 'farming',
    type: 'corn',
    title: 'Corn',
    iconUrl: './pois/corn.webp',
  },
  {
    category: 'farming',
    type: 'carrot',
    title: 'Carrot',
    iconUrl: './pois/carrot.webp',
  },
  {
    category: 'farming',
    type: 'cabbage',
    title: 'Cabbage',
    iconUrl: './pois/cabbage.webp',
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
  {
    category: 'mining',
    type: 'crystal',
    title: 'Crystal',
    iconUrl: './pois/crystal.webp',
  },
  {
    category: 'mining',
    type: 'gold',
    title: 'Gold',
    iconUrl: './pois/gold.webp',
  },
  {
    category: 'mining',
    type: 'iron',
    title: 'Iron',
    iconUrl: './pois/iron.webp',
  },
  {
    category: 'mining',
    type: 'lodstone',
    title: 'Lodstone',
    iconUrl: './pois/lodstone.webp',
  },
  {
    category: 'mining',
    type: 'orichalcum',
    title: 'Orichalcum',
    iconUrl: './pois/orichalcum.webp',
  },
  {
    category: 'mining',
    type: 'platinum',
    title: 'Platinum',
    iconUrl: './pois/platinum.webp',
  },
  {
    category: 'mining',
    type: 'salpeter',
    title: 'Salpeter',
    iconUrl: './pois/salpeter.webp',
  },
  {
    category: 'mining',
    type: 'sandstone',
    title: 'Sandstone',
    iconUrl: './pois/sandstone.webp',
  },
  {
    category: 'mining',
    type: 'oil',
    title: 'Oil',
    iconUrl: './pois/oil.webp',
  },
  {
    category: 'mining',
    type: 'silver',
    title: 'Silver',
    iconUrl: './pois/silver.webp',
  },
  {
    category: 'mining',
    type: 'starmetal',
    title: 'Starmetal',
    iconUrl: './pois/starmetal.webp',
  },
  {
    category: 'skinning',
    type: 'turkey',
    title: 'Turkey',
    iconUrl: './pois/turkey.webp',
  },
  {
    category: 'skinning',
    type: 'rabbit',
    title: 'Rabbit',
    iconUrl: './pois/rabbit.webp',
  },
  {
    category: 'skinning',
    type: 'pig',
    title: 'Pig',
    iconUrl: './pois/pig.webp',
  },
  {
    category: 'skinning',
    type: 'elk',
    title: 'Elk',
    iconUrl: './pois/elk.webp',
  },
  {
    category: 'skinning',
    type: 'bear',
    title: 'Bear',
    iconUrl: './pois/bear.webp',
  },
  {
    category: 'skinning',
    type: 'wolf',
    title: 'Wolf',
    iconUrl: './pois/wolf.webp',
  },
  {
    category: 'skinning',
    type: 'boar',
    title: 'Boar',
    iconUrl: './pois/boar.webp',
  },
  {
    category: 'skinning',
    type: 'bison',
    title: 'Bison',
    iconUrl: './pois/bison.webp',
  },
  {
    category: 'skinning',
    type: 'lion',
    title: 'Lion',
    iconUrl: './pois/lion.webp',
  },
  {
    category: 'skinning',
    type: 'bobcat',
    title: 'Bobcat',
    iconUrl: './pois/bobcat.webp',
  },
  {
    category: 'skinning',
    type: 'lynx',
    title: 'Lynx',
    iconUrl: './pois/lynx.webp',
  },
  {
    category: 'skinning',
    type: 'goat',
    title: 'Goat',
    iconUrl: './pois/goat.webp',
  },
  {
    category: 'skinning',
    type: 'sheep',
    title: 'Sheep',
    iconUrl: './pois/sheep.webp',
  },
  {
    category: 'skinning',
    type: 'aligator',
    title: 'Aligator',
    iconUrl: './pois/aligator.webp',
  },
  {
    category: 'skinning',
    type: 'cow',
    title: 'Cow',
    iconUrl: './pois/cow.webp',
  },
  {
    category: 'mobs',
    type: 'named_mobs',
    title: 'Named Mobs',
    iconUrl: './pois/named_mobs.webp',
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
  {
    value: 'mobs',
    title: 'Mobs',
    imgSrc: './filters/mobs.webp',
    filters: mapFilters.filter((mapFilter) => mapFilter.category === 'mobs'),
  },
];
