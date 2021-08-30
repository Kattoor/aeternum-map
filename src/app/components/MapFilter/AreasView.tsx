import { areas } from './areas';
import AreaList from './AreaList';

function AreasView(): JSX.Element {
  return (
    <section>
      {areas.map((area) => (
        <AreaList key={area.title} area={area} root />
      ))}
    </section>
  );
}

export default AreasView;
