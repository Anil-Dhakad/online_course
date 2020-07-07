const Section = require("../models/section");

exports.create = (req, res) => {
  let section = new Section(req.body);

  Section.find({
    courseId: section.courseId,
    sectionNo: section.sectionNo,
    name: section.name,
  })
    .collation({ locale: "en", strength: 2 })
    .exec((err, data) => {
      if (data.length === 0) {
        section.save((err, result) => {
          if (err) {
            return res.status(400).json({ error: errorHandler(err) });
          }
          return res.json({ res: result });
        });
      } else {
        return res.json({ error: "not" });
      }
    });
};

exports.list = (req, res) => {
  id = req.params.courseId;
  Section.find({ courseId: id })
    .populate("courseId", "_id name")
    .sort({ sectionNo: 1 })
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      return res.json(result);
    });
};

exports.update = (req, res) => {
  const data = req.body;
  console.log("data-section: ", data);

  Section.findOneAndUpdate(
    { _id: data._id },
    { sectionNo: data.sectionNo, name: data.name },
    { new: true, useFindAndModify: false },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      return res.json(result);
    }
  );
};
