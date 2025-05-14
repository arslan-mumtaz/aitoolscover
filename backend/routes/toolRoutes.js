const express = require('express');
const multer = require("multer");
const path = require("path");
const ToolSubmission = require("../models/ToolSubmission")

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

// Post
router.post('/tools', async (req, res) => {
    try {
        const { name, image } = req.body;

        if (!name || !image) {
            return res.status(404).json({
                error: "Name and image are required"
            })
        }
        const newTool = await ToolSubmission.create({ name, image })
        res.status(201).json({
            message: "Tools submitted successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to submit tool"
        })
    }
})

// GET all submitted tools
router.get('/tools', async (req, res) => {
    try {
        const tools = await ToolSubmission.find();
        const count = tools.length; // Count the number of tools
        res.status(200).json({ count, tools });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tools' });
    }
});

router.put('/tools/:id', async (req, res) => {
    
    try {
        const { id } = req.params;
        const { status } = req.body;

        // console.log("PUT /tools/:id", id, status);


        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const updatedTool = await ToolSubmission.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedTool) {
            return res.status(404).json({
                error: "Tool not Found"
            })
        }
        res.status(200).json(updatedTool);

    }
    catch (error) {
        res.status(500).json({
            error: "Failed to update tool status"
        })
    }
})

router.post("/tools-with-image", upload.single('image'), async (req, res) => {
    try {
        const { name } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        if (!name || !image) {
            return res.status(400).json({ error: "Name and image are required" });
        }

        const newTool = await ToolSubmission.create({ name, image });
        res.status(201).json({ message: "Tool submitted successfully", tool: newTool });
    } catch (error) {
        res.status(500).json({ error: "Failed to upload tool" });
    }
});



module.exports = router;