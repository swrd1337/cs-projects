package mail.chief.model;

import java.util.HashMap;
import java.util.Map;

/**
 * All mails map model.
 */
public class MailsListModel {
    // Where we store all mails.
    private HashMap<String, MailModel> mailList;

    /**
     * MailsListModel Constructor.
     */
    public MailsListModel() {
        this.mailList = new HashMap<>();
    }

    /**
     * Add new mail to HashMap.
     * @param id
     * @param mailModel
     */
    public void addMailModel(String id, MailModel mailModel) {
        mailList.put(id, mailModel);
    }

    /**
     * Return Mails HashMap.
     * @return
     */
    public Map<String, MailModel> getMailList() {
        return mailList;
    }
}
