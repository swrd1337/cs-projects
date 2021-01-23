package mail.chief.controller.abstractions;

import mail.chief.model.credentials.LocalUserCredentials;
import mail.chief.model.credentials.MailCredentials;

import java.util.List;

/**
 * Loader abstraction.
 */
public interface Loader {
    /**
     * Default file name.
     */
    String FILE_NAME = "local_credentials.json";

    void load();
    List<MailCredentials> getMailCredentials();
    LocalUserCredentials getUserCredentials();
}
