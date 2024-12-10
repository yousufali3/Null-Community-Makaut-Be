import React from "react";

interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string; // Assuming phone is part of the participant data
}

interface ParticipantsListProps {
  participants: Participant[];
  onClose: () => void;
}

export const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 text-white w-full max-w-3xl rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Registered Participants</h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-400 transition duration-300 font-semibold"
          >
            Close ✖
          </button>
        </div>
        {participants.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border border-gray-700 px-4 py-2 text-left">
                    #
                  </th>
                  <th className="border border-gray-700 px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border border-gray-700 px-4 py-2 text-left">
                    Email
                  </th>
                  <th className="border border-gray-700 px-4 py-2 text-left">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant, index) => (
                  <tr
                    key={participant.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                    } hover:bg-gray-600 transition duration-300`}
                  >
                    <td className="border border-gray-700 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {participant.name}
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {participant.email}
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {participant.contactNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center mt-4 text-gray-400">
            No participants registered.
          </p>
        )}
      </div>
    </div>
  );
};
