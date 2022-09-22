import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const id = req.query.roomId;
    const roomIdx = rooms.findIndex((x) => x.roomId === id);
    //console.log(roomIdx);
    if (roomIdx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    } else {
      const listMessages = rooms[roomIdx].messages;
      return res.json({ ok: true, messages: listMessages });
    }
  } else if (req.method === "POST") {
    const rooms = readDB();
    const id = req.query.roomId;
    const roomIdx = rooms.findIndex((x) => x.roomId === id);
    //console.log(roomIdx);
    if (roomIdx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    } else {
      const listMessages = rooms[roomIdx].messages;

      //read request body
      const text = req.body.text;
      if (typeof req.body.text !== "string" || req.body.text.length === 0) {
        //console.log(req.body.text);
        return res
          .status(400)
          .json({ ok: false, message: "Invalid text input" });
      }
      //create new id
      const newId = uuidv4();
      const newMessage = { messageId: newId, text: text };
      listMessages.push(newMessage);
      rooms[roomIdx].messages = listMessages;
      writeDB(rooms);
      //console.log(req.body);
      return res.json({ ok: true, messages: newMessage });
    }
  }
}
