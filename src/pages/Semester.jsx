import Sidebar from "../components/Layout/Sidebar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import semesterTypes from "../constants/semesterTypes"
import { Pagination } from "react-headless-pagination"
import DropdownSelectIcon from "../assets/svg/select_dropdown_icon.svg"
import { sizeOptions } from "../constants/commons/commons"
import ReactSelect from "react-select"
import LoadingSpinner from "../constants/commons/loading-spinner/LoadingSpinner"
import useAuth from "../hooks/useAuth"
import { color } from "../constants/commons/styled"
import StatusButton from "../components/Status"
import {
  getAllSemesters,
  createSemester,
  updateSemester,
  deleteSemester,
} from "../store/thunks/semester"

import majorTypes from "../constants/majorTypes"
import { getAllMajors } from "../store/thunks/major"
import { toast } from "react-toastify"
const SemesterDashboard = () => {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const datase = useSelector((state) => state.semester)
  const datamj = useSelector((state) => state.major)
  const [openModal, setOpenModal] = useState(false)
  const [isShowSelect, setIsShowSelect] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  //const [selectedOptionAdd, setSelectedOptionAdd] = useState(null);
  const [openModalConfirm, setOpenModalConfirm] = useState(false)

  const [currentSemester, setCurrentSemester] = useState({
    semesterId: "",
    semesterName: "",
    course: "",
    majorId: "",
    listMajor: [],
  })

  const [param, setParam] = useState({
    page: 1,
    pageSize: 10,
    keywords: "",
  })
  const majors = datamj?.contents[majorTypes.GET_MAJORS]?.data.data
  const popupSelect = useRef(null)
  const [loadings, setLoading] = useState(true)
  const options = majors?.map((major) => ({
    value: major,
    label: major.majorId + " : " + major.majorName,
  }))

  const pagination = datase?.paginations[semesterTypes.GET_SEMESTERS]
  const semesters = datase?.contents[semesterTypes.GET_SEMESTERS]?.data.data

  const UpdateSemester = () => {
    try {
      const newListMajor = currentSemester.listMajor.map((item) => ({
        ...item,
      }))
      dispatch(updateSemester(currentSemester))
      toast.success("Semester updated successfully")
    } catch (error) {
      toast.error("Error updating semester")
    }

    setOpenModal(false)
  }
  const AddSemester = () => {
    try {
      dispatch(createSemester(currentSemester))
      toast.success("Semester added successfully")
    } catch (error) {
      toast.error("Error adding semester")
    }

    setOpenModalAdd(false)
  }
  const onDeleteSemester = (data) => {
    const req = {
      ...data,
      status: "Inactive",
    }
    try {
      dispatch(deleteSemester(req))
      toast.success("Semester deleted successfully")
    } catch (error) {
      toast.error("Error deleting semester")
    }

    setOpenModalConfirm(false)
    try {
      setTimeout(() => dispatch(getAllSemesters(param)), 1000)
    } catch (error) {
      toast.error("Error getting semester")
    }
  }
  const restoreSemester = (data) => {
    const req = {
      ...data,
      status: "Active",
    }
    try {
      dispatch(deleteSemester(req))
      toast.success("Semester restored successfully")
    } catch (error) {
      toast.error("Error restoring semester")
    }
    try {
      setTimeout(() => dispatch(getAllSemesters(param)), 1000)
    } catch (error) {
      toast.error("Error getting semester ")
    }
  }
  useEffect(() => {
    dispatch(getAllSemesters(param))
  }, [dispatch, param])

  useEffect(() => {
    if (
      datase?.loadings[semesterTypes.GET_SEMESTERS] ||
      datase?.loadings[semesterTypes.UPDATE_SEMESTER] ||
      datase?.loadings[semesterTypes.DELETE_SEMESTER] ||
      datase?.loadings[semesterTypes.CREATE_SEMESTER]
    )
      setLoading(true)
    else setLoading(false)
  }, [datase, param])
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getAllSemesters(param))
      dispatch(getAllMajors({ page: 1, pageSize: 999 }))
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [param, dispatch])
  return (
    <div className="relative">
      {loadings && <LoadingSpinner />}
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <Sidebar></Sidebar>
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <header className="header bg-white shadow py-4 px-4">
            <div className="header-content flex items-center flex-row">
              <form action="#">
                <div className="hidden md:flex relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  <input
                    id="search"
                    type="text"
                    name="search"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-300 w-full h-10 focus:outline-none focus:border-indigo-400"
                    placeholder="Search..."
                    onChange={(e) => {
                      setParam({
                        ...param,
                        keyword: e.target.value,
                      })
                    }}
                    value={param.keyword}
                  />
                </div>
                <div className="flex md:hidden">
                  <a
                    href=""
                    className="flex items-center justify-center h-10 w-10 border-transparent"
                  >
                    <svg
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </a>
                </div>
              </form>
              <div className="flex ml-auto">
                <a className="flex flex-row items-center">
                  <img
                    src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_79143.jpg"
                    className="h-10 w-10 bg-gray-200 border rounded-full"
                  />
                  <span className="flex flex-col ml-2">
                    <span className="truncate w-20 font-semibold tracking-wide leading-none">
                      {user.username}
                    </span>
                    <span className="truncate w-20 text-gray-500 text-xs leading-none mt-1">
                      {user.roleId === "AD"
                        ? "Admin"
                        : user.roleId === "TA"
                        ? "Testing Admin"
                        : user.roleId === "TS"
                        ? "Testing Staff"
                        : user.roleId === "ST"
                        ? "Student"
                        : user.roleId === "LT"
                        ? "Lecturer"
                        : ""}
                    </span>
                  </span>
                </a>
              </div>
              <div></div>
            </div>
          </header>
          {/**
           * <SubHeader></SubHeader> in header
           *
           */}
          <div className=" text-slate-800 font-semibold text-3xl pt-8 pb-4 m-3">
            Semester
          </div>
          <div className="flex justify-end text-slate-800 font-semibold text-3xl p-10 pb-0 pt-0">
            <button
              type="button"
              id="Add"
              className="focus:outline-none text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-[#1f2937] hover:bg-gray-700"
              onClick={() => setOpenModalAdd(true)}
            >
              Add
            </button>
            <div>
              <div
                className=" text-primary flex items-center justify-between  font-semibold h-8 md:h-10 w-32 md:w-44 text-xs md:text-sm border-solid border border-primary  rounded-2xl cursor-pointer"
                onClick={() => setIsShowSelect(!isShowSelect)}
              >
                <span className="pl-4">Show {pagination?.pageSize} item</span>
                <img
                  src={DropdownSelectIcon}
                  className="pointer-events-none leading-[16px] md:leading-[20px] md:mr-4"
                  alt="drop icon"
                />
              </div>
              {isShowSelect && (
                <ul
                  ref={popupSelect}
                  className="text-left cursor-pointer absolute"
                >
                  {sizeOptions.map((item) => {
                    return (
                      <li
                        className="px-4 py-2 text-xs md:text-sm bg-gray-100 first:rounded-t-lg last:rounded-b-lg border-b last:border-b-0 z-10 hover:bg-gray-200"
                        onClick={() => {
                          setParam({ ...param, pageSize: Number(item.value) })
                          setIsShowSelect(false)
                        }}
                        key={item.value}
                      >
                        Show {item.value} items
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>

          <div className="grid gap-4 pt-7 m-1">
            <table className="w-full text-sm text-left text-gray-500 text-gray-400">
              <thead className="text-xs text-gray-300 uppercase bg-gray-50 bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Semester Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Semester Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Major Id
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {semesters?.map((semester) => (
                  <tr
                    className="bg-white border-b bg-gray-800 border-gray-700"
                    key={semester.semesterId}
                  >
                    <td className="px-6 py-4">{semester.semesterId}</td>
                    <td className="px-6 py-4">
                      {semester.semesterName}
                      {/**select module */}
                      {openModal ? (
                        <div className="fixed top-0 left-0  w-full h-full bg-black bg-opacity-20 z-[1000]">
                          <div className="modal absolute w-[28%] translate-x-[-50%] translate-y-[-50%]  z-20 top-[50%] left-[50%]">
                            <div className="relativerounded-lg shadow bg-gray-700">
                              <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent  rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                                data-modal-hide="authentication-modal"
                                onClick={() => setOpenModal(false)}
                              >
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 14 14"
                                >
                                  <path
                                    stroke="currentColor"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                  />
                                </svg>
                                <span className="sr-only">Close modal</span>
                              </button>
                              <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium  text-white">
                                  Edit Semester List
                                </h3>
                                <div>
                                  <label className="mb-2 text-sm font-medium  text-white flex">
                                    Semester Id
                                  </label>
                                  <input
                                    defaultValue={currentSemester.semesterId}
                                    className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                    placeholder=""
                                    readOnly
                                  />
                                </div>
                                <div>
                                  <label className="mb-2 text-sm font-medium text-white flex">
                                    Semester Name
                                  </label>
                                  <input
                                    value={currentSemester.semesterName}
                                    onChange={(e) =>
                                      setCurrentSemester({
                                        ...currentSemester,
                                        semesterName: e.target.value,
                                      })
                                    }
                                    className=" border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                  />
                                </div>
                                <div>
                                  <label className="mb-2 text-sm font-medium text-white flex">
                                    Major
                                  </label>

                                  <ReactSelect
                                    options={options}
                                    isMulti={true}
                                    value={currentSemester?.listMajor?.map(
                                      (major) => {
                                        return {
                                          id: major.majorId,
                                          value: major,
                                          label:
                                            major.majorId +
                                            " - " +
                                            major.majorName,
                                        }
                                      }
                                    )}
                                    onChange={(selectedOption) => {
                                      // Update the selectedOption state
                                      const newListMajor = selectedOption.map(
                                        (item) => item.value
                                      )
                                      setCurrentSemester((prevSemester) => ({
                                        ...prevSemester,
                                        listMajor: newListMajor
                                          ? newListMajor
                                          : null,
                                      }))
                                    }}
                                  />
                                </div>

                                <div className="flex justify-between">
                                  <div className="flex items-start"></div>
                                </div>
                                <div className="flex flex-row p-4 gap-5 items-end">
                                  <button
                                    type="submit"
                                    className=" text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                                    onClick={() => UpdateSemester()}
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="submit"
                                    className=" text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
                                    onClick={() => setOpenModal(false)}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {openModalAdd ? (
                        <div className="fixed top-0 left-0  w-full h-full bg-black bg-opacity-20 z-[1000]">
                          <div className="modal absolute w-[28%] translate-x-[-50%] translate-y-[-50%]  z-20 top-[50%] left-[50%]">
                            <div className="relativerounded-lg shadow bg-gray-700">
                              <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent  rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                                data-modal-hide="authentication-modal"
                                onClick={() => setOpenModalAdd(false)}
                              >
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 14 14"
                                >
                                  <path
                                    stroke="currentColor"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                  />
                                </svg>
                                <span className="sr-only">Close modal</span>
                              </button>
                              <div className="px-6 py-6 lg:px-8 flex flex-col gap-y-4">
                                <h3 className="mb-4 text-xl font-medium  text-white">
                                  Add Semester
                                </h3>
                                <div>
                                  <label className="mb-2 text-sm font-medium  text-white flex">
                                    Semester Id
                                  </label>
                                  <input
                                    className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                    placeholder="Semester Id"
                                    onChange={(e) =>
                                      setCurrentSemester({
                                        ...currentSemester,
                                        semesterId: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="mb-2 text-sm font-medium  text-white flex">
                                    Semester Name
                                  </label>
                                  <input
                                    onChange={(e) =>
                                      setCurrentSemester({
                                        ...currentSemester,
                                        semesterName: e.target.value,
                                      })
                                    }
                                    className=" border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                  />
                                </div>
                                <div>
                                  <label className="mb-2 text-sm font-medium  text-white flex">
                                    Major
                                  </label>
                                  <ReactSelect
                                    options={options}
                                    isMulti={true}
                                    onChange={(data) => {
                                      const newListMajor = data.map(
                                        (item) => item.value
                                      )

                                      setSelectedOption(
                                        selectedOption
                                          ? selectedOption.value
                                          : null
                                      )
                                      setCurrentSemester({
                                        ...currentSemester,
                                        listMajor: newListMajor,
                                      })
                                    }}
                                  />
                                </div>

                                <div className="flex justify-between">
                                  <div className="flex items-start"></div>
                                </div>
                                <div className="flex flex-row p-4 gap-5 items-end">
                                  <button
                                    type="submit"
                                    className="w-full text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                                    onClick={() => AddSemester()}
                                  >
                                    Add
                                  </button>
                                  <button
                                    type="submit"
                                    className="w-full text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
                                    onClick={() => setOpenModalAdd(false)}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {openModalConfirm ? (
                        <div className="fixed top-0 left-0  w-full h-full bg-gray-200 bg-opacity-5 z-[1000]">
                          <div className="absolute top-0 left-0 w-full h-full">
                            <div className="translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%]">
                              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button
                                  type="button"
                                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                  data-modal-hide="popup-modal"
                                  onClick={() => setOpenModalConfirm(false)}
                                >
                                  <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                  </svg>
                                  <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-10 text-center">
                                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this
                                    semester?
                                  </h3>
                                  <button
                                    data-modal-hide="popup-modal"
                                    type="button"
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                    onClick={() =>
                                      onDeleteSemester(currentSemester)
                                    }
                                  >
                                    Delete
                                  </button>
                                  <button
                                    data-modal-hide="popup-modal"
                                    type="button"
                                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5"
                                    onClick={() => setOpenModalConfirm(false)}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {semester.listMajor
                        .map((item) => item.majorId)
                        .join(", ")}
                    </td>

                    <td>
                      <>
                        {semester.status.toLowerCase() === "active" ? (
                          <StatusButton
                            color={color.green}
                            bgColor={color.greenLight}
                            title="Active"
                          />
                        ) : semester.status.toLowerCase() === "inactive" ? (
                          <StatusButton
                            color={color.red}
                            bgColor={color.redLight}
                            title="Inactive"
                          />
                        ) : (
                          <>-</>
                        )}
                      </>
                    </td>
                    <td>
                      <div className="">
                        {semester.status.toLowerCase() === "active" ? (
                          <>
                            {" "}
                            <button
                              type="button"
                              id="Delete"
                              className="focus:outline-none text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-red-600 hover:bg-red-700 focus:ring-red-900"
                              onClick={() =>
                                // onDeleteClassroom(classroom)
                                {
                                  setCurrentSemester(semester)
                                  setOpenModalConfirm(true)
                                }
                              }
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              id="Edit"
                              className="text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
                              onClick={() => {
                                setOpenModal(!openModal)
                                setSelectedOption(semester.majorId)
                                setCurrentSemester(semester)
                              }}
                            >
                              Edit
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => restoreSemester(semester)}
                            className="focus:outline-none text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-gray-400 hover:bg-gray-500 focus:ring-gray-600"
                          >
                            <svg
                              viewBox="64 64 896 896"
                              focusable="false"
                              data-icon="redo"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M758.2 839.1C851.8 765.9 912 651.9 912 523.9 912 303 733.5 124.3 512.6 124 291.4 123.7 112 302.8 112 523.9c0 125.2 57.5 236.9 147.6 310.2 3.5 2.8 8.6 2.2 11.4-1.3l39.4-50.5c2.7-3.4 2.1-8.3-1.2-11.1-8.1-6.6-15.9-13.7-23.4-21.2a318.64 318.64 0 01-68.6-101.7C200.4 609 192 567.1 192 523.9s8.4-85.1 25.1-124.5c16.1-38.1 39.2-72.3 68.6-101.7 29.4-29.4 63.6-52.5 101.7-68.6C426.9 212.4 468.8 204 512 204s85.1 8.4 124.5 25.1c38.1 16.1 72.3 39.2 101.7 68.6 29.4 29.4 52.5 63.6 68.6 101.7 16.7 39.4 25.1 81.3 25.1 124.5s-8.4 85.1-25.1 124.5a318.64 318.64 0 01-68.6 101.7c-9.3 9.3-19.1 18-29.3 26L668.2 724a8 8 0 00-14.1 3l-39.6 162.2c-1.2 5 2.6 9.9 7.7 9.9l167 .8c6.7 0 10.5-7.7 6.3-12.9l-37.3-47.9z"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/**show page */}
            <div className="sticky bottom-0 bg-white p-2">
              {semesters?.length ? (
                <Pagination
                  currentPage={pagination.currentPage - 1}
                  setCurrentPage={(page) => {
                    setParam({ ...param, page: page + 1 })
                  }}
                  totalPages={pagination.totalPage}
                  edgePageCount={3}
                  middlePagesSiblingCount={1}
                  className="flex items-center justify-center mt-4"
                  truncableText="..."
                  truncableClassName=""
                >
                  <Pagination.PrevButton
                    className={`w-8 md:w-10 h-8 md:h-10 rounded-lg border-solid border border-primary ${
                      pagination.currentPage > 0
                        ? "cursor-pointer "
                        : "cursor-default hidden"
                    }`}
                  >
                    {" "}
                    <div className="w-full h-full flex justify-center items-center">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                      </svg>
                    </div>
                    {/* <img src={PreIcon} className="h-3 w-3" alt="arrPrev" /> */}
                  </Pagination.PrevButton>

                  <div className="flex items-center justify-center mx-6 list-none ">
                    {semesters?.length > 0 ? (
                      <Pagination.PageButton
                        activeClassName="bg-blue-button border-0 text-white "
                        inactiveClassName="border"
                        className="flex justify-center items-center rounded-lg border-solid  border-primary mx-1 w-10 h-10 cursor-pointer font-medium bg-slate-700 text-gray-300"
                      />
                    ) : (
                      <div className="flex justify-center items-center rounded-lg  mx-1 w-10 h-10 cursor-pointer font-medium bg-blue-button border-0 text-white">
                        1
                      </div>
                    )}
                  </div>

                  <Pagination.NextButton
                    className={`w-8 md:w-10 h-8 md:h-10 rounded-lg border-solid border border-primary  ${(
                      page
                    ) =>
                      page > semesters?.length
                        ? "cursor-pointer"
                        : "cursor-not-allowed"}`}
                  >
                    <div className="w-full h-full flex justify-center items-center">
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 "
                      >
                        <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    </div>
                  </Pagination.NextButton>
                </Pagination>
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SemesterDashboard
