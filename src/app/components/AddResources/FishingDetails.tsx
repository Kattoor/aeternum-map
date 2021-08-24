import { FilterItem, MapFiltersCategory } from '../MapFilter/mapFilters';

type FishingDetailsProps = {
  category: MapFiltersCategory;
  onFilterChange: (filter: FilterItem) => void;
};

function FishingDetails({
  category,
  onFilterChange,
}: FishingDetailsProps): JSX.Element {
  return (
    <div>
      {category.filters.map((filter) => (
        <button key={filter.type} onClick={() => onFilterChange(filter)}>
          {filter.title}
        </button>
      ))}
    </div>
  );
}

export default FishingDetails;
