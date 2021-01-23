package mail.chief.model.credentials;

import mail.chief.controller.abstractions.Credentials;

/**
 * Mail Credentials.
 */
public class MailCredentials implements Credentials {
    // Credentials.
    private String username;
    private String password;

    /**
     * MailCredentials constructor.
     * @param username
     * @param password
     */
    public MailCredentials(String username, String password) {
        this.username = username;
        this.password = password;
    }

    /**
     * Return password.
     * @return
     * @throws MailCredentialsException
     */
    @Override
    public String getPassword() throws MailCredentialsException {
        if (password.isEmpty()) {
            throw new MailCredentialsException("Invalid Password.");
        }
        return password;
    }

    /**
     * Return Username.
     * @return
     * @throws MailCredentialsException
     */
    @Override
    public String getUsername() throws MailCredentialsException {
        if (username.isEmpty()) {
            throw new MailCredentialsException("Invalid Username.");
        }
        return username;
    }

    /**
     * Check if equals.
     * @param mailCredentials
     * @return
     */
    public boolean equals(MailCredentials mailCredentials) {
        return mailCredentials.username.equals(this.username)
                && mailCredentials.password.equals(this.password);
    }
}
