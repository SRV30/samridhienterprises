const AboutUs = require("../models/aboutUs");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.getAboutUs = catchAsyncErrors(async (req, res) => {
  try {
    const aboutUs = await AboutUs.findOne();
    res.status(200).json(aboutUs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

exports.updateAboutUs = catchAsyncErrors(async (req, res) => {
  const { name, phone, whatsapp, photoLink, address, mapLink } = req.body;

  try {
    let aboutUs = await AboutUs.findOne();

    if (!aboutUs) {
      aboutUs = new AboutUs({
        name,
        phone,
        whatsapp,
        photoLink,
        address,
        mapLink,
      });
    } else {
      aboutUs.name = name;
      aboutUs.phone = phone;
      aboutUs.whatsapp = whatsapp;
      aboutUs.photoLink = photoLink;
      aboutUs.address = address;
      aboutUs.mapLink = mapLink;
    }

    await aboutUs.save();
    res
      .status(200)
      .json({ message: "About Us information updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
