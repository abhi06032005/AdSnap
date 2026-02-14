import { useNavigate } from "react-router"
import type { Project } from "../types"
import { useState } from "react";

import { EllipsisIcon, ImageIcon, Loader2Icon, Share2Icon, Trash2Icon, VideoIcon } from "lucide-react";
import { div } from "framer-motion/client";
import { GhostButton, PrimaryButton } from "./Buttons";


const ProjectCard = ({gen , setGenerations , forCommunity = false} : { gen : Project ,  setGenerations :React.Dispatch<React.SetStateAction<Project[]>>
     , forCommunity?: boolean}) => {

    const navigate = useNavigate();
    const [menuOpen ,setMenuOpen] = useState(false);

    const handleDelete =async(id : string) =>{
        const confirm = window.confirm("Are you sure you want to delete this project?");
        if(!confirm) return;
        console.log(id);
    }

    const togglePublish =async(projectId : string) =>{
       
        console.log(projectId);
    }
  return (
    <div key = {gen.id} className="mb-4 break-inside-avoid">
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition group">
            {/*preview  */}
            <div className={`${gen.aspectRatio === '9:16' ? 'aspect-9/16' : 'aspect-video'} relative overflow-hidden bg-black`}>
                {gen.generatedImage &&(
                    <img src={gen.generatedImage} alt={gen.productName} className="absolute inset-0 w-full h-full object-cover transition duration-500 z-0 group-hover:opacity-0"></img>
                )}

                {
                    gen.generatedVideo && (
                        <video src={gen.generatedVideo} muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-500 z-10"
                        onMouseEnter={(e)=>e.currentTarget.play()}
                        onMouseLeave={(e)=>e.currentTarget.pause()}/>
                    )
                }

                {(!gen?.generatedVideo && !gen?.generatedImage ) && (
                    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black/20 z-20">
                        <Loader2Icon className="size-7 animate-spin"  />
                    </div>
                )}

                {/* status badge */}
                <div className="absolute left-3 top-3 z-30 flex gap-2 items-center">
                    {gen.isGenereating &&(
                    <span className="text-xs px-2 py-1 bg-yellow-600/30 text-yellow-200 rounded-full">
                        Generating</span>
                    )}

                       {gen.isPublished &&(
                    <span className="text-xs px-2 py-1 bg-green-600/30 text-green-200 rounded-full">
                        Published</span>
                    )}
                </div>

                {/* action menu for my generations page not for community */}

               {!forCommunity && (
                    <div 
                        onMouseEnter={()=>{setMenuOpen(true)}}
                        onMouseLeave={()=>(setMenuOpen(false))}
                        className="absolute right-3 top-3 z-40">
        
                        <EllipsisIcon className="bg-black/30 rounded-full p-1 size-7 cursor-pointer hover:bg-black/50 transition" />

                    {menuOpen && (
                    <ul className="absolute text-xs right-0 top-8 w-40 bg-black/80 backdrop-blur text-white border border-gray-500/50 rounded-lg shadow-lg py-1 z-50">
                        {gen.generatedImage && <a href="#" download className="flex gap-2 items-center px-4 py-2 hover:bg-white/10 cursor-pointer transition">
                            <ImageIcon size={14} />Download Image</a>}

                        {gen.generatedVideo && <a href="#" download className="flex gap-2 items-center px-4 py-2 hover:bg-white/10 cursor-pointer transition">
                            <VideoIcon size={14} />Download Video</a>}

                         {(gen.generatedImage  || gen.generatedVideo) && <button className="w-full flex gap-2 items-center px-4 py-2 hover:bg-white/10 cursor-pointer transition"
                            onClick={()=>navigator.share({
                            url: gen.generatedVideo || gen.generatedImage,
                            title: gen.productName,
                            text :gen.productDescription})} >
                            <Share2Icon size={14} />Share</button>}

                        <button onClick={()=>handleDelete(gen.id)}
                        className="w-full flex gap-2 items-center px-4 py-2 hover:bg-red-950/20 text-red-400 cursor-pointer transition">
                            <Trash2Icon size={14} />Delete</button>
                    </ul>
                    )}

                </div>
                )}


                {/* src images - circles */}
                <div className="absolute right-3 bottom-3 flex items-center z-50 pointer-events-none">
                    {gen.uploadedImages && gen.uploadedImages[0] && (
                        <img src={gen.uploadedImages[0]} alt="product" className="w-16 h-16 object-cover rounded-full border-2 border-white/20 shadow-lg" />
                    )}
                    {gen.uploadedImages && gen.uploadedImages[1] && (
                        <img src={gen.uploadedImages[1]} alt="model" className="w-16 h-16 object-cover rounded-full border-2 border-white/20 -ml-4 shadow-lg" />
                    )}
                </div>
            </div>

            {/* details of the project  */}
            <div className="p-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="font-medium text-lg mb-1">{gen.productName}</h3>
                        <p className="text-xs text-gray-400">Created: {new Date(gen.createdAt).toLocaleString()}</p>
                        {gen.updatedAt && (
                        <p className="text-xs text-gray-400">Updated: {new Date(gen.updatedAt).toLocaleString()}</p>

                        )}
                    </div>
                        <div className="text-right">
                            <div className="mt-2 flex flex-col items-end gap-1">
                                <span className="text-xs px-2 py-1 bg-white/5 rounded-full">Aspect: {gen.aspectRatio}</span>
                            </div>
                        </div>
                </div>
                     {/*product desc  */}
                     {gen.productDescription &&(
                        <div className="mt-3">
                            <p className="text-xs text-gray-400 mb-1">Description</p>
                            <div className="text-sm text-gray-300 bg-white/3 p-2 rounded-md">{gen.productDescription}</div>
                        </div>
                     )}

{/* user prompt */}
                        {gen.userPrompt&&(
                        <div className="mt-3">
                            <p className="text-xs text-gray-400 mb-1">Prompt</p>
                            <div className="text-sm text-gray-300">{gen.userPrompt}</div>
                        </div>
                     )}
                     {/* buttons */}

                     {!forCommunity &&(
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <GhostButton
                            onClick={()=>{navigate(`/result/${gen.id}`); scrollTo(0,0)}} >
                                View Details
                            </GhostButton>

                            <PrimaryButton onClick={()=>togglePublish(gen.id)}>
                                {gen.isPublished ? "Unpublish" : "Publish"}
                            </PrimaryButton>
                        </div>
                     )}



            </div>
        </div>
    </div>
  )
}

export default ProjectCard