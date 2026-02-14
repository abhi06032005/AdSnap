import { useEffect, useState } from "react";
import type { Project } from "../types";
import { dummyProjects } from "../assets/dummy-data";
import { Loader2Icon, RefreshCwIcon } from "lucide-react";
import { div } from "framer-motion/client";
import { Link } from "react-router";


const Result = () => {
  const [projects , setProjects] = useState<Project []>([]);
  const [Loading , setLoading] = useState(true);  
  const [isgenerating , setIsGenerating] = useState(false);

  const fetchProjectData =async()=>{
    setTimeout(()=>{
      setProjects(dummyProjects)
      setLoading(false);
    },3000)

    useEffect(()=>{
      fetchProjectData()
    },[])
  }
  return Loading ?(
    <>
    <div className="flex items-center justify-center min-h-screen">
      <Loader2Icon className="size-7 animate-spin text-indigo-400" />
    </div>
    </>
    
  ):(
    <div className="min-h-screen text-white p-6 md:p-12 my-28">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-medium mb-3">Generation Result</h1>
          <Link to="/generate" className="btn-secondary text-sm flex items-center">
          <RefreshCwIcon  className="w-4 h-4"/>
          <p className="max-sm: hidden">New Generation</p>
          </Link>
        </header>
        </div>
    </div>
  )
}

export default Result