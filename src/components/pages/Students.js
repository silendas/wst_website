import React, { useState, useEffect } from 'react';
import { getStudents, addStudent, updateStudent, deleteStudent } from '../../api/studentApi';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import CustomModal from '../common/Modal';
import { CustomToast, notifySuccess, notifyError } from '../notifications/CustomToast';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '', department: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await getStudents();
    if (response.success) {
      setStudents(response.data);
    } else {
      notifyError(response.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const response = await updateStudent(formData.id, formData);
      if (response.success) {
        fetchStudents();
        notifySuccess('Student updated successfully');
      } else {
        notifyError(response.message);
      }
    } else {
      const response = await addStudent(formData);
      if (response.success) {
        fetchStudents();
        notifySuccess('Student added successfully');
      } else {
        notifyError(response.message);
      }
    }
    setFormData({ id: '', name: '', department: '' });
    setIsEditing(false);
    setModalIsOpen(false);
  };

  const handleEdit = (student) => {
    setFormData(student);
    setIsEditing(true);
    setModalIsOpen(true);
  };

  const handleDelete = async () => {
    if (studentToDelete) {
      const response = await deleteStudent(studentToDelete.id);
      if (response.success) {
        fetchStudents();
        notifySuccess('Student deleted successfully');
      } else {
        notifyError(response.message);
      }
      setStudentToDelete(null);
      setConfirmModalIsOpen(false);
    }
  };

  const openConfirmModal = (student) => {
    setStudentToDelete(student);
    setConfirmModalIsOpen(true);
  };

  const closeConfirmModal = () => {
    setStudentToDelete(null);
    setConfirmModalIsOpen(false);
  };

  const openModal = () => {
    setFormData({ id: '', name: '', department: '' });
    setIsEditing(false);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Student Management</h2>
        <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
          <AiOutlinePlus className="mr-2" /> Add Student
        </button>
        <table className="min-w-full bg-white mt-4 border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="py-2 border border-gray-300">No</th>
              <th className="py-2 border border-gray-300">ID</th>
              <th className="py-2 border border-gray-300">Name</th>
              <th className="py-2 border border-gray-300">Department</th>
              <th className="py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id} className="text-center">
                <td className="py-2 border border-gray-300">{index + 1}</td>
                <td className="py-2 border border-gray-300">{student.id}</td>
                <td className="py-2 border border-gray-300">{student.name}</td>
                <td className="py-2 border border-gray-300">{student.department}</td>
                <td className="py-2 border border-gray-300">
                  <button onClick={() => handleEdit(student)} className="text-blue-500">
                    <AiOutlineEdit />
                  </button>
                  <button onClick={() => openConfirmModal(student)} className="ml-2 text-red-500">
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Student Modal">
        <h2>{isEditing ? 'Update Student' : 'Add Student'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="id" value={formData.id} />
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="department" className="block mb-1">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button type="button" onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Close
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              {isEditing ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </CustomModal>

      <CustomModal isOpen={confirmModalIsOpen} onRequestClose={closeConfirmModal} contentLabel="Confirm Delete Modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this student?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={closeConfirmModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </CustomModal>

      <CustomToast />
    </>
  );
};

export default Students;