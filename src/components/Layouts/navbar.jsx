import { NavigateButton } from '../atoms';

export default function NavBar(props) {
  const { route } = props;
  return (
    <div className='flex w-full m-4'>
      <NavigateButton route={route} text={'Back'} />
    </div>
  );
}
