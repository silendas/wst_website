import React, { useState, useEffect } from 'react';
import { getLecturers, addLecturer, updateLecturer, deleteLecturer } from '../../api/lecturerApi';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import CustomModal from '../common/Modal';
import { CustomToast, notifySuccess, notifyError } from '../notifications/CustomToast';

const Lecturer = () => {
  const [lecturers, setLecturers] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [lecturerToDelete, setLecturerToDelete] = useState(null);

  useEffect(() => {
    fetchLecturers();
  }, []);

  const fetchLecturers = async () => {
    const response = await getLecturers();
    if (response.success) {
      setLecturers(response.data);
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
      const response = await updateLecturer(formData.id, formData);
      if (response.success) {
        fetchLecturers();
        notifySuccess('Lecturer updated successfully');
      } else {
        notifyError(response.message);
      }
    } else {
      const response = await addLecturer(formData);
      if (response.success) {
        fetchLecturers();
        notifySuccess('Lecturer added successfully');
      } else {
        notifyError(response.message);
      }
    }
    setFormData({ id: '', name: '' });
    setIsEditing(false);
    setModalIsOpen(false);
  };

  const handleEdit = (lecturer) => {
    setFormData(lecturer);
    setIsEditing(true);
    setModalIsOpen(true);
  };

  const handleDelete = async () => {
    if (lecturerToDelete) {
      const response = await deleteLecturer(lecturerToDelete.id);
      if (response.success) {
        fetchLecturers();
        notifySuccess('Lecturer deleted successfully');
      } else {
        notifyError(response.message);
      }
      setLecturerToDelete(null);
      setConfirmModalIsOpen(false);
    }
  };

  const openConfirmModal = (lecturer) => {
    setLecturerToDelete(lecturer);
    setConfirmModalIsOpen(true);
  };

  const closeConfirmModal = () => {
    setLecturerToDelete(null);
    setConfirmModalIsOpen(false);
  };

  const openModal = () => {
    setFormData({ id: '', name: '' });
    setIsEditing(false);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Lecturer Management</h2>
        <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
          <AiOutlinePlus className="mr-2" /> Add Lecturer
        </button>
        <table className="min-w-full bg-white mt-4 border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="py-2 border border-gray-300">No</th>
              <th className="py-2 border border-gray-300">ID</th>
              <th className="py-2 border border-gray-300">Name</th>
              <th className="py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lecturers.map((lecturer, index) => (
              <tr key={lecturer.id} className="text-center">
                <td className="py-2 border border-gray-300">{index + 1}</td>
                <td className="py-2 border border-gray-300">{lecturer.id}</td>
                <td className="py-2 border border-gray-300">{lecturer.name}</td>
                <td className="py-2 border border-gray-300">
                  <button onClick={() => handleEdit(lecturer)} className="text-blue-500">
                    <AiOutlineEdit />
                  </button>
                  <button onClick={() => openConfirmModal(lecturer)} className="ml-2 text-red-500">
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Lecturer Modal">
        <h2>{isEditing ? 'Update Lecturer' : 'Add Lecturer'}</h2>
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
        <p>Are you sure you want to delete this lecturer?</p>
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

export default Lecturer;