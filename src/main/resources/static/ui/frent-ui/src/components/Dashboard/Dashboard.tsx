import MovieDashboard from "../MovieDashboard";

const Dashboard = () => {
  return (
    <>
      <h3 style={{ padding: "16px" }}>Dashboard</h3>
      <h4 style={{ padding: "16px" }}>Movies</h4>
      <MovieDashboard />
      <h4 style={{ padding: "16px" }}>Users</h4>
    </>
  );
};

export default Dashboard;
