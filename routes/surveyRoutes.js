const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const requireCredits = require("../middleware/requireCredits");
const Mailer = require("../services/Mailer");
const SurveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    try {
      const surveys = await Survey.find({ _user: req.user.id }).select({
        recipients: false,
      });
      res.send(surveys);
    } catch (err) {
      console.log(err);
    }
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    //create a new survey (title, subject, body, receipients (comma seperate list of email addresses to send survey to))
    res.send("Thanks for voting!");
  });

  //return a list of surveys created by the current_user
  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice"); //:surveyId   //:choice
    _.chain(req.body)
      .map(({ url, email }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice,
          };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: {
                email: email,
                responded: false,
              },
            },
          },
          {
            $inc: {
              [choice]: 1,
            },
            $set: {
              "recipients.$.responded": true,
            },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
  });
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    try {
      const { title, subject, body, recipients } = req.body;
      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(",").map((email) => ({
          email: email.trim(),
        })),
        _user: req.user.id,
        dateSent: Date.now(),
      });
      //property idea for future, custom url that survey creator gives to thank urser
      //great place to send an email, right after u create ur first survey

      const mailer = new Mailer(survey, SurveyTemplate(survey));
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user); //to show client heres the new value of credits ;
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
