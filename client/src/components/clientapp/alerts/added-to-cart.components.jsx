import Alert from 'react-bootstrap/Alert';

export const addedToCartMsg = (item) => {
    console.log(item);
  return (

        <Alert key='success' variant={'success'}>
          Added {item.qty} {item.name} to cart!
        </Alert>
  );
}
