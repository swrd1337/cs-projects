package mail.chief.view;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;

/**
 * Log page utils.
 */
public class LogInUtil {
    // Local constants.
    private static final double PREF_HEIGHT = 30.0;
    private static final double PREF_WIDTH = 150.0;
    private static final double PREF_WIDTH_B = 120.0;
    private static final int SPACING = 5;

    // Input fields VBox.
    private static VBox inputs;

    /**
     * Set invalid credentials message.
     * @param message
     */
    public static void addInvalidCredentialsLabel(String message) {
        Label label = new Label(message);
        label.setStyle("-fx-font-size: 14px;-fx-text-fill: #f2242e");
        label.setPadding(new Insets(0, 0, 0, 25));
        inputs.getChildren().add(label);
    }

    /**
     * Add components to root grid.
     * @param localGrid
     * @param userName
     * @param password
     * @param save
     * @param close
     * @param imageUrl
     */
    public static void addToRootGrid(GridPane localGrid, TextField userName, PasswordField password,
                                     Button save, Button close, String imageUrl) {
        userName.setPrefHeight(PREF_HEIGHT);
        userName.setPrefWidth(PREF_WIDTH);

        password.setPrefHeight(PREF_HEIGHT);
        password.setPrefWidth(PREF_WIDTH);

        setButtonSize(save, close);
        createInputs(userName, password);
        createButtons(save, close);

        HBox baseline = getHorizontalBox(imageUrl);
        localGrid.add(baseline, 1,1,1,1);
    }

    /**
     * Create and return central HBox.
     * @param imageUrl
     * @return
     */
    private static HBox getHorizontalBox(String imageUrl) {
        HBox baseline = new HBox(SPACING * 3);
        setMailImage(imageUrl, baseline);
        baseline.getChildren().add(inputs);
        baseline.setAlignment(Pos.CENTER);
        return baseline;
    }

    /**
     * Set mail icon.
     * @param imageUrl
     * @param baseline
     */
    public static void setMailImage(String imageUrl, HBox baseline) {
        if (imageUrl != null && !imageUrl.isEmpty()) {
            Image image = new Image(imageUrl);
            ImageView imageView = new ImageView(image);
            baseline.getChildren().add(imageView);
        }
    }

    /**
     * Create and return buttons.
     * @param save
     * @param close
     */
    private static void createButtons(Button save, Button close) {
        HBox buttons = new HBox(SPACING);
        buttons.getChildren().add(save);
        buttons.getChildren().add(close);
        inputs.getChildren().add(buttons);
    }

    /**
     * Create Input Fields.
     * @param userName
     * @param password
     */
    private static void createInputs(TextField userName, PasswordField password) {
        inputs = new VBox(SPACING);
        inputs.getChildren().add(new Label(Titles.USERNAME.toString()));
        inputs.getChildren().add(userName);
        inputs.getChildren().add(new Label(Titles.PASSWORD.toString()));
        inputs.getChildren().add(password);
    }

    /**
     * Resize buttons.
     * @param buttons
     */
    public static void setButtonSize(Button... buttons) {
        for (Button button : buttons) {
            button.setMinWidth(PREF_WIDTH_B);
            button.setPrefWidth(PREF_WIDTH_B);
            button.setPrefHeight(PREF_HEIGHT);
        }
    }
}
