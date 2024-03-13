const express = require('express');
const sidebarItemModel = require("../models/admin/sidebarItemModel");

// const SidebarItem = require('../models/admin/sidebarItemModel');

const router = express.Router();

// Get All Sidebar Items
const allSidebarItem= async (req, res) => {
    try {
      const sidebarItems = await sidebarItemModel.find();
      res.send(sidebarItems);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  

  // Create Sidebar Item
  const createSidebarItem= async (req, res) => {
    try {
      const { heading, subtopics } = req.body;
      const formData = new sidebarItemModel({
        heading,
        subtopics,
      });
      console.log(formData)
      await formData.save();
      res.status(201).send({success:"true", message: "Sidebar data saved successfully"});
    } 
    catch (error) {
      console.error("Error saving form data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  
  // Update Sidebar Item
  const updateSlidebarItem=async (req, res) => {
    try {
      const updatedSidebarItem = await sidebarItemModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedSidebarItem) {
        return res.status(404).json({ message: 'Sidebar item not found' });
      }
      res.json(updatedSidebarItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Delete Sidebar Item
  const deleteSidebarItem=async (req, res) => {
    try {
      await sidebarItemModel.findByIdAndDelete(req.params.id);
      res.json({ message: 'Sidebar item deleted successfully' });
    } catch (err) {
      res.status(404).json({ message: 'Sidebar item not found' });
    }
  };
  
  module.exports = {deleteSidebarItem,updateSlidebarItem,createSidebarItem,allSidebarItem};