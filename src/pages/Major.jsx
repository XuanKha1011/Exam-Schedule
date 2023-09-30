
import SubHeader from '../components/Layout/SubHeader';
import Sidebar from '../components/Layout/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import majorTypes from '../constants/majorTypes';
import { getAllMajors } from '../store/thunks/major';
import Actionbt from '../components/Layout/Actionbt';

const MajorDashboard = () => {
    const dispatch = useDispatch();
  const datamj = useSelector((state) => state.major);
  const majors = datamj?.contents[majorTypes.GET_MAJORS]?.payload?.data;

  useEffect(() => {
    dispatch(getAllMajors());
  }, []);
    return (
        <div>
            <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <Sidebar></Sidebar>
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <SubHeader></SubHeader>
          {/* <div className="main-content flex flex-col flex-grow p-4">
            <h1 className="font-bold text-2xl text-gray-700">Dashboard</h1>
            <div>
              <div className="grid grid-cols-2 gap-4 place-content-around h-48 w-fit font-bold  ">
                <div className="flex border border-black rounded-lg cursor-pointer">
                  <img
                    src="https://icon-library.com/images/teacher-icon-png/teacher-icon-png-17.jpg"
                    alt=""
                    className="w-12 h-12  bg-red-400 hover:bg-red-500 rounded-l-lg "
                  />
                  <div>
                    <h4>Number of Teachers</h4>
                    <p>50</p>
                  </div>
                </div>
                <div className="flex border border-black  rounded-lg cursor-pointer">
                  <img
                    src="https://icon-library.com/images/student-icon-transparent/student-icon-transparent-26.jpg"
                    alt=""
                    className="w-12 h-12  bg-green-400 hover:bg-green-500 rounded-l-lg "
                  />
                  <div>
                    <h4>Number of Students</h4>
                    <p>100</p>
                  </div>
                </div>
                <div className="flex border border-black rounded-lg cursor-pointer ">
                  <img
                    src="https://cdn2.iconfinder.com/data/icons/home-decor-and-interior/32/Storage_boxes-512.png"
                    alt=""
                    className="w-12 h-12  bg-blue-400 hover:bg-blue-500 rounded-l-lg "
                  />
                  <div>
                    <h4>Number of Courses</h4>
                    <p>10</p>
                  </div>
                </div>
                <div className="flex border  border-black rounded-lg cursor-pointer">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/35/35920.png"
                    alt=""
                    className="w-12 h-12  bg-purple-400 hover:bg-purple-500 rounded-l-lg "
                  />
                  <div>
                    <h4>Number of Subjects</h4>
                    <p>20</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className=" text-slate-800 font-semibold text-3xl">
            DashBoard
          </div>
          <div className="grid gap-4 pt-7 m-1">
            <table className="w-full text-sm text-left text-gray-500 text-gray-400">
              <thead className="text-xs text-gray-300 uppercase bg-gray-50 bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Major Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Major Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              {majors?.map((majors) => (
                <tr
                  className="bg-white border-b bg-gray-800 border-gray-700"
                  key={majors.majorId}
                >
                  <td className="px-6 py-4">{majors.majorId}</td>
                  <td className="px-6 py-4">{majors.majorName}</td>
                  
                  <td>
                    <Actionbt></Actionbt>
                  </td>
                </tr>
              ))}
            </table>
          </div>
          
        </main>
      </div>
        </div>
    );
};

export default MajorDashboard;