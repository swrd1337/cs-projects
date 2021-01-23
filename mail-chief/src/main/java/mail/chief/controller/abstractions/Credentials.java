package mail.chief.controller.abstractions;

import mail.chief.model.credentials.MailCredentialsException;

/**
 * Credentials abstraction.
 */
public interface Credentials {
    String getUsername() throws MailCredentialsException;
    String getPassword() throws MailCredentialsException;
}
