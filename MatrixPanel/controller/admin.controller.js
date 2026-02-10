const Admin = require("../model/admin.model");
const fs = require("fs");
const path = require("path");
exports.viewAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.render("admin/viewAdmin", { admins });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};
exports.addAdminPage = (req, res) => {
  try {
    res.render("admin/addAdmin");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};
exports.addAdmin = async (req, res) => {
  try {
    let imagePath = "";

    if (req.file) {
      imagePath = `uploads/${req.file.filename}`;
    }

    await Admin.create({
      ...req.body,
      profileImage: imagePath
    });

    res.redirect("/admin/viewAdmin");
  } catch (error) {
    console.log(error);
    res.redirect("admin/addAdmin");
  }
};
exports.deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.redirect("/admin/viewAdmin");
    }

    if (admin.profileImage) {
      const imageFullPath = path.join(
        __dirname,
        "../public",
        admin.profileImage
      );

      if (fs.existsSync(imageFullPath)) {
        fs.unlinkSync(imageFullPath);
      }
    }

    await Admin.findByIdAndDelete(adminId);
    res.redirect("/admin/viewAdmin");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/viewAdmin");
  }
};
exports.editAdminPage = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    res.render("admin/editAdmin", { admin });
  } catch (error) {
    console.log(error);
    res.redirect("/admin/viewAdmin");
  }
};
exports.updateAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await Admin.findById(adminId);

    let updatedData = { ...req.body };
    delete updatedData.profileImage;

    if (req.file) {
      if (admin.profileImage) {
        const oldImagePath = path.join(
          __dirname,
          "../public",
          admin.profileImage
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      updatedData.profileImage = `uploads/${req.file.filename}`;
    }
    await Admin.findByIdAndUpdate(adminId, updatedData);
    res.redirect("/admin/viewAdmin");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/viewAdmin");
  }
};
