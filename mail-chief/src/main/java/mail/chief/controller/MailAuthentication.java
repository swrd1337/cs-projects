package mail.chief.controller;

import mail.chief.model.credentials.MailCredentials;
import mail.chief.model.credentials.MailCredentialsException;
import mail.chief.controller.abstractions.MailAuth;

import javax.mail.*;
import java.util.Properties;

/**
 * Mail-account Authentication Controller.
 */
public class MailAuthentication implements MailAuth {
    // Local constants.
    private static final String STORE_PROTOCOL = "mail.store.protocol";
    private static final String IMAPS = "imaps";
    private static final String IMAPS_HOST = "mail.imaps.host";
    private static final String GMAIL_COM = "imap.gmail.com";
    private static final String IMAPS_PORT = "mail.imaps.port";
    private static final String VALUE = "993";

    // MailCredentials Model.
    private MailCredentials local;

    /**
     * MailAuthentication Constructor.
     * @param mailCredentials
     */
    public MailAuthentication(MailCredentials mailCredentials) {
        this.local = mailCredentials;
    }

    /**
     * Get prepared properties.
     * @return
     */
    private Properties prepareProperties() {
        Properties properties = new Properties();

        properties.put(STORE_PROTOCOL, IMAPS);
        properties.put(IMAPS_HOST, GMAIL_COM);
        properties.put(IMAPS_PORT, VALUE);

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
        String log = local.getUsername();
        String pass = local.getPassword();

        Properties properties = prepareProperties();
        Session session;

        try{
            session = Session.getInstance(properties,
                    new javax.mail.Authenticator() {
                        @Override
                        protected PasswordAuthentication getPasswordAuthentication() {
                            return new PasswordAuthentication(log, pass);
                        }
                    });
        } catch (Exception e) {
            throw new MailCredentialsException("Invalid username or password.");
        }

        return session;
    }
}
