import leaflet from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { useEffect } from 'react';
import { useModal } from '../../contexts/ModalContext';

function useGeoman({ leafletMap }: { leafletMap: leaflet.Map | null }): void {
  const { addModal } = useModal();
  useEffect(() => {
    if (!leafletMap || !leafletMap.getPane('markerPane')) {
      return;
    }
    leafletMap.pm.addControls({
      position: 'bottomright',
      drawCircle: false,
      drawCircleMarker: false,
      drawPolyline: false,
    });

    leafletMap.on('pm:create', (e) => {
      addModal({
        title: 'Create a new area',
        children: <div>HI</div>,
      });
      console.log(e);
    });
  }, [leafletMap]);
}

export default useGeoman;
