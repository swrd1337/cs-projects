package mail.chief.view.comps;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.KeyCode;
import javafx.scene.layout.GridPane;
import javafx.stage.Modality;
import javafx.stage.Stage;
import javafx.stage.StageStyle;
import mail.chief.controller.LoadLocalUser;
import mail.chief.controller.MailAuthentication;
import mail.chief.controller.RequestMails;
import mail.chief.controller.SaveLocalUser;
import mail.chief.model.credentials.LocalUserCredentials;
import mail.chief.model.credentials.MailCredentials;
import mail.chief.model.credentials.MailCredentialsException;
import mail.chief.model.MailsListModel;
import mail.chief.view.App;
import mail.chief.view.LogInUtil;
import mail.chief.view.Titles;
import org.apache.log4j.Logger;

import java.util.*;

/**
 * Add new mail account button.
 */
public class AddMailButton {
    private static Logger logger = Logger.getLogger(AddMailButton.class.getName());

    // Local constants.
    private static final double PREF_HEIGHT = 30.0;
    private static final double PREF_WIDTH_B = 130.0;
    private static final int WIDTH = 350;
    private static final int HEIGHT = 250;

    // Default error message.
    private static String error_message = "Something went wrong.";

    // Add button.
    private static Button addButton;

    // Credentials.
    private static LocalUserCredentials localUserCredentials;
    private static ArrayList<MailCredentials> mailCredentialsList;

    /**
     * Not meant to be instantiated.
     */
    private AddMailButton() { }

    /**
     * Load user from JSON.
     */
    private static void loadUser() {
        LoadLocalUser loader = new LoadLocalUser();
        loader.load();

        localUserCredentials = loader.getUserCredentials();
        mailCredentialsList = loader.getMailCredentials();
    }

    /**
     * Save user to JSON.
     */
    public static void saveUser() {
        if (localUserCredentials == null) {
            return;
        }

        SaveLocalUser saver = new SaveLocalUser(localUserCredentials);
        saver.add(mailCredentialsList);
        saver.save();
    }

    /**
     * Add another mail credentials.
     * @param mailCredentials
     */
    private static void addMailCredential(MailCredentials mailCredentials) {
        boolean isEquals = false;
        for (MailCredentials mc : mailCredentialsList) {
            if (mc.equals(mailCredentials)) {
                isEquals = true;
                break;
            }
        }
        if (!isEquals) {
            mailCredentialsList.add(mailCredentials);
        }
    }

    /**
     * Get MailCredentials List.
     * @return ArrayList<MailCredentials>
     */
    public static ArrayList<MailCredentials> getMailCredentialsList() {
        return mailCredentialsList;
    }

    /**
     * Add MailCredentials to side bar as MenuButton.
     */
    private static void addToSideBar() {
        Collection<MailCredentials> list = Collections.synchronizedCollection(new ArrayList<>(mailCredentialsList));
        for (MailCredentials mc : list) {
            try {
                putButtonInSideBar(mc.getUsername(), mc.getPassword());
            } catch (MailCredentialsException e) {
                logger.debug(e);
            }
        }

    }

    /**
     * Initialize Add and Mails buttons.
     */
    public static void initMailButtons() {
        initAddMailButton();
        loadUser();
        LogInUtil.setButtonSize(addButton);
        MailSideBar.getInstance().putButtonInSideBar(addButton);
        addButton.setOnAction(event -> mailButtonOnAction());
        addToSideBar();
    }

    /**
     * Adding AddNewMail to sidebar.
     */
    private static void initAddMailButton() {
        Image addImg = new Image("icons/add.png");
        ImageView addView = new ImageView(addImg);
        addButton = new Button(Titles.ADD_NEW.toString(), addView);
    }

    /**
     * Add on action util.
     */
    private static void mailButtonOnAction() {
        Stage localStage = new Stage();
        localStage.setTitle(Titles.ADD_WND.toString());
        localStage.getIcons().add(new Image("icons/mail-icon.png"));
        localStage.initModality(Modality.WINDOW_MODAL);
        localStage.initOwner(App.getAppStage());
        localStage.setResizable(false);

        GridPane localGrid = new GridPane();
        Scene scene = new Scene(localGrid, WIDTH, HEIGHT);
        scene.getStylesheets().add("theme.css");

        TextField username = new TextField();
        PasswordField password = new PasswordField();
        onEnterPressed(localStage, localGrid, username, password);

        Button save = new Button(Titles.LOGIN.toString());
        Button close = new Button(Titles.CLOSE.toString());
        LogInUtil.setButtonSize(save, close);

        localGrid.setAlignment(Pos.CENTER);

        LogInUtil.addToRootGrid(localGrid, username, password, save, close, null);
        onCloseActionUtil(localStage, close);
        onSaveActionUtil(localStage, localGrid, username, password, save);

        localStage.setScene(scene);
        localStage.show();
    }

    /**
     * On Close action util.
     * @param localStage
     * @param close
     */
    private static void onCloseActionUtil(Stage localStage, Button close) {
        close.setOnAction(event -> localStage.close());
    }

    /**
     * On Enter button pressed.
     * @param localStage
     * @param grid
     * @param username
     * @param password
     */
    private static void onEnterPressed(Stage localStage, GridPane grid, TextField username, PasswordField password) {
        password.setOnKeyPressed(event -> {
            if (event.getCode() == KeyCode.ENTER) {
                saveAction(localStage, grid, username, password);
            }
        });
    }

    /**
     * On Save Action util.
     * @param localStage
     * @param grid
     * @param username
     * @param password
     * @param save
     */
    private static void onSaveActionUtil(Stage localStage, GridPane grid, TextField username, PasswordField password, Button save) {
        save.setOnAction(event -> {
            saveAction(localStage, grid, username, password);
        });
    }

    /**
     * Commong save action.
     * @param localStage
     * @param grid
     * @param username
     * @param password
     */
    private static void saveAction(Stage localStage, GridPane grid, TextField username, PasswordField password) {
        if (putButtonInSideBar(username.getText(), password.getText())) {
            displayErrorLabel(grid, error_message);
            return;
        }
        localStage.close();
    }

    /**
     * Put new MailCredentials in side bar.
     * @param username
     * @param password
     * @return
     */
    public static boolean putButtonInSideBar(String username, String password) {
        MailsListModel mailsListModel;

        MailCredentials mailCredentials = new MailCredentials(username, password);
        MailAuthentication mailAuth = new MailAuthentication(mailCredentials);
        RequestMails requestMails = new RequestMails(mailAuth);

        try {
            mailsListModel = requestMails.getPreparedMails();
        } catch (MailCredentialsException e) {
            error_message = e.getMessage();
            return true;
        }

        MenuButton button = new MailAccountButton(mailCredentials, mailsListModel).getAccountButton();
        button.setMinWidth(PREF_WIDTH_B);
        button.setPrefHeight(PREF_HEIGHT);
        MailSideBar.getInstance().putButtonInSideBar(button);

        addMailCredential(mailCredentials);
        return false;
    }

    /**
     * Adding error label to Log In.
     * @param grid
     * @param message
     */
    private static void displayErrorLabel(GridPane grid, String message) {
        Label errorLabel = new Label(Titles.INVALID.toString());
        errorLabel.setPrefWidth(PREF_WIDTH_B * 2);
        errorLabel.setStyle("-fx-font-size: 14px;-fx-text-fill: #f2242e");
        errorLabel.setPadding(new Insets(15));
        errorLabel.setTooltip(new Tooltip(message));
        errorLabel.setAlignment(Pos.CENTER);
        grid.add(errorLabel, 1, 2, 1, 1);
    }

}