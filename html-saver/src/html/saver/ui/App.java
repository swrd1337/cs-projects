package html.saver.ui;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.layout.GridPane;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;


// TODO: Create TextArea...
// Download and  Save buttons...

public class App extends Application {
    private static final double MIN_WIDTH = 600.0f;
    private static final double MIN_HEIGHT = 400.0f;
    private static final String STYLE = "-fx-text-fill: black; -fx-font-size: 18; -fx-font-family: Roboto Material Thin";

    private Stage appStage;
    private Label label;
    private TextField field;
    private Button save;
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
        prepareSaveButton();
        prepareRootGrid();
    }

    private void prepareRootGrid() {
        rootGrid = new GridPane();
        rootGrid.add(label, 0, 0);
        rootGrid.add(field, 1, 0);
        rootGrid.add(save, 2, 0);
        rootGrid.setHgap(15);
        rootGrid.setVgap(15);
        rootGrid.setAlignment(Pos.CENTER);
    }

    private void prepareSaveButton() {
        save = new Button("Save");
        save.setPrefWidth(100);
        onSaveActionUtil();
    }

    private void onSaveActionUtil() {
        save.setOnAction(event -> {
            try {
                savePageContent();
            } catch (IOException e) {
                e.printStackTrace();
                setResultMessage(e.getMessage(), STYLE + ";-fx-text-fill: red;");
                return;
            }
            setResultMessage("Done", STYLE + ";-fx-text-fill: green;");
        });
    }

    private void savePageContent() throws IOException {
        String pageUrl = field.getText();
        String content = getPageContent(pageUrl);
        File file = getFileFromChooser();
        saveFile(content, file);
    }

    private void setResultMessage(String message, String color) {
        Label doneLabel = new Label(message);
        doneLabel.setStyle(color);
        rootGrid.add(doneLabel, 1, 1);
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
