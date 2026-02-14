import { useEffect, useState } from "react";
import type { Project } from "../types";
import { Loader2Icon } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { PrimaryButton } from "../components/Buttons";
import { dummyProjects } from "../assets/dummy-data";

const MyGenerations = () => {
  const [generations, setGenerations] = useState<Project[]>([]);
  const [Loading, setLoading] = useState(false);

  const fetchGenerations = async () => {
    setTimeout(() => {
      setGenerations(dummyProjects.slice(0, 3)); // Gets first 3 or however many exist
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    fetchGenerations();
  }, []);

  return Loading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2Icon className="size-7 animate-spin text-indigo-400" />
    </div>
  ) : (
    <div className="min-h-screen text-white p-6 md:p-12 my-28">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">My Generations</h1>
          <p className="text-gray-400">View and manage your AI-generated content</p>
        </header>
        {/* generation data */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {generations.map((gen) => (
            <ProjectCard key={gen.id} gen={gen} setGenerations={setGenerations} />
          ))}
          {generations.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center text-center gap-4">
              <div className="text-gray-500">
                No generations found. Start creating your first AI-generated content!
              </div>
              <PrimaryButton onClick={() => (window.location.href = "/generate")}>
                Generate New Content
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyGenerations;