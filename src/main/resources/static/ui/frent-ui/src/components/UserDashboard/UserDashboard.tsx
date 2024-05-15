import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import useUsers from "../../hooks/useUsers";
import { User } from "../../utils/types";
import useDeleteUser from "../../hooks/useDeleteUser";

const UserDashboard = () => {
  const { data: users = [], isLoading } = useUsers();
  const { mutate: deleteUser } = useDeleteUser();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const handleDeleteConfirmation = (userId: any) => {
    setUserIdToDelete(userId);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setUserIdToDelete("");
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(userIdToDelete);
      handleCloseConfirmation();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const deleteButtonColumn: TableColumn<User> = {
    name: "Delete",
    button: true,
    cell: (row: User) => (
      <>
        <Button
          variant="danger"
          onClick={() => handleDeleteConfirmation(row.id)}
        >
          Delete
        </Button>
      </>
    ),
  };

  const columns: TableColumn<User>[] = [
    deleteButtonColumn,
    {
      name: "ID",
      selector: (row: User) => row.id,
      sortable: true,
    },
    {
      name: "User Type",
      selector: (row: User) => row.userType,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: User) => row.name,
    },
    {
      name: "Email",
      selector: (row: User) => row.email,
    },
    {
      name: "Username",
      selector: (row: User) => row.username,
      sortable: true,
    },
    {
      name: "Creation Date",
      selector: (row: User) => row.creationDate.toString(),
      sortable: true,
    },
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
          <Button variant="secondary" onClick={handleCloseConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserDashboard;
