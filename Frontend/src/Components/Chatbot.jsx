import { useState,useEffect,useRef } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoArrowUp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import store from "../redux/store.js";
import { TWEET_API_END_POINT } from "../Utils/constant.js";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { addMessage } from "../redux/ChatSlice.js";

const ChatBotComponent = () => {

  const chatRef = useRef(null);
  const dispatch = useDispatch();
  const conversation = useSelector((store) => store.chat.conversation);
  const theme = useSelector((store) => store.theme.theme);
  const islight = theme == "light";
  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [media, setMedia] = useState(null);
  const [response, setResponse] = useState("");

  const { name } = media || {};
  console.log("media", name);
  const handleAIGenerate = async () => {
    const formdata = new FormData();

    if (!prompt.trim() && !media) {
      toast.error("Please enter a prompt or select an image");
      return;
    }
    setLoading(true);

    if (media) {
      formdata.append("media", media);
    }

    formdata.append("prompt", prompt);

    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/api/simple-chat`,
        formdata,
        {
          withCredentials: true,
        },
      );

      console.log("res in Gemini", res);
      const aiResponse = res.data.postText;
      console.log("new respones", aiResponse);
      setResponse(aiResponse);
      dispatch(addMessage({ role: "user", content: prompt }));
      dispatch(addMessage({ role: "assistant", content: aiResponse }));
      console.log("Ai");

      if (res.data.success) {
        toast.success("Response generated successfully");
        setPrompt("");
        setMedia(null);
      }
    } catch (error) {
      console.error("error in gemini handler", error);

      toast.error(error.response?.data?.message || "Something went wrong");
      setPrompt("");

      //   console.log("error in AI", error.response.statusText);
    } finally {
      setLoading(false);
    }
  };

  const cancelMediaHandler = () => {
    setMedia(null);
  };

  conversation?.map((msg) => {
    console.log("msg", msg);
  });
  useEffect(() => {
  chatRef.current.scrollTop = chatRef.current.scrollHeight;
}, [prompt]);

  return (
    <>
      <div
        className={`lg:w-[70%] flex  flex-col justify-between h-full fixed backdrop-blur  z-50 ${islight ? "text-black" : "text-white"}`}
      >
        <div className="flex border-b lg:w-full px-4 border-slate-700 bg-slate-850 lg:h-[6%] items-center">
          <Link to="/">
            <FaLongArrowAltLeft className="lg:mx-4 lg:text-xl lg:my-2 cursor-pointer" />
          </Link>
          <h1 className="mx-4 my-1">ChatBot</h1>
        </div>
        <div className="lg:w-full  border-r border-slate-700 lg:py-2 lg:px-4 lg:h-[85%] overflow-auto flex items-center custom-scrollbar justify-center" ref={chatRef}>
          <div className="wrap lg:w-full  lg:ml-4  font-black break-words whitespace-normal">
            {conversation?.map((message, index) => {
              console.log("text in side map", message.content);
              return (
                <div key={index} className="flex justify-between  lg:w-full">
                  {message.role == "user" ? (
                    <>
                      <div className="text-slate-800 lg:text-xl px-3 mx-2 lg:max-w-[50%] lg:mb-4 mt-2 mb-2  lg:mt-4 bg-blue-400 rounded-xl lg:px-4 lg:py-2">
                        <p>{message.content}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="lg:w-[50%] lg:mt-4 lg:mb-2 px-2 lg:text-lg">
                        <p>{message.content}</p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
            {response}
          </div>
        </div>
        {name && (
          <>
            <IoClose
              className="lg:ml-[20%] cursor-pointer"
              size={20}
              onClick={cancelMediaHandler}
            />
            <span className="border inline lg:w-[20%] lg:px-2 lg:py-1 lg:ml-2 rounded-xl border-slate-700 ">
              {name}
            </span>
          </>
        )}
        <div
          className={`flex  lg:px-8 lg:py-6 pl-2 pr-2 mb-1 justify-between border border-slate-700 rounded-4xl lg:w-full  lg:mt-2 lg:mb-2 bg-slate-850 lg:h-[10%] ${name && "lg:h-8 "}`}
        >
          <div className={`flex gap-4 items-center lg:w-[80%]  `}>
            <input
              type="file"
              id="galleryUpload"
              accept="image/*"
              onChange={(e) => setMedia(e.target.files[0])}
              className="hidden"
            />
            <label htmlFor="galleryUpload">
              <FaPlus size={30} className="cursor-pointer" />
            </label>

            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e?.target?.value)}
              placeholder="Ask anything"
              className={`text-xl lg:w-full w-[70%] outline-none font-black  ${islight ? "text-black placeholder-black" : "text-white placeholder-white"}`}
            />
          </div>
          <div className="lg:mr-[2%]   lg:h-10 h-12 flex items-center  justify-center">
            <IoArrowUp
              className=" font-black text-white rounded-full  lg:w-12 lg:h-12 w-8 h-8 lg:h-10  lg:px-1  cursor-pointer bg-blue-500"
              onClick={handleAIGenerate}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatBotComponent;
