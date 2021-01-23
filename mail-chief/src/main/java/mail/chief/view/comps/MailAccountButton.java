package mail.chief.view.comps;

import javafx.scene.control.MenuButton;
import javafx.scene.control.MenuItem;
import javafx.scene.control.Tooltip;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.VBox;
import mail.chief.controller.MailAuthentication;
import mail.chief.controller.RequestMails;
import mail.chief.model.MailModel;
import mail.chief.model.MailsListModel;
import mail.chief.model.credentials.MailCredentials;
import mail.chief.model.credentials.MailCredentialsException;
import mail.chief.view.NewMailWindow;
import mail.chief.view.Titles;

import java.util.*;

/**
 * Mail Credentials MenuButton.
 */
public class MailAccountButton {
    // MailCredentials MenuButton.
    private MenuButton accountButton;

    // Cache mail content.
    private Map<String, String> content;

    // Local mail credentials.
    private MailCredentials localMailCreds;

    /**
     * Mail MenuButton Constructor.
     * @param credentials
     * @param mailsList
     */
    public MailAccountButton(MailCredentials credentials, MailsListModel mailsList) {
        this.localMailCreds = credentials;
        MenuItem showMails = getMenuItem("icons/inbox.png", Titles.INBOX);
        MenuItem refresh = getMenuItem("icons/refresh.png", Titles.REFRESH);
        MenuItem newMail = getMenuItem("icons/new-mail.png", Titles.NEW_MAIL);
        MenuItem remove = getMenuItem("icons/exit.png", Titles.REMOVE);

        try {
            Image userImg = new Image("icons/mail-user.png");
            ImageView userView = new ImageView(userImg);
            this.accountButton = new MenuButton(localMailCreds.getUsername(),
                    userView, showMails, refresh, newMail, remove);
            accountButton.setTooltip(new Tooltip(localMailCreds.getUsername()));
        } catch (MailCredentialsException e) {
            e.printStackTrace();
        }

        setContent(mailsList);

        setShowMailsAction(mailsList, showMails);
        setRefreshAction(refresh);
        setNewMailAction(newMail);
        setRemoveAction(remove);
    }

    /**
     * Cache content util.
     * @param mailsList
     */
    private void setContent(MailsListModel mailsList) {
        this.content = new HashMap<>();

        for (Map.Entry<String, MailModel> entry : mailsList.getMailList().entrySet()) {
            content.put(entry.getKey().concat(entry.getValue().getSubject()), entry.getValue().getContent());
        }
    }

    /**
     * Setting Remove action.
     * @param remove
     */
    private void setRemoveAction(MenuItem remove) {
        remove.setOnAction(event -> {
            VBox sideBar = MailSideBar.getInstance().getSideBar();
            sideBar.getChildren().remove(accountButton);
            ArrayList<MailCredentials> mails = AddMailButton.getMailCredentialsList();
            Collection<MailCredentials> list = Collections.synchronizedCollection(new ArrayList<>(mails));
            for (MailCredentials mc : list) {
                if (mc.equals(localMailCreds)) {
                    mails.remove(mc);
                }
            }
        });
    }

    /**
     * Setting Refresh action.
     * @param refresh
     */
    private void setRefreshAction(MenuItem refresh) {
        refresh.setOnAction(event -> {
            MailsListModel mailsListModel;
            MailAuthentication mailAuth = new MailAuthentication(localMailCreds);
            RequestMails requestMails = new RequestMails(mailAuth);

            try {
                mailsListModel = requestMails.getPreparedMails();
                setContent(mailsListModel);
                MailsList instance = MailsList.getInstance();
                instance.getListView().getItems().remove(0, instance.getListView().getItems().size());
                instance.setMailsModel(mailsListModel.getMailList(), content);
            } catch (MailCredentialsException e) {
                e.printStackTrace();
            }
        });

    }

    /**
     * Util for creating MenuItem.
     * @param url
     * @param title
     * @return
     */
    private MenuItem getMenuItem(String url, Titles title) {
        Image newImg = new Image(url);
        ImageView newView = new ImageView(newImg);
        return new MenuItem(title.toString(), newView);
    }

    /**
     * Setting NewMail action.
     * @param newMail
     */
    private void setNewMailAction(MenuItem newMail) {
        newMail.setOnAction(event -> {
            NewMailWindow.createNewMailWindow(localMailCreds);
        });
    }

    /**
     * Show Inbox mails.
     * @param mailsList
     * @param menuItem
     */
    private void setShowMailsAction(MailsListModel mailsList, MenuItem menuItem) {
        menuItem.setOnAction(event -> {
            MailsList instance = MailsList.getInstance();
            instance.getListView().getItems().remove(0, instance.getListView().getItems().size());
            instance.setMailsModel(mailsList.getMailList(), content);
        });
    }

    /**
     * Return local MenuButton.
     * @return MenuButton
     */
    public MenuButton getAccountButton() {
        return accountButton;
    }
}
