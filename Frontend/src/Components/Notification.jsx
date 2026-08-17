      import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Typewriter from "./TypeWriter";


const NotificationComponent=()=>{
    const theme = useSelector((store) => store.theme.theme);
    const islight = theme == "light";
    return (
        <div className="flex flex-col   fixed inset-0 z-50 flex  items-center justify-center bg-black/30 backdrop-blur-sm">    
                        <h1 className="text-2xl py-2 bg-cover bg-center bg-clip-text text-transparent" 
                        style={{
                            backgroundImage: `url(/notifi.jpg)`,
                           
                        }}
                        >
                           <Typewriter word="Your latest updates are here."/>
                           
                            </h1>  
                <div className={`flex h-full w-full flex-col  lg:w-[50%] lg:h-[70%]  text-white  lg:border-b border-slate-700   text-xl font-black 
                   `}
                    style={{
                        backgroundImage: `url(/notifi.jpg)`,
                        backgroundSize: "cover",
                    }}
                    >
                     <div className="flex items-center gap-4 w-full py-2 lg:h-[20%] px-2 border-b border-white/50   text-xl font-black ">
                    <Link to="/">
                        <FaLongArrowAltLeft size={20} className="cursor-pointer" />
                    </Link>
                    <h1>Notifications</h1>
                </div>

                    
            <div className="flex h-full  w-full items-center justify-center rounded-xl  text-sm font-black ">
              <h1 className="text-2xl font-bold">Notification Component</h1>
            </div>

                </div>
        </div>
    )
}
export default NotificationComponent;