package mail.chief.view;

import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import mail.chief.controller.SaveLocalUser;
import mail.chief.model.credentials.LocalUserCredentials;

/**
 * Root Sign In Scene.
 */
public class SignInScene {
    // Local constants.
    private static final int SPACING = 5;

    // Local fields.
    private static PasswordField confirm;
    private static PasswordField password;
    private static TextField username;

    /**
     * Create our sign in scene.
     * @param localGrid
     * @param defaultScene
     * @param defaultStage
     * @param imgUrl
     */
    public static void createSignInScene(GridPane localGrid, Scene defaultScene, Stage defaultStage, String imgUrl) {
        username = new TextField();
        password = new PasswordField();
        confirm = new PasswordField();

        VBox inputs = getVerticalBox();

        Button save = new Button(Titles.SAVE.toString());
        Button close = new Button(Titles.CLOSE.toString());

        onSaveAction(defaultScene, defaultStage, save);
        onCloseAction(defaultScene, defaultStage, close);

        LogInUtil.setButtonSize(save, close);

        addButtons(inputs, save, close);

        HBox baseline = getBaseline(imgUrl, inputs);

        localGrid.setAlignment(Pos.CENTER);
        localGrid.add(baseline, 1, 1, 1, 1);
    }

    /**
     * Return baseline.
     * @param imgUrl
     * @param inputs
     * @return
     */
    private static HBox getBaseline(String imgUrl, VBox inputs) {
        return getHorizontalBox(imgUrl, inputs);
    }

    /**
     * Creating baseline with components.
     * @param imgUrl
     * @param inputs
     * @return
     */
    private static HBox getHorizontalBox(String imgUrl, VBox inputs) {
        HBox baseline = new HBox(SPACING * 3);
        LogInUtil.setMailImage(imgUrl, baseline);
        baseline.getChildren().add(inputs);
        baseline.setAlignment(Pos.CENTER);
        return baseline;
    }

    /**
     * Put buttons in VBox.
     * @param inputs
     * @param save
     * @param close
     */
    private static void addButtons(VBox inputs, Button save, Button close) {
        HBox buttons = new HBox(SPACING);
        buttons.getChildren().add(save);
        buttons.getChildren().add(close);
        inputs.getChildren().add(buttons);
    }

    /**
     * Return VBox.
     * @return
     */
    private static VBox getVerticalBox() {
        VBox inputs = new VBox(SPACING);
        inputs.getChildren().add(new Label(Titles.USERNAME.toString()));
        inputs.getChildren().add(username);
        inputs.getChildren().add(new Label(Titles.PASSWORD.toString()));
        inputs.getChildren().add(password);
        inputs.getChildren().add(new Label(Titles.CONFIRM.toString()));
        inputs.getChildren().add(confirm);
        return inputs;
    }

    /**
     * On close action util.
     * @param defaultScene
     * @param defaultStage
     * @param close
     */
    private static void onCloseAction(Scene defaultScene, Stage defaultStage, Button close) {
        close.setOnAction(event -> {
            defaultStage.setScene(defaultScene);
        });
    }

    /**
     * On save action util.
     * @param defaultScene
     * @param defaultStage
     * @param save
     */
    private static void onSaveAction(Scene defaultScene, Stage defaultStage, Button save) {
        save.setOnAction(event -> {
            String user = username.getText();
            String pass = password.getText();
            String conf = confirm.getText();

            if (!pass.equals(conf)) {
                NewMailWindow.createErrorWindow(Titles.INVALID.toString());
                return;
            }
            LocalUserCredentials luc = new LocalUserCredentials(user, pass);
            SaveLocalUser saver = new SaveLocalUser(luc);
            saver.save();
            defaultStage.setScene(defaultScene);
        });
    }


}
