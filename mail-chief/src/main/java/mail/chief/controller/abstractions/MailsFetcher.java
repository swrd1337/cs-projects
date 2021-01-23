package mail.chief.controller.abstractions;

import mail.chief.model.credentials.MailCredentialsException;

/**
 * Fetch abstraction.
 * @param <T>
 */
public interface MailsFetcher<T> {
    T getPreparedMails() throws MailCredentialsException;
}
