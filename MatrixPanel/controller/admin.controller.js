const Admin = require("../model/admin.model");
const fs = require("fs");
const path = require("path");

/* ===============================
   View All Admins
================================ */
exports.viewAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.render("admin/viewAdmin", { admins });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

/* ===============================
   Add Admin Page
================================ */
exports.addAdminPage = (req, res) => {
  try {
    res.render("admin/addAdmin");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

/* ===============================
   Add Admin (POST)
================================ */
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
    res.redirect("/admin/addAdmin");
  }
};

/* ===============================
   Delete Admin
================================ */
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
        "../../public",
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

/* ===============================
   Edit Admin Page
================================ */
exports.editAdminPage = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    res.render("admin/edit-admin", { admin });
  } catch (error) {
    console.log(error);
    res.redirect("/admin/viewAdmin");
  }
};

/* ===============================
   Update Admin
================================ */
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
          "../../public",
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
