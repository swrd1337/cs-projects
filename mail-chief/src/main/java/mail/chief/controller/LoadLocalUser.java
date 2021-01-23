package mail.chief.controller;

import com.google.gson.Gson;
import mail.chief.controller.abstractions.Loader;
import mail.chief.model.credentials.LocalUserCredentials;
import mail.chief.model.credentials.MailCredentials;
import org.apache.log4j.Logger;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Map;
import java.util.Scanner;

/**
 * Load Local User from JSON.
 */
public class LoadLocalUser implements Loader {
    private static Logger logger = Logger.getLogger(LoadLocalUser.class.getName());

    // Where we store our users.
    private LocalUserCredentials localUserCredentials;
    private ArrayList<MailCredentials> mailCredentials;

    /**
     * LoadLocalUser Constructor.
     */
    public LoadLocalUser() {
        this.localUserCredentials = null;
        this.mailCredentials = new ArrayList<>();
    }

    /**
     * Load users.
     */
    @Override
    public void load() {
        File file = new File(Loader.FILE_NAME);
        String datas = "";

        try (Scanner scanner = new Scanner(file)) {
            while (scanner.hasNextLine()) {
                datas = datas.concat(scanner.nextLine());
            }
        } catch (FileNotFoundException e) {
            logger.debug(e);
            localUserCredentials = null;
            return;
        }

        extractObjectFromString(datas);
    }

    /**
     * Extract Credentials object.
     * @param datas
     */
    private void extractObjectFromString(String datas) {
        Gson gson = new Gson();
        ArrayList list =  gson.fromJson(datas, ArrayList.class);

        if (list == null) {
            localUserCredentials = null;
        } else if (list.get(0) instanceof Map) {
            setLocalUserCredentials((Map<String, String>) list.get(0));
            if (list.size() > 1) {
                list.remove(0);
                setMailCredentials(list);
            }
        }
    }

    /**
     * Set local user.
     * @param localUserMap
     */
    private void setLocalUserCredentials(Map<String, String> localUserMap) {
        String username = localUserMap.get("username");
        String password = localUserMap.get("password");
        localUserCredentials = new LocalUserCredentials(username, password);
    }

    /**
     * Set MailCredentials.
     * @param list
     */
    private void setMailCredentials(ArrayList list) {
        for (Object item : list) {
            if (list.get(0) instanceof Map) {
                Map<String, String> credentials = (Map<String, String>) item;
                String username = credentials.get("username");
                String password = credentials.get("password");
                mailCredentials.add(new MailCredentials(username, password));
            }
        }
    }

    /**
     * Get MailCredentials.
     * @return
     */
    @Override
    public ArrayList<MailCredentials> getMailCredentials() {
        return mailCredentials;
    }

    /**
     * Get LocalUserCredentials.
     * @return
     */
    @Override
    public LocalUserCredentials getUserCredentials() {
        return localUserCredentials;
    }
}
