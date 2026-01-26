import { useRef, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getValidAccessToken } from "../apis/getValidAccessToken";

const SOCKET_URL = "http://180.210.81.232:8080/api/socket/doc/wss";
const SUB_PATH = (id) => `/sub/document/${id}`;
const PUB_PATH = "/pub/editing";

const useDocumentSocket = ({ documentId, onMessage }) => {
  const clientRef = useRef(null);
  const subRef = useRef(null);
  const isConnectedRef = useRef(false);

  const connect = useCallback(async () => {
    if (!documentId) return console.warn("documentId 없음, 소켓 연결 중단");
    if (isConnectedRef.current || clientRef.current) {
      console.log("이미 연결된 상태, connect 스킵");
      return;
    }

    try {
      const token = await getValidAccessToken();
      const socket = new SockJS(SOCKET_URL);

      const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000, // 5초후 재연결시도
        debug: () => {},
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        onConnect: () => {
          console.log("STOMP 연결 성공");
          isConnectedRef.current = true;
          subRef.current = client.subscribe(
            SUB_PATH(documentId),
            (msg) => {
              try {
                const parsed = JSON.parse(msg.body); // 한번만 파싱
                onMessage?.(parsed.message || parsed);
              } catch (err) {
                console.error("메시지 파싱 오류", err, msg.body);
              }
            },
            { Authorization: `Bearer ${token}` },
          );
        },
        onStompError: (frame) => {
          console.error("STOMP 오류:", frame.headers["message"]);
        },
      });

      client.activate();
      clientRef.current = client;
    } catch (err) {
      console.error("소켓 연결 중 예외 발생.", err);
    }
  }, [documentId, onMessage]);

  const disconnect = useCallback(() => {
    if (!isConnectedRef.current) return;
    try {
      subRef.current?.unsubscribe();
      clientRef.current?.deactivate();
      isConnectedRef.current = false;
      clientRef.current = null;
      console.log("소켓 정상 종료");
    } catch (err) {
      console.error("disconnect 중 오류 발생", err);
    }
  }, []);

  // 메시지 전송
  const sendMessage = useCallback(
    async ({ title, content, status, cursor }) => {
      if (!clientRef.current?.connected || !documentId) return;

      try {
        const token = await getValidAccessToken();
        const userName = localStorage.getItem("userName");
        const userEmail = localStorage.getItem("email");

        clientRef.current.publish({
          destination: PUB_PATH,
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            documentId,
            message: {
              documentId,
              title,
              content,
              status,
              user: { userName, userEmail },
              cursor: {
                from: cursor?.from ?? 0,
                to: cursor?.to ?? 0,
              },
            },
          }),
        });
      } catch (err) {
        console.error("메시지 전송 중 오류 발생", err);
      }
    },
    [documentId],
  );

  return { connect, disconnect, sendMessage };
};

export default useDocumentSocket;
