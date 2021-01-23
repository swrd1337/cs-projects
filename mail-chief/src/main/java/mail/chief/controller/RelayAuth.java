package mail.chief.controller;


import mail.chief.controller.abstractions.MailAuth;
import mail.chief.model.credentials.MailCredentials;
import mail.chief.model.credentials.MailCredentialsException;

import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import java.util.Properties;

/**
 * Relay Mail-account Authentication.
 */
public class RelayAuth implements MailAuth {
    // Local constants.
    private static final String SMTP_AUTH = "mail.smtp.auth";
    private static final String STARTTLS_ENABLE = "mail.smtp.starttls.enable";
    private static final String SMTP_HOST = "mail.smtp.host";
    private static final String HOST = "smtp.gmail.com";
    private static final String SMTP_PORT = "mail.smtp.port";
    private static final String PORT = "587";

    // MailCredentials Model.
    private MailCredentials mailCredentials;

    /**
     * RelayAuth Constructor.
     * @param mailCredentials
     */
    public RelayAuth(MailCredentials mailCredentials) {
        this.mailCredentials = mailCredentials;
    }

    /**
     * Get prepared properties.
     * @return
     */
    private Properties prepareProperties(){
        Properties properties = new Properties();
        properties.put(SMTP_AUTH, "true");
        properties.put(STARTTLS_ENABLE, "true");
        properties.put(SMTP_HOST, HOST);
        properties.put(SMTP_PORT, PORT);

        return properties;
    }

    /**
     * Override login.
     * Login on Mail Account.
     * Return Session.
     * @return
     * @throws MailCredentialsException
     */
    @Override
    public Session login() throws MailCredentialsException {
        Properties properties = prepareProperties();

        String username = mailCredentials.getUsername();
        String password = mailCredentials.getPassword();

        return Session.getInstance(properties,
                new javax.mail.Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });
    }

}
