import express from "express";
import {
  deletedNotes,
  getAllNotes,
  getUserNotes,
  postNewNotes,
  updatedNotes,
} from "../controllers/notes.js";
const router = express.Router();

//Get All Notes
router.get("/all", async (req, res) => {
  try {
    const notes = await getAllNotes();
    if (!notes || notes.length <= 0) {
      return res.status(404).json({
        error: "No Content Available",
      });
    }
    res.status(200).json({
      data: notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
});

//Get All User Notes
router.get("/user/all", async (req, res) => {
  try {
    const notes = await getUserNotes(req);
    if (!notes || notes.length <= 0) {
      return res.status(404).json({
        error: "No Content Available",
      });
    }
    res.status(200).json({
      data: notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
});

//Add new user Notes
router.post("/user/add", async (req, res) => {
  try {
    const newPost = await postNewNotes(req);
    if (!newPost) {
      return res.status(400).json({
        error: "Error Occured While Uploading",
      });
    }
    res.status(200).json({
      message: "Successfully Uploaded",
      data: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
});

//Edit user Notes
router.put("/user/edit/:id", async (req, res) => {
  try {
    const editNotes = await updatedNotes(req);
    if (!updatedNotes) {
      return res.status(400).json({
        error: "Error Occured While Updating",
      });
    }
    res.status(200).json({
      message: "Successfully Updated",
      data: editNotes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
});

//Delete user Notes
router.delete("/user/delete/:id", async (req, res) => {
  try {
    const deleteNotes = await deletedNotes(req);
    if (!deleteNotes) {
      return res.status(400).json({
        error: "Error Occured While deleting",
      });
    }
    res.status(200).json({
      message: "Successfully Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
});

export const notesRouter = router;
