import { useEffect, useState, useMemo } from "react";
import type { Project } from "../types";
import { dummyProjects } from "../assets/dummy-data";
import { ImageIcon, Loader2Icon, RefreshCwIcon, SparkleIcon, VideoIcon } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { GhostButton, PrimaryButton } from "../components/Buttons";

const Result = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const params = useParams<{ id?: string }>();
  const location = useLocation();
  const idFromQuery = useMemo(() => new URLSearchParams(location.search).get("id"), [location.search]);
  const targetId = params.id ?? idFromQuery ?? null;

  useEffect(() => {
    // simulate API / dummy load
    const fetchProjectData = async () => {
      setTimeout(() => {
        setProjects(dummyProjects);
        setLoading(false);
      }, 800);
    };
    fetchProjectData();
  }, []);

  const handleGenerateVideo = async()=>{
    setIsGenerating(true);
  }

  useEffect(() => {
    if (!loading && targetId) {
      const found = projects.find((p) => p.id === targetId) ?? null;
      setSelectedProject(found);
    } else if (!loading && !targetId) {
      setSelectedProject(null);
    }
  }, [loading, targetId, projects]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2Icon className="size-7 animate-spin text-indigo-400" />
      </div>
    );
  }

  // If a specific project id was provided, show its detail view
  if (selectedProject) {
    const p = selectedProject;
    return (
      <div className="min-h-screen text-white p-6 md:p-12 my-28">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 flex items-center justify-center">
            <h1 className="text-2xl md:text-3xl font-medium mb-3">Generation Result</h1>
            <Link to="/generate" className="btn-secondary text-sm flex items-center gap-2">
              <RefreshCwIcon className="w-4 h-4" />
            </Link>
          </header>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-panel p-2 rounded-2xl">
                <div className={`${p.aspectRatio === "9:16" ? "aspect-9/16" : "aspect-video"} sm:max-h-200 bg-gray-900 rounded-xl overflow-hidden relative`}>
                  {p.generatedVideo ? (
                    <video src={p.generatedVideo} controls autoPlay loop className="w-full h-full object-cover" />
                  ) : (
                    <img src={p.generatedImage ?? ""} alt="Generated" className="w-full h-full object-cover" />
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl">
                <h3>Actions</h3>
                <div>
                  <a href={p.generatedImage ?? ""} download>
                    <GhostButton
                      disabled={!p.generatedImage}
                      className="w-full justify-center rounded-md py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ImageIcon size={18} />
                      Download Image
                    </GhostButton>
                  </a>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl">
                <h4 className="mb-3">Details</h4>
                <div className="text-sm text-gray-300">{p.productDescription}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise show all projects (map)
  return (
    <div className="min-h-screen text-white p-6 md:p-12 my-28">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-medium mb-3">Generation Result</h1>
          <Link to="/generate" className="btn-secondary text-sm flex items-center gap-2">
            <RefreshCwIcon className="w-4 h-4" />
          </Link>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div key={proj.id} className="glass-panel p-2 rounded-2xl">
              <div className={`${proj.aspectRatio === "9:16" ? "aspect-9/16" : "aspect-video"} bg-gray-900 rounded-xl overflow-hidden relative`}>
                {proj.generatedVideo ? (
                  <video src={proj.generatedVideo} muted loop playsInline className="w-full h-full object-cover" />
                ) : (
                  <img src={proj.generatedImage ?? proj.uploadedImages?.[0] ?? ""} alt={proj.productName} className="w-full h-full object-cover" />
                )}

                <div className="absolute left-3 top-3 z-10 flex gap-2 items-center">
                  {proj.isGenereating && <span className="text-xs px-2 py-1 bg-yellow-600/30 text-yellow-200 rounded-full">Generating</span>}
                  {proj.isPublished && <span className="text-xs px-2 py-1 bg-green-600/30 text-green-200 rounded-full">Published</span>}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-lg mb-1">{proj.productName}</h3>
                <p className="text-xs text-gray-400 mb-2">{proj.productDescription}</p>

                <div className="flex items-center gap-2">
                  <Link to={`/result?id=${proj.id}`} className="ml-0">
                    <GhostButton className="mr-2">View Details</GhostButton>
                  </Link>

                  <a href={proj.generatedImage ?? ""} download>
                    <GhostButton
                      disabled={!proj.generatedImage}
                      className="w-full justify-center rounded-md py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ImageIcon size={18} /> Download Image
                    </GhostButton>
                  </a>
                  <a href={proj.generatedVideo ?? ""} download>
                    <GhostButton
                      disabled={!proj.generatedVideo}
                      className="w-full justify-center rounded-md py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <VideoIcon size={18} /> Download Video
                    </GhostButton>
                  </a>

                  <div className="text-xs text-gray-400 ml-auto">Created: {new Date(proj.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <VideoIcon size={24}/>
                </div>
                <h3 className="text-xl font-semibold mb-2">Video Magic</h3>
                <p className="text-gray-400 text-sm mb-6">Turn this image into a dynamic video for social media.</p>
                  {!proj.generatedVideo ? (
                    <PrimaryButton onClick={handleGenerateVideo} disabled={isGenerating} className="w-full">
                      {isGenerating ?(
                        <div>Generating Video ...</div>
                      ):(
                        <><SparkleIcon className="size-4"/>Generate Video</>
                      )}
                      
                      </PrimaryButton>
                  ):(
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 
                    text-center text-sm font-medium">
                      Video Generated successfully! <br />
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;