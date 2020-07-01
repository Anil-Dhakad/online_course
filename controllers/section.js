const Section = require("../models/section");

exports.create = (req, res) => {
  let section = new Section(req.body);

  section
    .find({
      courseId: section.course,
      sectionNo: section.sectionNo,
      name: section.name,
    })
    .collation({ locale: "en", strength: 2 })
    .exec((err, data) => {
      if (data.length === 0) {
        skill.save((err, result) => {
          if (err) {
            return res.status(400).json({ error: errorHandler(err) });
          }
          return res.json(result);
        });
      } else {
        return res.json({ error: "not" });
      }
    });
};
