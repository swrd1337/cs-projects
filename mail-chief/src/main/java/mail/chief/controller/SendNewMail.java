package mail.chief.controller;

import mail.chief.controller.abstractions.Credentials;
import mail.chief.controller.abstractions.Sender;
import mail.chief.model.MailModel;
import mail.chief.model.credentials.MailCredentials;
import mail.chief.model.credentials.MailCredentialsException;
import org.apache.log4j.Logger;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/**
 * New Mail sender.
 */
public class SendNewMail implements Sender {
    private static Logger logger = Logger.getLogger(SendNewMail.class.getName());

    // Local MailModel instance.
    private MailModel mailModel;

    /**
     * SendNewMail Constructor.
     * @param subject
     * @param destination
     * @param message
     */
    public SendNewMail(String subject, String destination, String message) {
        this.mailModel = new MailModel(subject, destination, message);
    }

    /**
     * Send new mail from current MailCredential.
     * @param credentials
     * @throws MailCredentialsException
     */
    @Override
    public void send(Credentials credentials) throws MailCredentialsException {
        RelayAuth mailAuth = new RelayAuth((MailCredentials) credentials);
        try {
            Message mess = generateMessage(new MimeMessage(mailAuth.login()), (MailCredentials) credentials);
            Transport.send(mess);
        } catch (MailCredentialsException | MessagingException e) {
            logger.debug(e);
            System.out.println(e.getMessage());
            throw new MailCredentialsException("Cannot send mail.");
        }
    }

    /**
     * Create Message from
     * subject, destination, message Strings.
     * @param mess
     * @param mailCredentials
     * @return
     * @throws MailCredentialsException
     */
    private Message generateMessage(Message mess, MailCredentials mailCredentials) throws MailCredentialsException {
        try {
            mess.setFrom(new InternetAddress(mailCredentials.getUsername()));
            mess.setRecipient(Message.RecipientType.TO, new InternetAddress(mailModel.getSender()));
            mess.setSubject(mailModel.getSubject());
            mess.setText(mailModel.getMessage());
        } catch (MessagingException e) {
            logger.debug(e);
            System.out.println(e.getMessage());
        }
        return mess;
    }
}
