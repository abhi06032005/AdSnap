import { useState } from "react";
import Title from "../components/Title";
import UploadZone from "../components/UploadZone";
import { Loader2, RectangleHorizontalIcon, RectangleVerticalIcon } from "lucide-react";
import { PrimaryButton } from "../components/Buttons";

export default function Generator(){

    const [name , setName] =useState('');
    const [productname , setProductname] = useState('');
    const [productDescription , setProductDescription] = useState('');
    const [aspectRatio , setAspectRatio] = useState('9:16');
    const [productImage , setProductImage] = useState<File | null>(null);
    const [modelImage , setModelImage] = useState<File | null>(null);
    const [userPrompt , setUserPrompt] = useState('');
    const [isGenerating , setIsGenerating] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'model') => {
       if(e.target.files && e.target.files[0]) {
        if(type === 'product') setProductImage(e.target.files[0]);
        else setModelImage(e.target.files[0]);
    }};

    const handleGenerate = async(e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
    }

    
    return (
        <>
        <div className="min-h-screen text-white p-6 md:p-12 mt-28">
            <form onSubmit={handleGenerate} className="max-w-4xl mx-auto mb-45">
                <Title heading="Create In-Context Image" description="Upload your model and product images toe generate the 
                stunning , short-form video ads and rock on social media"/>

                <div className=" flex gap-20 max-sm:flex-col items-start justify-between">
                    <div className="flex flex-col w-full sm:max-w-60 gap-8 mt-8 mb-12">
                        <UploadZone label="Product Image" file={productImage} onChange={(e)=>handleFileChange(e, 'product')} onClear={()=>setProductImage(null)}/>
                        <UploadZone label="Model Image" file={modelImage} onChange={(e)=>handleFileChange(e, 'model')} onClear={()=>setModelImage(null)}/>
                    </div>
                    <div className="w-full">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm mb-4">Project Name</label>
                            <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter project name" className="w-full rounded-lg bg-white/3 border-2 border-violet-200/10 p-3  focus:border-violet-500/50  focus:ring-2 focus:ring-violet-500 outline-none transition-all"/>
                        </div>

                         <div className="mb-4">
                            <label htmlFor="productname" className="block text-sm mb-4">Product Name</label>
                            <input type="text" id="productname" value={productname} onChange={(e)=>setProductname(e.target.value)} placeholder="Enter product name" className="w-full rounded-lg bg-white/3 border-2 border-violet-200/10 p-3  focus:border-violet-500/50  focus:ring-2 focus:ring-violet-500 outline-none transition-all"/>
                        </div>

                         <div className="mb-4">
                            <label htmlFor="productDescription" className="block text-sm mb-4">Product Description<span className="text-xs text-gray-400 ml-2">(optional)</span></label>
                            <textarea id="productDescription" rows={4} value={productDescription} onChange={(e)=>setProductDescription(e.target.value)} placeholder="Enter product description" className="w-full rounded-lg bg-white/3 border-2 border-violet-200/10 p-3  focus:border-violet-500/50  focus:ring-2 focus:ring-violet-500 outline-none transition-all"/> 
                        </div>

                          <div className="mb-4">
                            <label className="block text-sm mb-4">Aspect Ratio</label>
                            <div className="flex gap-3">
                                <div className="bg-violet-300/20 p-2.5 rounded-lg ">
                                <RectangleVerticalIcon onClick={()=> setAspectRatio("9:16")} className={`cursor-pointer hover:text-violet-400 transition-colors ${aspectRatio === "9:16" ? "text-violet-500" : ""}`}/>
                                </div>
                                <div className="bg-violet-300/20 p-2.5 rounded-lg ">
                                <RectangleHorizontalIcon onClick={()=> setAspectRatio("16:9")} className={`cursor-pointer hover:text-violet-400 transition-colors ${aspectRatio === "16:9" ? "text-violet-500" : ""}`}/>
                                </div>
                            </div>

                            <div className="mb-4 mt-5">
                                <label htmlFor="userPrompt" className="block text-sm mb-4">User Prompt<span className="text-xs text-gray-400 ml-2">(optional)</span></label>
                                <textarea id="userPrompt" rows={4} value={userPrompt} onChange={(e)=>setUserPrompt(e.target.value)} placeholder="Enter user prompt" className="w-full rounded-lg bg-white/3 border-2 border-violet-200/10 p-3  focus:border-violet-500/50  focus:ring-2 focus:ring-violet-500 outline-none transition-all"/> 
                            </div>
                          </div>

                    </div>
                </div>
                <div className="mt-10 flex justify-center">
                   <PrimaryButton disabled={isGenerating} className="px-10 py-3 rounded-md disabled:opacity-70 disabled:cursor-not-allowed" onClick={()=>setIsGenerating(!isGenerating)}>
                    {isGenerating ? (<>
                        <Loader2 className="w-5 h-5 animate-spin ml-2"/> Generating....
                    </>)
                    :(<>
                        Generate Video
                    </>)}
                   </PrimaryButton>
                </div>
            </form>
        </div>
        </>
    )
}