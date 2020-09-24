const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  ///helper.Mail takes props and spits out a a MAil class, u want to extend it with custom config
  constructor({ subject, recipients }, content) {
    super();
    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('chandi.ajit@gmail.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email); //converts emails to sendgri format
    });
  }
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);
    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    try {
      const request = this.sgApi.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: this.toJSON(),
      });
      const response = await this.sgApi.API(request);
      return response;
    } catch (err) {
      console.log(err.stack);
    }
  }
}

module.exports = Mailer;
