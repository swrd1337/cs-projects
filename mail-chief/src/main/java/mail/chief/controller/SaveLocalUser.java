package mail.chief.controller;

import com.google.gson.Gson;
import mail.chief.controller.abstractions.Credentials;
import mail.chief.controller.abstractions.Loader;
import mail.chief.controller.abstractions.Saver;
import mail.chief.model.credentials.LocalUserCredentials;
import mail.chief.model.credentials.MailCredentials;
import org.apache.log4j.Logger;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Local user saver.
 */
public class SaveLocalUser implements Saver {
    private static Logger logger = Logger.getLogger(SaveLocalUser.class.getName());

    // Credentials list to save.
    private ArrayList<Credentials> credentialsList;

    /**
     * SaveLocalUser Constructor.
     * @param localUserCredentials
     */
    public SaveLocalUser(LocalUserCredentials localUserCredentials) {
        this.credentialsList = new ArrayList<>();
        credentialsList.add(localUserCredentials);
    }

    /**
     * Add mails to credentials list.
     * @param mailCredentials
     */
    public void add(List<MailCredentials> mailCredentials) {
        credentialsList.addAll(mailCredentials);
    }

    /**
     * Save Credentials to JSON file.
     */
    @Override
    public void save() {
        Gson gson = new Gson();
        String json = gson.toJson(credentialsList);

        try(BufferedWriter writer = new BufferedWriter(new FileWriter(Loader.FILE_NAME))) {
            writer.write(json);
        } catch (IOException e) {
            logger.debug(e);
        }
    }
}
