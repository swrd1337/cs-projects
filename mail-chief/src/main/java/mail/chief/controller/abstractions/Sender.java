package mail.chief.controller.abstractions;

import mail.chief.model.credentials.MailCredentialsException;

/**
 * Sender abstraction.
 */
public interface Sender {
    void send(Credentials credentials) throws MailCredentialsException;
}
