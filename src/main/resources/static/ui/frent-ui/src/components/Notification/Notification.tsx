import { Offcanvas, ListGroup, CloseButton } from 'react-bootstrap';
import { Notification } from '../../utils/types';

type NotificationsProps = {
  show: boolean;
  notifications: Notification[];
  handleClose: () => void;
};

const Notifications: React.FC<NotificationsProps> = ({
  show,
  notifications,
  handleClose,
}) => {
  return (
    <Offcanvas
      data-bs-theme="dark"
      show={show}
      onHide={handleClose}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Notifications</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup as="ol">
          {notifications.map((notification, index) => (
            <ListGroup.Item
              key={index}
              as="li"
              className="d-flex justify-content-between align-items-start"
              variant="light"
            >
              <div className="ms-2 me-auto">{notification.message}</div>
              <CloseButton />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Notifications;