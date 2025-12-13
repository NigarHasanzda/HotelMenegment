import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "./../../Redux/Features/AllUser";

const Home = () => {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="p-10 min-h-screen pt-[100px] bg-blue-500">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Bütün İstifadəçilər</h1>

      {loading && <p className="text-center text-white">Yüklənir...</p>}
      {error && <p className="text-center text-red-200">{error.errorMessage || error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users && users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="font-bold text-lg">{user.userName}</h2>
              <p>
                <span className="font-semibold">Ad:</span> {user.name} {user.surname}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Role:</span> {user.role || "Yüklənir..."}
              </p>
            </div>
          ))
        ) : (
          !loading && <p className="text-center text-white">İstifadəçi yoxdur.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
