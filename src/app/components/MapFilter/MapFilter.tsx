import styles from './MapFilter.module.css';

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

type MapFilterProps = {
  filters: string[];
  onFiltersChange: (filters: string[]) => void;
  onNewFilterClick: () => void;
};
function MapFilter({
  filters,
  onFiltersChange,
  onNewFilterClick,
}: MapFilterProps): JSX.Element {
  function handleToggle(event: React.ChangeEvent<HTMLInputElement>) {
    const newFilters = [...filters];
    if (event.target.checked) {
      newFilters.push(event.target.value);
    } else {
      newFilters.splice(newFilters.indexOf(event.target.value), 1);
    }
    onFiltersChange(newFilters);
  }
  return (
    <aside className={styles.container}>
      {mapFilters.map((mapFilter) => (
        <label className={styles.filter} key={mapFilter.value}>
          <input
            type="checkbox"
            value={mapFilter.value}
            onChange={handleToggle}
            checked={filters.includes(mapFilter.value)}
          />
          <img src={mapFilter.imgSrc} alt={mapFilter.title} />
        </label>
      ))}
      <button className={styles.add} onClick={onNewFilterClick}>
        <svg viewBox="0 0 10 10" stroke="currentColor">
          <line x1="0" y1="5" x2="10" y2="5" />
          <line x1="5" y1="0" x2="5" y2="10" />
        </svg>
      </button>
    </aside>
  );
}

export default MapFilter;
