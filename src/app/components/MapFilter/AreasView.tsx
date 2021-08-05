import { areas } from './areas';
import CategoryTitle from './CategoryTitle';
import AreaList from './AreaList';

function AreasView(): JSX.Element {
  return (
    <section>
      <CategoryTitle>Areas</CategoryTitle>
      {areas.map((area) => (
        <AreaList key={area.title} area={area} root />
      ))}
    </section>
  );
}

export default AreasView;
