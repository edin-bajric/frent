import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import useSendDueDateWarnings from "../../hooks/useSendDueDateWarnings";
import useSetMovieAvailable from "../../hooks/useSetMovieAvailable";
import useSetMovieUnavailable from "../../hooks/useSetMovieUnavailable";

const Dashboard = () => {
  const sendDueDateWarningsMutation = useSendDueDateWarnings();
  const setMovieAvailableMutation = useSetMovieAvailable();
  const setMovieUnavailableMutation = useSetMovieUnavailable();

  const handleSendDueDateWarnings = () => {
    sendDueDateWarningsMutation.mutate();
  };

  const [unavailableMovieId, setUnavailableMovieId] = useState("");
  const [availableMovieId, setAvailableMovieId] = useState("");

  const handleSetMovieAvailable = () => {
    if (!unavailableMovieId) {
      alert("Please enter a movie ID");
      return;
    }

    setMovieAvailableMutation.mutate(unavailableMovieId);
  };

  const handleSetMovieUnavailable = () => {
    if (!availableMovieId) {
      alert("Please enter a movie ID");
      return;
    }

    setMovieUnavailableMutation.mutate(availableMovieId);
  };

  return (
    <div>
      <Button onClick={handleSendDueDateWarnings}>
        Send Due Date Warnings
      </Button>

      <Form.Group className="mb-3">
        <Form.Label>Enter Movie ID:</Form.Label>
        <Form.Control
          type="text"
          value={unavailableMovieId}
          onChange={(e) => setUnavailableMovieId(e.target.value)}
          placeholder="Enter Movie ID"
        />
      </Form.Group>

      <Button onClick={handleSetMovieAvailable}>Set Movie Available</Button>

      <Form.Group className="mb-3">
        <Form.Label>Enter Movie ID:</Form.Label>
        <Form.Control
          type="text"
          value={availableMovieId}
          onChange={(e) => setAvailableMovieId(e.target.value)}
          placeholder="Enter Movie ID"
        />
      </Form.Group>

      <Button onClick={handleSetMovieUnavailable}>Set Movie Unavailable</Button>
    </div>
  );
};

export default Dashboard;
