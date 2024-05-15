import MovieDashboard from "../MovieDashboard";
import UserDashboard from "../UserDashboard";

const Dashboard = () => {
  return (
    <>
      <h3 style={{ padding: "16px" }}>Dashboard</h3>
      <h4 style={{ padding: "16px" }}>Movies</h4>
      <MovieDashboard />
      <h4 style={{ padding: "16px" }}>Users</h4>
      <UserDashboard />
    </>
  );
};

export default Dashboard;
