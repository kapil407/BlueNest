import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "../redux/messageSlice";
import { USER_API_END_POINT } from "../Utils/constant";
import { useParams } from "react-router-dom";

const useGetMessages = () => {
  const {accessToken} = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { targetUserId } = useParams();
  const { message } = useSelector((store) => store.message);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${USER_API_END_POINT}/getMessage/${targetUserId}`,
          {},
          {
            headers:{
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          },
        );
        console.log("res getmessage", res?.data);
        dispatch(setMessage(res?.data?.conversation?.messageId));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [targetUserId]);
};

export default useGetMessages;
