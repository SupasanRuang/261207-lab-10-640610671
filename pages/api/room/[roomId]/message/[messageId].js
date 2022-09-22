import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  if (req.method === "DELETE") {
    //read value from URL
    const roomId = req.query.roomId;
    const messageId = req.query.messageId;
    const rooms = readDB();

    const roomIdx = rooms.findIndex((x) => x.roomId === roomId);
    //console.log("R", roomIdx);
    if (roomIdx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    } else {
      const listMessages = rooms[roomIdx].messages;
      const messageIdx = listMessages.findIndex(
        (x) => x.messageId === messageId
      );
      //console.log("M", roomIdx);
      if (messageIdx === -1) {
        return res
          .status(404)
          .json({ ok: false, message: "Invalid message id" });
      } else {
        listMessages.splice(messageIdx, 1);
        rooms[roomIdx].messages = listMessages;
        writeDB(rooms);
        //console.log(messageIdx);
        return res.json({ ok: true });
      }
    }
  }
}
