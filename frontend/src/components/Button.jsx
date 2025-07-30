export function SocialButton({label ,icon}){


    return( <button className=" cursor-pointer w-full bg-[#181a20] border-2 border-[#2f323b] rounded-2xl h-16 text-white flex items-center justify-center gap-3 mb-3">
       {icon} <span>{label}</span> 
        </button>);
}

