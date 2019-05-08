package html.saver.ui;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;


public class App extends Application {
    private static final double MIN_WIDTH = 800.0f;
    private static final double MIN_HEIGHT = 600.0f;
    private static final String STYLE = "-fx-text-fill: black; -fx-font-size: 18; -fx-font-family: Roboto Material Thin";

    private Stage appStage;
    private Label label;
    private TextField field;
    private Button save;
    private Button display;
    private TextArea textArea;
    private GridPane rootGrid;

    public void start(Stage primaryStage) {
        this.appStage = primaryStage;
        firstPreparations();
        Scene scene = new Scene(rootGrid, MIN_WIDTH, MIN_HEIGHT);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    private void firstPreparations() {
        prepareAppStage();
        prepareLabel();
        prepareField();
        prepareTextArea();
        prepareSaveButton();
        prepareDisplayButton();
        prepareRootGrid();
    }

    private void prepareRootGrid() {
        rootGrid = new GridPane();
        HBox input = new HBox();
        input.getChildren().addAll(label, field);
        input.setAlignment(Pos.CENTER);

        HBox buttons = new HBox();
        buttons.getChildren().addAll(save, display);
        buttons.setAlignment(Pos.CENTER);
        buttons.setSpacing(10);

        rootGrid.add(input, 0, 0);
        rootGrid.add(textArea, 0, 1);
        rootGrid.add(buttons, 0, 2);
        rootGrid.setHgap(15);
        rootGrid.setVgap(15);
        rootGrid.setAlignment(Pos.CENTER);
    }

    private void prepareSaveButton() {
        save = new Button("Save");
        save.setPrefWidth(100);
        onSaveActionUtil();
    }

    private void prepareDisplayButton() {
        display = new Button("Display");
        display.setPrefWidth(100);
        onDisplayActionUtil();
    }

    private void prepareTextArea() {
        textArea = new TextArea();
        textArea.setPrefWidth(MIN_WIDTH);
        textArea.setPrefHeight(MIN_WIDTH / 2);
    }

    private void onSaveActionUtil() {
        save.setOnAction(event -> {
            try {
                savePageContent();
            } catch (IOException e) {
                textArea.setText(e.getMessage());
            }
            textArea.setText("SAVED");
        });
    }

    private void onDisplayActionUtil() {
        display.setOnAction(event -> {
            try {
                String pageUrl = field.getText();
                String content = getPageContent(pageUrl);
                textArea.setText(content);
            } catch (IOException e) {
                textArea.setText(e.getMessage());
            }
        });
    }

    private void savePageContent() throws IOException {
        String pageUrl = field.getText();
        String content = getPageContent(pageUrl);
        File file = getFileFromChooser();
        saveFile(content, file);
    }

    private void saveFile(String content, File file) throws FileNotFoundException {
        PrintWriter writer;
        writer = new PrintWriter(file);
        writer.println(content);
        writer.close();
    }

    private File getFileFromChooser() {
        FileChooser fileChooser = new FileChooser();

        fileChooser.getExtensionFilters()
                .add(new FileChooser.ExtensionFilter("HTML files (*.html)", "*.html"));
        fileChooser.getExtensionFilters()
                .add(new FileChooser.ExtensionFilter("TXT files (*.txt)", "*.txt"));

        fileChooser.setTitle("Select page save directory");
        return fileChooser.showSaveDialog(new Stage());
    }

    private String getPageContent(String pageUrl) throws IOException {
        URLConnection conn = new URL(pageUrl).openConnection();
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        StringBuilder sb = new StringBuilder();

        String inputLine;
        while ((inputLine = br.readLine()) != null) {
            sb.append(inputLine).append("\n");
        }
        br.close();
        return sb.toString();
    }

    private void prepareField() {
        field = new TextField();
        field.setText("Your URL...");
        field.setPrefWidth(MIN_WIDTH / 2);
    }

    private void prepareLabel() {
        label = new Label("Enter page URL:");
        label.setStyle(STYLE);
    }

    private void prepareAppStage() {
        appStage.setTitle("Html Saver");
        appStage.getIcons().add(new Image("./resources/round_cloud_download.png"));
        appStage.setWidth(MIN_WIDTH);
        appStage.setHeight(MIN_HEIGHT);
        appStage.setResizable(false);
    }
}