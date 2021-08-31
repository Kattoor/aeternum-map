import type { Marker } from '../../contexts/MarkersContext';
import type { Details } from '../AddResources/AddResources';
import type { FilterItem } from '../MapFilter/mapFilters';

export function getTooltipContent(
  markerOrDetails: Marker | Details,
  mapFilter: FilterItem
): string {
  let tooltipContent = markerOrDetails.name
    ? `${markerOrDetails.name} (${mapFilter.title})`
    : mapFilter.title;
  if (markerOrDetails.level) {
    tooltipContent += `<br/>Level ${markerOrDetails.level}`;
  }
  return tooltipContent;
}
