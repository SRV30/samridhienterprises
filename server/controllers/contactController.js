const Contact = require("../models/ContactMessage");

exports.submitContactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getContactForms = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteContactForms = async (req, res) => {
  try {
    const contactsToDelete = await Contact.find().sort({ date: 1 }).limit(-50);
    await Contact.deleteMany({
      _id: { $in: contactsToDelete.map((contact) => contact._id) },
    });
    res.status(200).json({ message: "Old messages deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
