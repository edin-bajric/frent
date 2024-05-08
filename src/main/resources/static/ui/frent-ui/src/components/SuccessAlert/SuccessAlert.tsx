import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

type Props = {
  message: string;
  onClose: () => void;
  autoCloseDuration?: number;
};

function SuccessAlert({ message, onClose, autoCloseDuration = 2000 }: Props) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, autoCloseDuration);

    return () => clearTimeout(timer);
  }, [autoCloseDuration, onClose]);

  const handleDismiss = () => {
    setShow(false);
    onClose();
  };

  return (
    <Alert show={show} variant="success" dismissible onClose={handleDismiss} style={{width: "100%"}}>
      {message}
    </Alert>
  );
}

export default SuccessAlert;
