import Alert from 'react-bootstrap/Alert';
type Props = {
    message: string;
    onClose: () => void;
};
function BasicExample({ message }: Props) {
  return (
    <Alert variant="success" dismissible={true}> {message}
    </Alert>
  );
}

export default BasicExample;