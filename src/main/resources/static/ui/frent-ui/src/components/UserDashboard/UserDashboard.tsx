import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DataTable, { TableColumn } from 'react-data-table-component';
import useUsers from '../../hooks/useUsers';
import useDeleteUser from '../../hooks/useDeleteUser';
import useSuspendUser from '../../hooks/useSuspendUser';
import useUnsuspendUser from '../../hooks/useUnsuspendUser';
import UserTotalSpent from '../UserTotalSpent';
import RentalHistoryModal from '../RentalHistoryModal';
import { User } from '../../utils/types';

const UserDashboard = () => {
  const { data: users = [], isLoading } = useUsers();
  const { mutate: deleteUser } = useDeleteUser();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const { mutate: suspendUser } = useSuspendUser();
  const { mutate: unsuspendUser } = useUnsuspendUser();
  const [showRentalHistory, setShowRentalHistory] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleDeleteConfirmation = (userId: string) => {
    setUserIdToDelete(userId);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setUserIdToDelete('');
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(userIdToDelete);
      handleCloseConfirmation();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSuspendUser = async (user: User) => {
    try {
      await suspendUser(user);
    } catch (error) {
      console.error('Error suspending user:', error);
    }
  };

  const handleUnsuspendUser = async (user: User) => {
    try {
      await unsuspendUser(user);
    } catch (error) {
      console.error('Error unsuspending user:', error);
    }
  };

  const handleShowRentalHistory = (userId: string) => {
    setSelectedUserId(userId);
    setShowRentalHistory(true);
  };

  const handleCloseRentalHistory = () => {
    setShowRentalHistory(false);
    setSelectedUserId(null);
  };

  const deleteButtonColumn: TableColumn<User> = {
    name: 'Delete',
    button: true,
    cell: (row: User) => (
      <Button variant='danger' onClick={() => handleDeleteConfirmation(row.id)}>
        Delete
      </Button>
    ),
  };

  const suspendButtonColumn: TableColumn<User> = {
    name: 'Suspend',
    button: true,
    cell: (row: User) => (
      <Button
        {...(row.isSuspended && { disabled: true })}
        variant='warning'
        onClick={() => handleSuspendUser(row)}
      >
        Suspend
      </Button>
    ),
  };

  const unsuspendButtonColumn: TableColumn<User> = {
    name: 'Unsuspend',
    button: true,
    width: '130px',
    cell: (row: User) => (
      <Button
        {...(!row.isSuspended && { disabled: true })}
        variant='success'
        onClick={() => handleUnsuspendUser(row)}
      >
        Unsuspend
      </Button>
    ),
  };

  const totalSpentColumn: TableColumn<User> = {
    name: 'Total Spent',
    cell: (row: User) => <UserTotalSpent userId={row.id} />,
    sortable: true,
  };

  const rentalHistoryButtonColumn: TableColumn<User> = {
    name: 'Rental History',
    button: true,
    width: '130px',
    cell: (row: User) => (
      <Button variant='info' onClick={() => handleShowRentalHistory(row.id)}>
        View Rentals
      </Button>
    ),
  };

  const columns: TableColumn<User>[] = [
    deleteButtonColumn,
    suspendButtonColumn,
    unsuspendButtonColumn,
    rentalHistoryButtonColumn,
    {
      name: 'ID',
      selector: (row: User) => row.id,
      sortable: true,
    },
    {
      name: 'User Type',
      selector: (row: User) => row.userType,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row: User) => row.name,
    },
    {
      name: 'Email',
      selector: (row: User) => row.email,
    },
    {
      name: 'Username',
      selector: (row: User) => row.username,
      sortable: true,
    },
    {
      name: 'Creation Date',
      selector: (row: User) => row.creationDate.toString(),
      sortable: true,
    },
    {
      name: 'Suspended',
      selector: (row: User) => row.isSuspended.toString(),
      sortable: true,
    },
    totalSpentColumn,
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={users}
        progressPending={isLoading}
        progressComponent={<h2>Loading...</h2>}
        noDataComponent={<h2>No users found</h2>}
        pagination
        responsive
        striped
        highlightOnHover
      />
      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseConfirmation}>
            Cancel
          </Button>
          <Button variant='danger' onClick={handleDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {selectedUserId && (
        <RentalHistoryModal
          show={showRentalHistory}
          onHide={handleCloseRentalHistory}
          userId={selectedUserId}
        />
      )}
    </>
  );
};

export default UserDashboard;
