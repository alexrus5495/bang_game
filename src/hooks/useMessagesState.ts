import { useDispatch } from "react-redux";
import type { RootState } from "../store";
import { useAppSelector } from "./useAppSelector";
import type { Messages } from "../types";
import { setMessages as setMessagesAction } from "../store/slices/messagesSlice";

export const useMessagesState = (): [
  Messages | null,
  (data: Messages) => void,
] => {
  const messages = useAppSelector((state: RootState) => state.messages);
  const dispatch = useDispatch();

  const setMessages = (data: Messages) => dispatch(setMessagesAction(data));
  return [messages, setMessages];
};
