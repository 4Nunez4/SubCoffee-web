// src/Dashboard.jsx
import logo from '../assets/cafe-pergamino.dashboard.jpg';

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <div className="bg-white rounded-xl mx-auto w-11/12 md:w-3/4 lg:w-4/5 xl:w-11/12 2xl:w-5/6 h-5/6 ">
      <img className="w-full h-full object-cover rounded-3xl" src={logo} alt="logo" />
    </div>
  </div>
  


  );
}

export default Dashboard;
