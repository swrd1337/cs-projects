package mail.chief.view;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Modality;
import javafx.stage.Stage;
import mail.chief.controller.SendNewMail;
import mail.chief.model.credentials.MailCredentials;
import mail.chief.model.credentials.MailCredentialsException;

/**
 * Create Send new mail window.
 */
public class NewMailWindow {
    // Local constants.
    private static final int WIDTH = 800;
    private static final int HEIGHT = 600;

    // Message parts inputs fields.
    private static TextField destinationField;
    private static TextField subjectField;
    private static TextArea messageArea;

    // Sender mail credentials.
    private static MailCredentials localMailCred;

    /**
     * Not meant to be instantiated.
     */
    private NewMailWindow() {}

    /**
     * Create new mail window.
     * @param credentials
     */
    public static void createNewMailWindow(MailCredentials credentials) {
        localMailCred = credentials;
        Stage localStage = new Stage();
        prepareStage(localStage);

        HBox hBox = createButtons(localStage);
        hBox.setPadding(new Insets(0, 0, 5,0));
        VBox vBox = createFields();
        vBox.getChildren().add(hBox);

        GridPane grid = new GridPane();

        grid.setAlignment(Pos.CENTER);
        grid.add(vBox, 1, 1, 1, 1);

        Scene scene = new Scene(grid, WIDTH, HEIGHT);
        scene.getStylesheets().add("theme.css");

        localStage.setScene(scene);
        localStage.setResizable(false);
        localStage.show();
    }

    /**
     * Mail window stage preparations.
     * @param localStage
     */
    private static void prepareStage(Stage localStage) {
        localStage.setTitle(Titles.NEW_MAIL.toString());
        localStage.getIcons().add(new Image("icons/mail-icon.png"));

        localStage.initModality(Modality.WINDOW_MODAL);
        localStage.initOwner(App.getAppStage());
    }

    /**
     * Create and return HBox with buttons.
     * @param localStage
     * @return
     */
    private static HBox createButtons(Stage localStage) {
        Button send = new Button("Send");
        Button cancel = new Button("Cancel");
        onSendActionUtil(send, localStage);
        send.setPrefWidth(120);
        cancel.setPrefWidth(120);
        cancel.setOnAction(event -> localStage.close());

        return createHorizontalBox(send, cancel);
    }

    /**
     * Send action. Using SenaMail Controller.
     * @param send
     * @param localStage
     */
    private static void onSendActionUtil(Button send, Stage localStage) {
        send.setOnAction(event -> {
            String dest = destinationField.getText();
            String subj = subjectField.getText();
            String message = messageArea.getText();

            if (!dest.isEmpty() && !subj.isEmpty()) {
                SendNewMail sender = new SendNewMail(subj, dest, message);
                try {
                    sender.send(localMailCred);
                } catch (MailCredentialsException e) {
                    createErrorWindow(e.getMessage());
                }
            }
            localStage.close();
        });
    }

    /**
     * Display Error window.
     * @param error
     */
    public static void createErrorWindow(String error) {
        Stage errorStage = new Stage();
        errorStage.getIcons().add(new Image("icons/mail-icon.png"));
        errorStage.initModality(Modality.WINDOW_MODAL);
        errorStage.initOwner(App.getAppStage());

        Label errorLabel = new Label(error);
        errorLabel.setAlignment(Pos.CENTER);
        errorLabel.setStyle("-fx-font-size: 18px; -fx-fill: #ff3030;");

        Scene scene = new Scene(errorLabel, 250, 100);
        errorStage.setScene(scene);
        errorStage.setResizable(false);
        errorStage.show();
    }

    /**
     * Prepare and return fields in VBox.
     * @return
     */
    private static VBox createFields() {
        Label destinationLabel = new Label(Titles.DESTINATION.toString());
        destinationLabel.setStyle("-fx-font-size: 16px;");
        Label subjectLabel = new Label(Titles.SUBJECT.toString());
        subjectLabel.setStyle("-fx-font-size: 16px;");
        Label messageLabel = new Label(Titles.MESSAGE.toString());
        messageLabel.setStyle("-fx-font-size: 16px;");

        destinationField = new TextField();
        destinationField.setPrefWidth(WIDTH - 50);
        subjectField = new TextField();
        subjectField.setPrefWidth(WIDTH - 50);

        messageArea = new TextArea();
        messageArea.setPrefWidth(WIDTH - 50);
        messageArea.setPrefHeight(HEIGHT - 200);

        return createVerticalBox(destinationLabel, destinationField,
                subjectLabel, subjectField, messageLabel, messageArea);
    }

    /**
     * Create and return HBox.
     * @param nodes
     * @return
     */
    private static HBox createHorizontalBox(Node... nodes) {
        HBox hBox = new HBox(5);
        hBox.setAlignment(Pos.BOTTOM_RIGHT);

        for (Node node : nodes) {
            hBox.getChildren().add(node);
        }

        return hBox;
    }

    /**
     * Create and return VBox.
     * @param nodes
     * @return
     */
    private static VBox createVerticalBox(Node... nodes) {
        VBox vBox = new VBox(10);
        vBox.setAlignment(Pos.CENTER);

        for (Node node : nodes) {
            vBox.getChildren().add(node);
        }

        return vBox;
    }
}
