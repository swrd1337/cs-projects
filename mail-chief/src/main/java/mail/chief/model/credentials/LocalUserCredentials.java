package mail.chief.model.credentials;

import mail.chief.controller.abstractions.Credentials;

/**
 * Local user credentials.
 */
public class LocalUserCredentials implements Credentials {
    // Credentials.
    private String username;
    private String password;

    /**
     * LocalUserCredentials Constructor.
     * @param username
     * @param password
     */
    public LocalUserCredentials(String username, String password){
        this.username = username;
        this.password = password;
    }

    /**
     * Return Username.
     * @return
     */
    @Override
    public String getUsername() {
        return username;
    }

    /**
     * Return Password.
     * @return
     */
    @Override
    public String getPassword() {
        return password;
    }

    /**
     * Check username and password if equals.
     * @param credentials
     * @return
     */
    public boolean check(LocalUserCredentials credentials){
        String user = credentials.getUsername();
        String pass = credentials.getPassword();

        return username.equals(user) && password.equals(pass);
    }
}
