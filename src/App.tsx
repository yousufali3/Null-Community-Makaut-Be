import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "@/components/auth/login-form";
import { Sidebar } from "@/components/layout/sidebar";
import { WebinarCard } from "@/components/webinars/webinar-card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { NewWebinarForm } from "@/components/webinars/NewWebinarForm";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#121212]">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}

function Dashboard() {
  const [showNewWebinarForm, setShowNewWebinarForm] = useState(false);
  const [webinars, setWebinars] = useState([]);

  useEffect(() => {
    fetchWebinars();
  }, []);

  const fetchWebinars = async () => {
    try {
      const response = await axios.get(
        "http://192.168.0.105:8000/api/event/getall"
      );
      setWebinars(response.data.events);
    } catch (error) {
      console.error("Error fetching webinars:", error);
    }
  };

  const handleEdit = (id: string) => {
    console.log("Edit webinar:", id);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://192.168.0.105:8000/api/event/delete/${id}`);
      fetchWebinars();
    } catch (error) {
      console.error("Error deleting webinar:", error);
    }
  };

  const handleCreateWebinar = async (newWebinar: {
    title: string;
    date: string;
    time: string;
    participants: number;
  }) => {
    try {
      await axios.post(
        "http://192.168.0.105:8000/api/event/create",
        newWebinar
      );
      fetchWebinars();
      setShowNewWebinarForm(false);
    } catch (error) {
      console.error("Error creating webinar:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Webinars</h1>
        <Button
          className="bg-[#00ff88] hover:bg-[#00ff88]/90 text-black mt-4 md:mt-0"
          onClick={() => setShowNewWebinarForm(true)}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          New Webinar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {webinars.map((webinar) => (
          <WebinarCard
            key={webinar.id}
            webinar={webinar}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {showNewWebinarForm && (
        <NewWebinarForm
          onClose={() => setShowNewWebinarForm(false)}
          onCreate={handleCreateWebinar}
        />
      )}

      <ToastContainer />
    </DashboardLayout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
