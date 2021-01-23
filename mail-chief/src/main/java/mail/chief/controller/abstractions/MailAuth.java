package mail.chief.controller.abstractions;

import mail.chief.model.credentials.MailCredentialsException;

import javax.mail.Session;

/**
 * Authentication abstraction.
 */
public interface MailAuth {
    Session login() throws MailCredentialsException;
}
