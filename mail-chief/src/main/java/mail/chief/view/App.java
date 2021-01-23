package mail.chief.view;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.input.KeyCode;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import mail.chief.controller.LoadLocalUser;
import mail.chief.model.credentials.LocalUserCredentials;
import mail.chief.view.comps.*;


/**
 * Starting point for Mail Chief app.
 */
public class App extends Application {
    // Local constants.
    private static final int SPACING = 5;
    private static final int SPACING_B = 10;
    private static final int WIDTH = 1280;
    private static final int HEIGHT = 720;
    private static final int MIN_HEIGHT = 400;
    private static final int MIN_WIDTH = 650;

    // Root stage.
    private static Stage appStage = null;

    private synchronized void setAppStage(Stage currentStage) {
        appStage = currentStage;
    }

    /**
     * Get our root stage.
     * @return Stage
     */
    public static synchronized Stage getAppStage() {
        if (appStage == null) {
            throw new NullPointerException();
        }
        return appStage;
    }

    /**
     * main method for our application.
     * @param primaryStage
     */
    public void start(Stage primaryStage) {
        setAppStage(primaryStage);
        primaryStage.setTitle(Titles.APP_TITLE.toString());
        primaryStage.getIcons().add(new Image("icons/mail-icon.png"));

        logScene(primaryStage);
        onAppClose(primaryStage);

        primaryStage.setMinWidth(MIN_WIDTH);
        primaryStage.setMinHeight(MIN_HEIGHT);
        primaryStage.show();
    }

    /**
     * On application close event.
     * Save local user with data.
     * @param primaryStage
     */
    private void onAppClose(Stage primaryStage) {
        primaryStage.setOnCloseRequest(event -> {
            AddMailButton.saveUser();
        });
    }

    /**
     * Set Main scene: Log In, Sign In, Root scenes.
     * @param stage
     */
    private static void setMainScene(Stage stage) {
        VBox gridBox = getVerticalBox();
        RootGrid grid = new RootGrid();
        grid.addElement(gridBox, 1, 1);

        Scene scene = new Scene(grid.getGridPane(), WIDTH, HEIGHT);
        scene.getStylesheets().add("theme.css");
        stage.setScene(scene);
    }

    /**
     * Return VBox with root components.
     * @return
     */
    private static VBox getVerticalBox() {
        AddMailButton.initMailButtons();

        MailsList list = MailsList.getInstance();
        MenuBar menuBar = MailMenuBar.getInstance().getMenuBar();
        TextArea mailView = MailView.getInstance().getTextArea();

        HBox contentView = new HBox(SPACING);
        contentView.getChildren().add(MailSideBar.getInstance().getSideBar());
        contentView.getChildren().add(list.getListView());
        contentView.getChildren().add(mailView);

        VBox gridBox = new VBox(SPACING_B);
        gridBox.getChildren().add(menuBar);
        gridBox.getChildren().add(contentView);
        return gridBox;
    }

    /**
     * Local user log scene.
     * @param stage
     */
    private static void logScene(Stage stage) {
        GridPane localGrid = new GridPane();
        Scene scene = new Scene(localGrid, WIDTH, HEIGHT);
        scene.getStylesheets().add("theme.css");

        TextField username = new TextField();
        PasswordField password = new PasswordField();

        onEnterPressed(stage, username, password);

        Button save = new Button(Titles.LOGIN.toString());
        Button signIn = new Button(Titles.SIGN_IN.toString());

        localGrid.setAlignment(Pos.CENTER);

        LogInUtil.addToRootGrid(localGrid, username, password, save, signIn, "icons/mail.png");
        onSignInActionUtil(stage, signIn);
        onSaveActionUtil(stage, username, password, save);
        stage.setScene(scene);
    }

    /**
     * Set Sign In Scene.
     * @param localStage
     * @param signIn
     */
    private static void onSignInActionUtil(Stage localStage, Button signIn) {
        signIn.setOnAction(event -> {
            GridPane localGrid = new GridPane();
            Scene scene = new Scene(localGrid, WIDTH, HEIGHT);
            scene.getStylesheets().add("theme.css");
            SignInScene.createSignInScene(localGrid, localStage.getScene(), localStage, "icons/mail.png");
            localStage.setScene(scene);
        });
    }

    /**
     * On Enter press. Log In.
     * @param localStage
     * @param username
     * @param password
     */
    private static void onEnterPressed(Stage localStage, TextField username, PasswordField password) {
        password.setOnKeyPressed(event -> {
            if (event.getCode() == KeyCode.ENTER) {
                saveAction(localStage, username, password);
            }
        });
    }

    /**
     * On Save button action.
     * @param localStage
     * @param username
     * @param password
     * @param save
     */
    private static void onSaveActionUtil(Stage localStage, TextField username, PasswordField password, Button save) {
        save.setOnAction(event -> {
            saveAction(localStage, username, password);
        });
    }

    /**
     * Common save action.
     * @param localStage
     * @param username
     * @param password
     */
    private static void saveAction(Stage localStage, TextField username, PasswordField password) {
        LoadLocalUser loader = new LoadLocalUser();
        loader.load();

        LocalUserCredentials local = loader.getUserCredentials();

        if (local == null) {
            LogInUtil.addInvalidCredentialsLabel(Titles.REG_MESSAGE.toString());
            return;
        }

        LocalUserCredentials luc = new LocalUserCredentials(username.getText(), password.getText());
        if (local.check(luc)) {
            setMainScene(localStage);
        } else {
            LogInUtil.addInvalidCredentialsLabel(Titles.INVALID.toString());
        }
    }
}