package mail.chief.view;

/**
 * Our display text enum.
 */
public enum Titles {
    APP_TITLE("Mail Chief"),

    ADD_NEW("Add new..."),

    APP("Application"),

    ADD_WND("Enter mail credentials"),

    LOGIN("Log In"),

    CLOSE("Close"),

    USERNAME("Username:"),

    PASSWORD("Password:"),

    NEW_MAIL("New mail"),

    INBOX("Inbox"),

    EXIT("Exit"),

    ABOUT("About us"),

    DESTINATION("Destination:"),

    SUBJECT("Subject:"),

    MESSAGE("Message:"),

    HELP("Help"),

    REG_MESSAGE("I think, you need local account."),

    INVALID("Invalid username or password."),

    SIGN_IN("Sign in"),

    REMOVE("Remove"),

    SAVE("Save"),

    CONFIRM("Confirm password:"),

    REFRESH("Refresh");

    private String value;

    Titles(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }
}
