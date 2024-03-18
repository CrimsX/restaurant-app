import Alert from 'react-bootstrap/Alert';
import './removed-from-cart.styles.css'

export const removedFromCartMsg = (item) => {
  return (

        <Alert className='center' key='success' variant={'success'}>
          Removed {item.name} from cart
        </Alert>
  );
}
