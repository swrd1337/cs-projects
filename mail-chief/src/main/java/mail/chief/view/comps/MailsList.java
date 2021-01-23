package mail.chief.view.comps;

import javafx.scene.control.ListView;
import mail.chief.model.MailModel;
import mail.chief.view.App;

import java.util.HashMap;
import java.util.Map;


/**
 * MailsList with mail's content.
 */
public class MailsList {
    // Local constants.
    private static final String PERFECT_SPACING = "   ";
    private static final double MIN_WIDTH = 300.0;

    /**
     * ListView with mail's content.
     */
    private ListView listView;

    /**
     * MailsList instance.
     */
    private static MailsList mailsList = new MailsList();

    // Mail's content.
    private Map<String, MailModel> mailsMap;
    private Map<String, String> content;

    /**
     * MailsList Constructor.
     */
    private MailsList() {
        listView = new ListView();
        content = new HashMap<>();
        listView.setMinWidth(MIN_WIDTH);
        listView.prefHeightProperty().bind(App.getAppStage().heightProperty());
        onActionUtil();
    }

    /**
     * On item click action.
     */
    private void onActionUtil() {
        listView.setOnMouseClicked(event -> {
            String item = listView.getSelectionModel().getSelectedItems().toString();
            String id = item.substring(1, 2);
            MailModel localModel = mailsMap.get(id);
            MailView.getInstance().setMailContent(content.get(id.concat(localModel.getSubject())));
        });
    }

    /**
     * Return MailsList instance.
     * @return
     */
    public static MailsList getInstance() {
        return mailsList;
    }

    /**
     * Set content of MailListModel.
     * @param mailsMap
     * @param content
     */
    public void setMailsModel(Map<String, MailModel> mailsMap, Map<String, String> content) {
        if (!mailsMap.isEmpty()) {
            this.mailsMap = mailsMap;
            this.content = content;
            addMailsToList();
        }
    }

    /**
     * Mail to ListView.
     */
    private void addMailsToList() {
        for (Map.Entry<String, MailModel> entry : mailsMap.entrySet()) {
           String key = entry.getKey();
           String item = key.concat(PERFECT_SPACING).concat(entry.getValue().getSubject());
           listView.getItems().add(item);
        }
    }

    /**
     * Return ListView.
     * @return
     */
    public ListView getListView() {
        return listView;
    }
}
