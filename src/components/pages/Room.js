import React, { useState, useEffect } from 'react';
import { getRooms, addRoom, updateRoom, deleteRoom } from '../../api/roomApi';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import CustomModal from '../common/Modal';
import { CustomToast, notifySuccess, notifyError } from '../notifications/CustomToast';

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({ id: '', code: '', capacity: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const response = await getRooms();
    if (response.success) {
      setRooms(response.data);
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
      const response = await updateRoom(formData.id, formData);
      if (response.success) {
        fetchRooms();
        notifySuccess('Room updated successfully');
      } else {
        notifyError(response.message);
      }
    } else {
      const response = await addRoom(formData);
      if (response.success) {
        fetchRooms();
        notifySuccess('Room added successfully');
      } else {
        notifyError(response.message);
      }
    }
    setFormData({ id: '', code: '', capacity: '' });
    setIsEditing(false);
    setModalIsOpen(false);
  };

  const handleEdit = (room) => {
    setFormData(room);
    setIsEditing(true);
    setModalIsOpen(true);
  };

  const handleDelete = async () => {
    if (roomToDelete) {
      const response = await deleteRoom(roomToDelete.id);
      if (response.success) {
        fetchRooms();
        notifySuccess('Room deleted successfully');
      } else {
        notifyError(response.message);
      }
      setRoomToDelete(null);
      setConfirmModalIsOpen(false);
    }
  };

  const openConfirmModal = (room) => {
    setRoomToDelete(room);
    setConfirmModalIsOpen(true);
  };

  const closeConfirmModal = () => {
    setRoomToDelete(null);
    setConfirmModalIsOpen(false);
  };

  const openModal = () => {
    setFormData({ id: '', code: '', capacity: '' });
    setIsEditing(false);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Room Management</h2>
        <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
          <AiOutlinePlus className="mr-2" /> Add Room
        </button>
        <table className="min-w-full bg-white mt-4 border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="py-2 border border-gray-300">No</th>
              <th className="py-2 border border-gray-300">ID</th>
              <th className="py-2 border border-gray-300">Code</th>
              <th className="py-2 border border-gray-300">Capacity</th>
              <th className="py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={room.id} className="text-center">
                <td className="py-2 border border-gray-300">{index + 1}</td>
                <td className="py-2 border border-gray-300">{room.id}</td>
                <td className="py-2 border border-gray-300">{room.code}</td>
                <td className="py-2 border border-gray-300">{room.capacity}</td>
                <td className="py-2 border border-gray-300">
                  <button onClick={() => handleEdit(room)} className="text-blue-500">
                    <AiOutlineEdit />
                  </button>
                  <button onClick={() => openConfirmModal(room)} className="ml-2 text-red-500">
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Room Modal">
        <h2>{isEditing ? 'Update Room' : 'Add Room'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="id" value={formData.id} />
          <div>
            <label htmlFor="code" className="block mb-1">Code</label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="capacity" className="block mb-1">Capacity</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
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
        <p>Are you sure you want to delete this room?</p>
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

export default Room;