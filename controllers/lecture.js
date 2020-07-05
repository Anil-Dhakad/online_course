const Lecture = require("../models/lecture");
var multer = require("multer");
const { errorHandler } = require("../helphers/dbErrorHandler");

exports.create = (req, res) => {
  var upload = multer({ dest: "front/public/course_videos" }).single("video");

  upload(req, res, (err) => {
    console.log("data: ", req.body);
    console.log("file: ", req.file);

    const { sectionId, title } = req.body;

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.json({ error: "Please select an video to upload" });
    } else if (err instanceof multer.MulterError) {
      return res.json({ error: err });
    } else if (err) {
      return res.json({ error: err });
    } else if (!sectionId || !title) {
      return res.json({ error: "all fields" });
    }

    let lecture = new Lecture();
    lecture._id = req.body._id;
    lecture.sectionId = req.body.sectionId;
    lecture.title = req.body.title;
    lecture.video = req.body.video;

    Lecture.find({ sectionId: sectionId, title: title })
      .collation({ locale: "en", strength: 2 })
      .exec((err, data) => {
        if (data.length === 0) {
          lecture.save((err, result) => {
            if (err) {
              return res.json({ error: errorHandler(err) });
            }
            return res.json({ msg: "created" });
          });
        } else {
          return res.json({ msg: "not" });
        }
      });
  });
};
