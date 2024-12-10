import { useState } from "react";
import { Webinar } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { ParticipantsList } from "@/components/participants/ParticipantsList";
import axios from "axios";

interface WebinarCardProps {
  webinar: Webinar;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onFetchWebinars: () => void;
}

export function WebinarCard({
  webinar,
  onEdit,
  onDelete,
  onFetchWebinars,
}: WebinarCardProps) {
  const [showParticipants, setShowParticipants] = useState(false);
  const [participantsData, setParticipantsData] = useState([]);

  const handleParticipantsClick = async () => {
    try {
      const response = await axios.post(
        `http://192.168.0.105:8000/api/event/getall/${webinar._id}`
      );
      setParticipantsData(response.data.registrations);
      setShowParticipants(true);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const handleCloseParticipants = () => {
    setShowParticipants(false);
  };

  const statusColors = {
    upcoming: "bg-blue-500",
    live: "bg-green-500",
    completed: "bg-gray-500",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleEdit = async (id: string) => {
    try {
      const response = await axios.put(
        `http://192.168.0.105:8000/api/event/edit/${id}`,
        {
          heading: webinar.heading,
          date: webinar.date,
          time: webinar.time,
          participantsData: webinar.participantsData,
        }
      );
      onEdit(id);
    } catch (error) {
      console.error("Error editing webinar:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://192.168.0.105:8000/api/event/delete/${id}`);
      onDelete(id);
      onFetchWebinars();
    } catch (error) {
      console.error("Error deleting webinar:", error);
    }
  };

  return (
    <Card className="bg-[#1f1f1f] border-[#2a2a2a] p-4 md:p-6 hover:shadow-[0_0_20px_rgba(0,255,136,0.1)] transition-shadow">
      <div className="flex flex-col md:flex-row justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white">{webinar.heading}</h3>
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs font-medium cursor-pointer",
            statusColors["live"]
          )}
        >
          {webinar.status ? "Upcoming" : "Upcoming"}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-gray-400">
          <span className="text-sm">
            {formatDate(webinar.date)} at {webinar.time}
          </span>
        </div>
        <div
          onClick={handleParticipantsClick}
          className="flex items-center text-gray-300 bg-gradient-to-r from-green-700 via-green-800 to-green-700 rounded-lg p-2 hover:from-green-600 hover:via-green-700 hover:to-green-600 hover:text-white cursor-pointer shadow-lg transition-all duration-300"
        >
          <Users className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {webinar.registrations.length} participants
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-x-0 md:space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleEdit(webinar._id)}
          className="hover:bg-[#2a2a2a] hover:text-[#00ff88] border-[#2a2a2a] mb-2 md:mb-0"
        >
          <Edit2 className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDelete(webinar._id)}
          className="hover:bg-red-500/10 hover:text-red-500 border-[#2a2a2a]"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>

      {showParticipants && (
        <ParticipantsList
          participants={participantsData}
          onClose={handleCloseParticipants}
        />
      )}
    </Card>
  );
}
